<?php

use App\Models\Timer;
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
        Schema::create('timer', function (Blueprint $table) {
            $table->dateTime("next");
            $table->id();
            $table->timestamps();
        });
        Timer::create([
            "next" => now()->toDateTimeString(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timer');
    }
};
