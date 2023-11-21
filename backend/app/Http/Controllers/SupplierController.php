<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Services\SupplierService;
use Illuminate\Http\Request;

class SupplierController extends Controller
{

    private SupplierService $supplier_service;

    public function __construct(SupplierService $supplier_service)
    {
        $this->supplier_service = $supplier_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "Suppliers" => $this->supplier_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SupplierRequest $request)
    {
        $this->supplier_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "Supplier" => $this->supplier_service->find($id)
        ]);
    }

    public function update(SupplierRequest $request, string $id)
    {
        $this->supplier_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->supplier_service->destroy($id);
        return response('',204);
    }
}
