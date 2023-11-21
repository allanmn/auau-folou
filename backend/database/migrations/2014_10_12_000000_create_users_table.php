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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
            $table->softDeletes();
        });

        // Insert some stuff
        DB::table('users')->insert(
            array(
                'email' => 'adm@aafolou.com',
                'name' => 'admin',
                'password' => '$2y$10$F0Eexl1V28g1NzCxCTFaDuT/O7KQJ5wTsmv1MEyHqhe/byQ24saZe'
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
