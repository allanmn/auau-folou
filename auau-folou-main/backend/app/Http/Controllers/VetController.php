<?php

namespace App\Http\Controllers;

use App\Http\Requests\VetRequest;
use App\Services\VetService;

class VetController extends Controller
{
    private VetService $Vet_service;

    public function __construct(VetService $vet_service)
    {
        $this->vet_service = $vet_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "Vets" => $this->vet_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VetRequest $request)
    {
        $this->vet_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "Vet" => $this->vet_service->find($id)
        ]);
    }

    public function update(VetRequest $request, string $id)
    {
        $this->vet_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->vet_service->destroy($id);
        return response('',204);
    }
}
