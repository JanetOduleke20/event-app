<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Goods;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'goods_id',
        'description',
        'picture',
        'price_per_one',
        'total_price',
        'quantity'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }
}
