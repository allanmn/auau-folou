<?php

namespace App\Http\Controllers;

use App\Http\Requests\RaceRequest;
use App\Services\RaceService;

class RaceController extends Controller
{
    private RaceService $race_service;

    public function __construct(RaceService $race_service)
    {
        $this->race_service = $race_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "races" => $this->race_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RaceRequest $request)
    {
        $this->race_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "race" => $this->race_service->find($id)
        ]);
    }

    public function update(RaceRequest $request, string $id)
    {
        $this->race_service->update($request->toArray(),$id);
        return response('',204);
    }


    public function showRacesBySpecie(string $specie_id)
    {
        return response()->json([
            "specie" => $this->race_service->findRacesBySpecie($specie_id)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->race_service->destroy($id);
        return response('',204);
    }
}
