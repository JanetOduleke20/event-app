<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $cart = new Cart;
        $user = User::where('email', '=', $request->input('user_email'))->first();
        $cart->user_id = $user->id;
        $cart->goods_id = $request->input('id');
        $cart->description = $request->input('description');
        $cart->picture = $request->input('picture');
        $cart->price_per_one = $request->input('price');
        $cart->total_price = $request->input('price');
        $cart->quantity = $request->input('quantity');
        $cart->save();

        return response()->json([
            'status'=>200,
            'message'=>'Added'
        ]);
    }
    public function getCartItems(Request $request)
    {
        $user = User::where('email', '=', $request->input('email'))->first();
        $items = Cart::where('user_id', '=', $user->id)->get();

        return response()->json([
            'status'=>200,
            'items'=>$items
        ]);
    }
    public function deleteItemFromCart(Request $request) {
        $id = $request->input('index');
        $cart = new Cart();
        $cart->where('id', '=', $id)->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Deleted'
        ]);
    }
    public function increaseItem(Request $request)
    {
        $id = $request->input('index');
        $cart = new Cart();
        $cart->where('id', '=', $id)->update(['quantity'=>  DB::raw('quantity+1')]);
    }
    public function decreaseItem(Request $request)
    {
        $id = $request->input('index');
        $cart = new Cart();
        $cart->where('id', '=', $id)->update(['quantity'=> DB::raw('quantity-1')]);
    }

}
