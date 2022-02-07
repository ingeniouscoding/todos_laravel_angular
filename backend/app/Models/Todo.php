<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'body',
        'is_completed',
        'category',
    ];

    protected $dispatchesEvents = [
        'creating',
    ];
}
