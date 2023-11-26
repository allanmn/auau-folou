<?php

namespace App\Services;

use App\Models\Cashflow;
use App\Traits\Crudable;

class CashflowService
{

    private Cashflow $model;
    use Crudable;

    public function __construct(Cashflow $model)
    {
        $this->model = $model;
    }

    public function getByDayCashflows($date){
        $day_before = new \DateTime($date);
        $day_before->setTime(23,59)->modify('-1 day');
        $day_after = new \DateTime($date);
        $day_after->setTime(0,0)->modify('+1 day');
        $models = $this->model->whereBetween('due_date',[$day_before->format('Y-m-d H:i:s'),$day_after->format('Y-m-d H:i:s')])->get();
        return $models;
    }
}
