<?php

namespace App\Services;

use App\Models\Supplier;
use App\Traits\Crudable;

class SupplierService
{

    private Supplier $model;
    use Crudable;

    public function __construct(Supplier $model)
    {
        $this->model = $model;
    }

    public function get()
    {
        return $this->model->with('medicine')->get();
    }


}
