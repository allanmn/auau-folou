<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Specie extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "name",
    ];

    public function races(): HasMany
    {
        return $this->hasMany(Race::class);
    }
}
