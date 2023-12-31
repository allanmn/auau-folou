<?php

namespace App\Services;

use App\Models\Owner;
use App\Traits\Crudable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class OwnerService
{

    private Owner $model;
    use Crudable;

    public function __construct(Owner $model)
    {
        $this->model = $model;
    }

    public function get()
    {
        return $this->model->with('animals')->get();
    }

    public function find(string $id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->with('animals')->findOrFail($id);

            DB::commit();
        }
        catch (\Throwable $e){
            DB::rollBack();
            Throw $e;
        }

        return $model;
    }

}
