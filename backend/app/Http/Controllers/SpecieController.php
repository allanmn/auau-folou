<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpecieRequest;
use App\Services\SpecieService;
use Illuminate\Http\Request;

class SpecieController extends Controller
{

    private SpecieService $specie_service;

    public function __construct(SpecieService $specie_service)
    {
        $this->specie_service = $specie_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "species" => $this->specie_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SpecieRequest $request)
    {
        $this->specie_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "specie" => $this->specie_service->find($id)
        ]);
    }

    public function update(SpecieRequest $request, string $id)
    {
        $this->specie_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->specie_service->destroy($id);
        return response('',204);
    }
}
