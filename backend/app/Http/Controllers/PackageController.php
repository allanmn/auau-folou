<?php

namespace App\Http\Controllers;

use App\Http\Requests\PackageRequest;
use App\Services\PackageService;

class PackageController extends Controller
{
    private PackageService $package_service;

    public function __construct(PackageService $package_service)
    {
        $this->package_service = $package_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "packages" => $this->package_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PackageRequest $request)
    {
        $this->package_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "package" => $this->package_service->find($id)
        ]);
    }

    public function update(PackageRequest $request, string $id)
    {
        $this->package_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->package_service->destroy($id);
        return response('',204);
    }
}
