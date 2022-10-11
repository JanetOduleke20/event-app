<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function addUser(Request $request) {
        $user = new User;
        $user->first_name = $request->input("firstname");
        $user->last_name = $request->input("lastname");
        $user->email = $request->input("email");
        $user->password = Hash::make($request->input("password"));
        if($request->input("email")=="janetoduleke17@gmail.com") {
            $user->role_as = 1;
        }
        $user->save();

        return response()->json([
            'status'=> 200,
            'message'=>"Sign up successful"
        ]);
    }
    public function login(Request $request) {
        $user = new User;
        $email = $request->input("loginemail");
        $password = $request->input("loginpassword");
        $login = $user->where('email', '=', $email)->first();

        if($login->role_as ===0 && Hash::check($password, $login->password)) {
            Auth::login($login);
            return response()->json([
                'status'=> 200,
                'isAdmin'=>false,
                'message'=> "Success"
            ]);
        }
        if(!Hash::check($password, $login->password)) {
            return response()->json([
                'status'=> 404,
                'error'=> "Details not found"
            ]);
        }
        if($login->role_as ===1 && Hash::check($password, $login->password)) {
            return response()->json([
                'isAdmin'=> true,
                'message'=> "Confirmed user is an admin",
            ]);
        }
    }
    public function getHistory(Request $request)
    {
        $email = $request->input('email');
        $user = User::where('email', '=', $email)->first();
        $userHistory = Order::where('user_id', '=', $user->id)->get();
        return response()->json([
            'status'=>200,
            'userHistory'=>$userHistory
        ]);
    }
}
