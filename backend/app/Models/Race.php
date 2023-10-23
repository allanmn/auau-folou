<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Race extends Model
{
    use HasFactory;

    protected $fillable =[
        "name",
        "specie_id"
    ];

    protected $with =[
        "specie"
    ];

    public function specie(){
        return $this->belongsTo(Specie::class);
    }
}
