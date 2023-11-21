<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "scheduled_time",
        "vet_id",
        "animal_id",
        "package_id",
        "appointment_status_id",
        "price"
    ];

    protected $with = [
        "appointment_status",
        "vet",
        "animal",
        "package",
        "services"
    ];

    public function vet(): BelongsTo
    {
        return $this->belongsTo(Vet::class);
    }

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function appointment_status(): BelongsTo
    {
        return $this->belongsTo(AppointmentStatus::class);
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class);
    }

}
