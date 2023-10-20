<?php

namespace App\Services;

use App\Models\Owner;
use App\Traits\Crudable;

class OwnerService
{

    private Owner $model;
    use Crudable;

    public function __construct(Owner $model)
    {
        $this->model = $model;
    }
}
