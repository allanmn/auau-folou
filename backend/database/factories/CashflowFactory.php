<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cashflow>
 */
class CashflowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "due_date" => $this->faker->date("Y-m-d H:i:s"),
            "value" => rand(12, 107) / 10,
            "comment" => $this->faker->sentence(),
            "paid_at" => null,
            "flow"=> rand(0,1)
        ];
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'paid_at' => $this->faker->date("Y-m-d H:i:s"),
        ]);
    }
}
