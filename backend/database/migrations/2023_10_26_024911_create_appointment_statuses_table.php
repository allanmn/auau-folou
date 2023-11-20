<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointment_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
        });

        DB::table('appointment_statuses')->insert([
            array(
                'name' => 'Pendente',
            ),
            array(
                'name' => 'Confirmado',
            ),
            array(
                'name' => 'Concluído',
            ),
            array(
                'name' => 'Cancelado',
            )
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_statuses');
    }
};
