<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GoodsController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// User
Route::post("/signup", [UserController::class, 'addUser']);
Route::post("/login", [UserController::class, 'login']);


// Category
Route::post("/addcategory", [GoodsController::class, 'createCategory']);
Route::get("/getCategory", [GoodsController::class, 'getCategory']);

// Goods
// Route::post("/getGoods", [GoodsController::class, 'addGoods']);
Route::post("/addGoods", [GoodsController::class, 'addGoods']);
Route::get("/allGoods", [GoodsController::class, 'getGoods']);
Route::post("/getCategoryName", [GoodsController::class, 'getCategoryName']);
Route::post("/getProducts", [GoodsController::class, 'getProductById']);
Route::post("/getProductsByCategories", [GoodsController::class, 'getProductsByCategories']);


//Cart
Route::post('/addtocart', [CartController::class, 'addToCart']);
Route::post('/getCartItems', [CartController::class, 'getCartItems']);
Route::post('/deleteCartItem', [CartController::class, 'deleteItemFromCart']);
Route::post('/increaseItem', [CartController::class, 'increaseItem']);
Route::post('/decreaseItem', [CartController::class, 'decreaseItem']);

//UserHistory
Route::post('/getUserHistory', [UserController::class, 'getHistory']);

// Order
Route::post('/saveUserOrders', [OrderController::class, 'saveUserOrder']);
Route::post('/delivery', [OrderController::class, 'delivery']);






