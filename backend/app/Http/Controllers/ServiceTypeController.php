<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceTypeRequest;
use App\Services\ServiceTypeService;

class ServiceTypeController extends Controller
{
    private ServiceTypeService $service_service;

    public function __construct(ServiceTypeService $service_service)
    {
        $this->service_service = $service_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "Services" => $this->service_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceTypeRequest $request)
    {
        $this->service_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "Service" => $this->service_service->find($id)
        ]);
    }

    public function update(ServiceTypeRequest $request, string $id)
    {
        $this->Service_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->service_service->destroy($id);
        return response('',204);
    }
}
