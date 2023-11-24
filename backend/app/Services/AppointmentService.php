<?php

namespace App\Services;

use App\Models\Appointment;
use App\Traits\Crudable;
use DB;

class AppointmentService
{

    private Appointment $model;
    private CashflowService $cashflow_service;
    use Crudable;

    public function __construct(Appointment $model,CashflowService $cashflow_service)
    {
        $this->model = $model;
        $this->cashflow_service = $cashflow_service;
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->create($data);

            if (is_null($model->package_id)) {
                $model->services()->sync($data['services']);
            }

            $related_cashflow =[
                "comment" => "Lançamento referente a agendamento #$model->id",
                "due_date" => $model->created_at,
                "value" => $model->price,
                "paid_at" => null,
                "flow" => 1
            ];

            $this->cashflow_service->store($related_cashflow);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(array $data, string $id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            if (is_null($model->package_id)) {
                $model->services()->sync($data['services']);
            }

            $model->update($data);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @throws \Exception
     */
    public function getByDayAppointments($date)
    {
        $day_before = new \DateTime($date);
        $day_before->setTime(23, 59)->modify('-1 day');
        $day_after = new \DateTime($date);
        $day_after->setTime(0, 0)->modify('+1 day');
        $models = $this->model->whereBetween('scheduled_time', [$day_before->format('Y-m-d H:i:s'), $day_after->format('Y-m-d H:i:s')])->get();
        return $models;
    }
}
