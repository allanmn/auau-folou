<?php

namespace App\Services;

use App\Models\Service;
use App\Traits\Crudable;

class ServiceService
{

    private Service $model;
    use Crudable;

    public function __construct(Service $model)
    {
        $this->model = $model;
    }

}
