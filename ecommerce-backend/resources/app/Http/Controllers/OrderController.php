<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Delivery;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function saveUserOrder(Request $request)
    {

        $cart = $request->input('cart');
        foreach ($cart as $item) {
            $orders = new Order;
            $orders->user_id = $item['user_id'];
            $orders->goods_id = $item['goods_id'];
            $orders->name = $item['description'];
            $orders->total_price = $item['total_price'];
            $orders->quantity = $item['quantity'];
            $orders->save();
            $cartModel = new Cart;
            Cart::where('id', '=', $item['id'])->delete();
        };

        return response()->json([
            'status'=>200,
            'message'=>'Added'
        ]);
    }
    public function delivery(Request $request)
    {
        $email = $request->input('email');
        $user = User::where('email', '=', $email)->first();
        if($user === null) {
            return response()->json([
                'status'=>404,
                'message'=>'This email is not registered. Please sign up'
            ]);
        }else{
            $delivery = new Delivery;
            $delivery->user_id = $user->id;
            $delivery->email = $email;
            $delivery->phone = $request->input('phone');
            $delivery->home = $request->input('home');
            $delivery->city = $request->input('city');
            return response()->json([
                'status'=>200,
                'message'=>'Success'
            ]);
        }
    }
}
