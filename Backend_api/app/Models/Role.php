<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'permissions',
        'description',
    ];

    protected $casts = [
        'permissions' => 'json',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
