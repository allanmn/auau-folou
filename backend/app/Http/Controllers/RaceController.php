<?php

namespace App\Http\Controllers;

use App\Http\Requests\RaceRequest;
use App\Services\RaceService;

class RaceController extends Controller
{
    private RaceService $owner_service;

    public function __construct(RaceService $owner_service)
    {
        $this->owner_service = $owner_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "races" => $this->owner_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RaceRequest $request)
    {
        $this->owner_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "race" => $this->owner_service->find($id)
        ]);
    }

    public function update(RaceRequest $request, string $id)
    {
        $this->owner_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->owner_service->destroy($id);
        return response('',204);
    }
}
