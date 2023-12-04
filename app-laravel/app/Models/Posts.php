<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'author', 'category', 'description', 'image'
    ];
    
}
