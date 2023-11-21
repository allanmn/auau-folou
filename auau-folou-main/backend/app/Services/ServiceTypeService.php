<?php

namespace App\Services;

use App\Models\ServiceType;
use App\Traits\Crudable;

class ServiceTypeService
{

    private ServiceType $model;
    use Crudable;

    public function __construct(ServiceType $model)
    {
        $this->model = $model;
    }
}