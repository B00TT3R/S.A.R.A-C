<?php

use App\Models\TopicTimer;
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
        Schema::create('topic_timer', function (Blueprint $table) {
            $table->dateTime("next")->nullable();
            $table->boolean("auto_gen");
            $table->unsignedInteger("time");
            $table->id();
            $table->timestamps();
        });
        TopicTimer::create([
            "auto_gen" => false,
            "time"=>1440
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topic_timer');
    }
};
