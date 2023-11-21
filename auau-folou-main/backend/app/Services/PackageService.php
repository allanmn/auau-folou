<?php

namespace App\Services;

use App\Models\Package;
use App\Traits\Crudable;

class PackageService
{

    private Package $model;
    use Crudable;

    public function __construct(Package $model)
    {
        $this->model = $model;
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $this->model->create($data)->services()->sync($data['services']);

            DB::commit();
        }
        catch (\Throwable $e){
            DB::rollBack();
            Throw $e;
        }
    }
}
