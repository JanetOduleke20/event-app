<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cart;

class Goods extends Model
{
    use HasFactory;
    protected $table ='goods';
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'units',
        'description',
        'picture'
    ];
   public function cart()
   {
    return $this->hasMany(Cart::class);
   }
}
