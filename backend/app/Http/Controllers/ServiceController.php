<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Services\ServiceService;

class ServiceController extends Controller
{
    private ServiceService $service_service;

    public function __construct(ServiceService $service_service)
    {
        $this->service_service = $service_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "services" => $this->service_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
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
            "service" => $this->service_service->find($id)
        ]);
    }

    public function update(ServiceRequest $request, string $id)
    {
        $this->service_service->update($request->toArray(),$id);
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
