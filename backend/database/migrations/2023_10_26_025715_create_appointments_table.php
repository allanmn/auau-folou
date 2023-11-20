<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->timestamp('scheduled_time');
            $table->bigInteger("vet_id",false,true);
            $table->bigInteger("animal_id",false,true);
            $table->bigInteger("appointment_status_id",false,true);
            $table->bigInteger("package_id",false,true)->nullable();
            $table->decimal('price');
            $table->foreign('vet_id')->references('id')->on('vets');
            $table->foreign('animal_id')->references('id')->on('animals');
            $table->foreign('package_id')->references('id')->on('packages');
            $table->foreign('appointment_status_id')->references('id')->on('appointment_statuses');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
