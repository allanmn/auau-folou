<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentStatusRequest;
use App\Services\AppointmentStatusService;

class AppointmentStatusController extends Controller
{
    private AppointmentStatusService $appointment_status_service;

    public function __construct(AppointmentStatusService $appointment_status_service)
    {
        $this->appointment_status_service = $appointment_status_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "appointment_statuss" => $this->appointment_status_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AppointmentStatusRequest $request)
    {
        $this->appointment_status_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "appointment_status" => $this->appointment_status_service->find($id)
        ]);
    }

    public function update(AppointmentStatusRequest $request, string $id)
    {
        $this->appointment_status_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->appointment_status_service->destroy($id);
        return response('',204);
    }
}
