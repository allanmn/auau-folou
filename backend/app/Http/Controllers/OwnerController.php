<?php

namespace App\Http\Controllers;

use App\Http\Requests\OwnerRequest;
use App\Services\OwnerService;

class OwnerController extends Controller
{
    private OwnerService $owner_service;

    public function __construct(OwnerService $owner_service)
    {
        $this->owner_service = $owner_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "owners" => $this->owner_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OwnerRequest $request)
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
            "owner" => $this->owner_service->find($id)
        ]);
    }

    public function update(OwnerRequest $request, string $id)
    {
        $this->owner_service->update($request->toArray(),$id);
        return response();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->owner_service->destroy($id);
        return response();
    }
}
