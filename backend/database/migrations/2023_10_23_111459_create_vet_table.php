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
        Schema::create('vets', function (Blueprint $table) {
            $table->id();
            $table->string("name",100);
            $table->string("phone",20);
            $table->string("email",100);
            $table->string("email_verified_at",30);
            $table->string("CRMV",5);
            $table->string("specialty",100);
            $table->string("password",100);
            $table->string("remember_token",10);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vet');
    }
};
