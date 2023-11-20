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
        Schema::table('medicines', function($table) {
            $table->dropColumn('supplier');
            $table->dropColumn('specie_id');
            $table->bigInteger('supplier_id',false,true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('medicines', function($table) {
            $table->dropColumn('supplier_id');
            $table->string('supplier', 100);
        });
    }
};
