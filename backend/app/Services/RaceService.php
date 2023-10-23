<?php

namespace App\Services;

use App\Models\Race;
use App\Traits\Crudable;

class RaceService
{

    private Race $model;
    use Crudable;

    public function __construct(Race $model)
    {
        $this->model = $model;
    }
}
