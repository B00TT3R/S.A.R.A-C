<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->json('permissions')->nullable();
            $table->rememberToken();
            $table->timestamps();

        });
        User::create(
            [
                'name' => 'Bot',
                'email' => 'boott3r@gmail.com',
                "permissions" => [
                    'posts',
                    'errors',
                    'view_users',
                    'generations',
                    'root_infos'
                ],
                'password' => '$2a$12$XXQ3yLGOqd5dpFL1O/3R9.vxxc33jJeXwfCb3CRyRF.LhefHGEyAm',
            ]
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
