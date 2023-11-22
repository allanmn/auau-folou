<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "name",
        "phone",
        "email",
        "address",
        "product_type"
    ];

    public function medicine() {
        return $this->hasOne(Medicine::class);
    }
}
