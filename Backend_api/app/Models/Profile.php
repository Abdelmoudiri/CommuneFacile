<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileFactory> */
    use HasFactory;

    protected $fillable = [
        "user_id",
        "avatar",
        "date_of_birth",
        "cin",
        "address",
        "phone",
    ];
    protected $casts = [
        "date_of_birth" => "date",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
