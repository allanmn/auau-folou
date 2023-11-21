<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceTypeRequest;
use App\Services\ServiceTypeService;

class ServiceTypeController extends Controller
{
    private ServiceTypeService $service_type_service;

    public function __construct(ServiceTypeService $service_type_service)
    {
        $this->service_type_service = $service_type_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "service-types" => $this->service_type_service->get(),
        ]);
    }

    /*
     * Store a newly created resource in storage.
     */
    public function store(ServiceTypeRequest $request)
    {
        $this->service_type_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "service-type" => $this->service_type_service->find($id)
        ]);
    }

    public function update(ServiceTypeRequest $request, string $id)
    {
        $this->service_type_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->service_type_service->destroy($id);
        return response('',204);
    }
}