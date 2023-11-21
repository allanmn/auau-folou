<?php

namespace App\Services;

use App\Models\Race;
use App\Traits\Crudable;
use Illuminate\Support\Facades\DB;

class RaceService
{

    private Race $model;
    use Crudable;

    public function __construct(Race $model)
    {
        $this->model = $model;
    }


    public function findRacesBySpecie($specie_id){
        try {
            DB::beginTransaction();

            $models = $this->model->where('specie_id', $specie_id)->get();

            DB::commit();
        }
        catch (\Throwable $e){
            DB::rollBack();
            throw $e;
        }
        return $models;
    }
}
