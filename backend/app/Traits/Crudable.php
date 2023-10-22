<?php

namespace App\Traits;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

Trait Crudable{
    /**
     * Display a listing of the resource.
     */
    public function get()
    {
        return $this->model->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Array $data)
    {
        try {
            DB::beginTransaction();

            $this->model->create($data);

            DB::commit();
        }
        catch (\Exception $e){
            DB::rollBack();
            Throw $e;
        }
    }

    /**
     * Display the specified resource.
     */
    public function find(string $id): Model
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            DB::commit();
        }
        catch (\Exception $e){
            DB::rollBack();
            Throw $e;
        }

        return $model;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Array $data, string $id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            $model->update($data);

            DB::commit();
        }
        catch (\Exception $e){
            DB::rollBack();
            Throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            $model->delete();

            DB::commit();
        }
        catch (\Exception $e){
            DB::rollBack();
            Throw $e;
        }
    }
}
