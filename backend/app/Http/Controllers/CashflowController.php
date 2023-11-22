<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashflowRequest;
use App\Services\CashflowService;

class CashflowController extends Controller
{
    private CashflowService $cashflow_service;

    public function __construct(CashflowService $cashflow_service)
    {
        $this->cashflow_service = $cashflow_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            "cashflows" => $this->cashflow_service->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CashflowRequest $request)
    {
        $this->cashflow_service->store($request->toArray());
        return response('',201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "cashflow" => $this->cashflow_service->find($id)
        ]);
    }

    public function update(CashflowRequest $request, string $id)
    {
        $this->cashflow_service->update($request->toArray(),$id);
        return response('',204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->cashflow_service->destroy($id);
        return response('',204);
    }
}
