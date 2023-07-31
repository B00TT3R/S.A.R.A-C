<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;    
    protected $fillable = [
        'name',
        'email',
        'password',
        'permissions'
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'permissions' => 'json',
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (isset($model->password)) {
                $model->password = Hash::make($model->password, ['rounds' => 12]);
            }
        });
        static::updating(function ($model) {
            if (isset($model->password)) {
                $model->password = Hash::make($model->password, ['rounds' => 12]);
            }
        });
    }
}
