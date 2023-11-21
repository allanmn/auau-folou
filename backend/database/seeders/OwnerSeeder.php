<?php

namespace Database\Seeders;

use App\Http\Requests\OwnerRequest;
use App\Models\Animal;
use App\Models\Owner;
use Database\Factories\AnimalFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Owner::factory()->count(10)->has(Animal::factory()->count(rand(1,5)))->create();
    }
}
