<?php

namespace Database\Factories;

use App\Models\Owner;
use App\Models\Race;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
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
            "birth_date" => $this->faker->date(),
            "owner_id" => Owner::factory(),
            "race_id" => Race::factory()
        ];
    }
}
