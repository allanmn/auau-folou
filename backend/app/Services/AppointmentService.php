<?php

namespace App\Services;

use App\Models\Appointment;
use App\Traits\Crudable;

class AppointmentService
{

    private Appointment $model;
    use Crudable;

    public function __construct(Appointment $model)
    {
        $this->model = $model;
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->create($data);

            if(is_null($model->package_id)){
                $model->services()->sync($data['services']);
            }

            DB::commit();
        }
        catch (\Throwable $e){
            DB::rollBack();
            Throw $e;
        }
    }
}
