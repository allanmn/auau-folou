<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicineRequest;
use App\Services\MedicineService;

class MedicineController extends Controller
{
    private MedicineService $medicine_service;

    public function __construct(MedicineService $medicine_service)
    {
        $this->medicine_service = $medicine_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "Medicines" => $this->medicine_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MedicineRequest $request)
    {
        $this->medicine_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "Medicine" => $this->medicine_service->find($id)
        ]);
    }

    public function update(MedicineRequest $request, string $id)
    {
        $this->medicine_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->medicine_service->destroy($id);
        return response('',204);
    }
}

