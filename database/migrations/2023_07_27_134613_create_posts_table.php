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
        Schema::create('posts', function (Blueprint $table) {
            
            $table->id();
            $table->text("type");
            $table->json("response");
            $table->mediumText("description")->nullable();
            $table->unsignedBigInteger("topic_id")->nullable();
            $table->foreign('topic_id')->references('id')->on('topics')->onDelete('set null');
            $table->json("request");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
