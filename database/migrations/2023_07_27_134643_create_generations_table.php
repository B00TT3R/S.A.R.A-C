<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('generations', function (Blueprint $table) {
            $table->id();
            $table->string("type");
            $table->string("gen_type");
            $table->string("model");
            $table->mediumText("result");
            $table->mediumText("local_result")->nullable();
            $table->text("prompt")->nullable();
            $table->unsignedBigInteger("topic_id")->nullable();
            $table->foreign('topic_id')->references('id')->on('topics')->onDelete("set null");

            $table->json("messages")->nullable();
            $table->json("response");
            $table->timestamps();
        });
        $directory = public_path('images');

        // delete all the files in the directory
        File::cleanDirectory($directory);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generations');
    }
};
