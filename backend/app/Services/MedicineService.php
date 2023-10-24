<?php

namespace App\Services;

use App\Models\Medicine;
use App\Traits\Crudable;

class MedicineService
{

    private Medicine $model;
    use Crudable;

    public function __construct(Medicine $model)
    {
        $this->model = $model;
    }
}