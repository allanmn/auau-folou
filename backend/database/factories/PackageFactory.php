<?php

namespace Database\Factories;

use App\Models\Package;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->word(),
            "description" => $this->faker->paragraph(),
            "price" => rand(17,29)/10
        ];
    }

    public function configure(): static
    {
        return $this->afterMaking(function (Package $pkg) {
            // ...
        })->afterCreating(function (Package $pkg) {
            $services = Service::select('id')->take(rand(1,3))->inRandomOrder()->get()->toArray();
            $services = array_map(fn($s) => $s['id'],$services);
            $pkg->services()->sync($services);
        });
    }
}
