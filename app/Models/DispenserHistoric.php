<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DispenserHistoric extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'dispenser_id',
        'entries',
        'uses',
        'type',
        'created_at',
        'updated_at'
    ];

    public function dispenser() {
        return $this->belongsTo(\App\Models\Dispenser::class);
    }
}
