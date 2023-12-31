<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Services\ServiceService;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            OwnerSeeder::class,
            SpecieSeeder::class,
            VetSeeder::class,
            MedicineSeeder::class,
            ServiceTypeSeeder::class,
            SupplierSeeder::class,
            RaceSeeder::class,
            VetSeeder::class,
            AnimalSeeder::class,
            ServiceSeeder::class,
            PackageSeeder::class,
            AppointmentSeeder::class,
            CashflowSeeder::class,
        ]);
    }
}
