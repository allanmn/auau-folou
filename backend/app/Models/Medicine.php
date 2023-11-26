<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medicine extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "name",
        "supplier_id",
        "description",
        "dosage",
        "expirationDate",
        "stockAvailable",
        "price",
    ];

    protected $with = [
        "supplier"
    ];

    public function supplier() {
        return $this->belongsTo(Supplier::class);
    }
}
