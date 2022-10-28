<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dispenser extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'token',
        'capacity',
        'current_capacity',
        'lat',
        'lng',
        'company_id',
        'created_at',
        'updated_at'
    ];

    public function company() {
        return $this->belongsTo(\App\Models\Company::class);
    }

    public function dispenserHistorico() {
        return $this->hasMany(\App\Models\DispenserHistoric::class);
    }
}
