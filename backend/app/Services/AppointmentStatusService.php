<?php

namespace App\Services;

use App\Models\AppointmentStatus;
use App\Traits\Crudable;

class AppointmentStatusService
{

    private AppointmentStatus $model;
    use Crudable;

    public function __construct(AppointmentStatus $model)
    {
        $this->model = $model;
    }
}
