<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'username',
        'email',
        'address',
        'phone',
        'website',
        'company',
    ];

    protected $casts = [
        'address' => 'array',
        'company' => 'array',
    ];
}
