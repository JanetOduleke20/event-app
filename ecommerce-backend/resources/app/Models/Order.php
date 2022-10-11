<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $fillable = [
        'user_id',
        'goods_id',
        'name',
        'total_price',
        'quantity'
    ];
    public function User()
    {
        return $this->hasMany(User::class);
    }
}
