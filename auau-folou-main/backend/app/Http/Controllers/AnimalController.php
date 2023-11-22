<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnimalRequest;
use App\Services\AnimalService;

class AnimalController extends Controller
{
    private AnimalService $animal_service;

    public function __construct(AnimalService $animal_service)
    {
        $this->animal_service = $animal_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "animals" => $this->animal_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AnimalRequest $request)
    {
        $this->animal_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "animal" => $this->animal_service->find($id)
        ]);
    }

    public function update(AnimalRequest $request, string $id)
    {
        $this->animal_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->animal_service->destroy($id);
        return response('',204);
    }
}
