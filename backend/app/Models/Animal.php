<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Animal extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected  $fillable = [
         "name",
         "owner_id",
         "race_id",
         "birth_date"
    ];

    protected $with = [
        "race",
        "owner"
    ];

    public function race(){
        return $this->belongsTo(Race::class);
    }
    public function owner(){
        return $this->belongsTo(Owner::class);
    }
}
