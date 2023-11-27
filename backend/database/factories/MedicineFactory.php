<?php

namespace Database\Factories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicine>
 */
class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'supplier_id' => Supplier::factory(),
            'description' => $this->faker->sentence(),
            'dosage' =>  rand(1,50)."ui",
            'expirationDate' => $this->faker->dateTimeBetween('now','+3 years')->format("Y-m-d H:i:s"),
            'stockAvailable' => rand(1,50),
            'price' => rand(12, 57) / 10,
        ];
    }
}
