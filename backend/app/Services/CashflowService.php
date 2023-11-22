<?php

namespace App\Services;

use App\Models\Cashflow;
use App\Traits\Crudable;

class CashflowService
{

    private Cashflow $model;
    use Crudable;

    public function __construct(Cashflow $model)
    {
        $this->model = $model;
    }
}
