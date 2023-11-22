<?php

namespace App\Services;

use App\Models\Specie;
use App\Traits\Crudable;
use Illuminate\Support\Facades\DB;

class SpecieService
{

    private Specie $model;
    use Crudable;

    public function __construct(Specie $model)
    {
        $this->model = $model;
    }

}
