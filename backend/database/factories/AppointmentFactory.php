<?php

namespace Database\Factories;

use App\Models\Animal;
use App\Models\Appointment;
use App\Models\Package;
use App\Models\Service;
use App\Models\Vet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "scheduled_time" => $this->faker->dateTimeBetween("-7 days")->format("Y-m-d H:i:s"),
            "vet_id" => Vet::factory(),
            "animal_id"  => Animal::factory(),
            "package_id"  => Package::factory(),
            "appointment_status_id"  => rand(1,4),
            "price"  =>  rand(12, 57) / 10,
        ];
    }

    public function custom(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'package_id' => null
            ];
        });
    }

    public function configure(): static
    {
        return $this->afterMaking(function (Appointment $appointment) {
            // ...
        })->afterCreating(function (Appointment $appointment) {
            if(is_null($appointment->package_id)){
                $services = Service::select('id')->take(rand(1,3))->inRandomOrder()->get()->toArray();
                $services = array_map(fn($s) => $s['id'],$services);
                $appointment->services()->sync($services);
            }
        });
    }
}
