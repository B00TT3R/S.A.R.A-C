<?php

use App\Models\ShootTime;
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
        Schema::create('shoot_time', function (Blueprint $table) {
            $table->integer("time");
            $table->id();
            $table->timestamps();
        });
        ShootTime::create([
            "time" => 30
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shoot_time');
    }
};
