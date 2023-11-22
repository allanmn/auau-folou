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
            'name' => 'Dipiroca',
            'supplier_id' => Supplier::factory(),
            'description' => 'O melhor remedio para dor',
            'dosage' => '30ui',
            'expirationDate' => '30/05/2025',
            'stockAvailable' => 25,
            'price' => 25.00
        ];
    }
}
