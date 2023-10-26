<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentRequest;
use App\Services\AppointmentService;

class AppointmentController extends Controller
{
    private AppointmentService $appointment_service;

    public function __construct(AppointmentService $appointment_service)
    {
        $this->appointment_service = $appointment_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "appointments" => $this->appointment_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AppointmentRequest $request)
    {
        $this->appointment_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "appointment" => $this->appointment_service->find($id)
        ]);
    }

    public function update(AppointmentRequest $request, string $id)
    {
        $this->appointment_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->appointment_service->destroy($id);
        return response('',204);
    }
}
