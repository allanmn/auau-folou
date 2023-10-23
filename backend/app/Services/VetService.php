<?php

namespace App\Services;

use App\Models\Vet;
use App\Traits\Crudable;

class VetService
{

    private Vet $model;
    use Crudable;

    public function __construct(Vet $model)
    {
        $this->model = $model;
    }
}