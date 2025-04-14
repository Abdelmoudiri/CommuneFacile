<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenment extends Model
{
    /** @use HasFactory<\Database\Factories\EvenmentFactory> */
    use HasFactory;

    protected $fillable=[
        'title',
        'description',
        'date',
        'location',
        'is_published',
    ];
    

}
