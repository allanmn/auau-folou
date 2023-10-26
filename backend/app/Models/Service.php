<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "name",
        "description",
        "price",
        "service_type_id"
    ];

    public function service_type(): BelongsTo
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function packages(): BelongsToMany
    {
        return $this->belongsToMany(Package::class);
    }
    public function appointments(): BelongsToMany
    {
        return $this->belongsToMany(Appointment::class);
    }
}
