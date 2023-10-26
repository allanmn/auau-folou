<?php

namespace App\Services;

use App\Models\Animal;
use App\Traits\Crudable;

class AnimalService
{

    private Animal $model;
    use Crudable;

    public function __construct(Animal $model)
    {
        $this->model = $model;
    }
}
