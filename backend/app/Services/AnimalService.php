<?php

namespace App\Services;

use App\Models\Animal;
use App\Traits\Crudable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AnimalService
{

    private Animal $model;
    use Crudable;

    public function __construct(Animal $model)
    {
        $this->model = $model;
    }

    public function get()
    {
        return $this->model->with('owner')->get();
    }

    public function find(string $id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->with('owner')->findOrFail($id);

            DB::commit();
        }
        catch (\Throwable $e){
            DB::rollBack();
            Throw $e;
        }

        return $model;
    }


}
