<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Goods;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GoodsController extends Controller
{
    public function createCategory(Request $request) {
        $category = new Category;
        $category->category_name = $request->input("category_name");
        if($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move("storage/categories/", $filename);
            $category->image = "storage/categories/".$filename;
            $category->save();
        }
        return response()->json([
            'status'=> 200,
            'message'=> 'Goods added successfully',
        ]);
    }
    public function getCategory(){
        $category= Category::get();
        return response()->json([
            'status'=> 200,
            'category'=> $category,
        ]);
    }

    public function addGoods(Request $request) {
        // $validator = Validator::make($request->all(), [
        //     'category_id'=>'required|max: 191',
        //     'name'=>'required|max: 191',
        //     'price'=>'required|max: 191',
        //     'description'=>'required|max: 191',
        //     'image'=>'required|mimes: jpeg,png,jpg|max:2048'
        // ]);
        // if($validator->fails()) {
        //     return response()->json([
        //         'status'=> 422,
        //         'error'=> 'Guess something is wrong',
        //     ]);
        // }else{
            $goods = new Goods;
            $goods->category_id = $request->input('category_id');
            $goods->name = $request->input('name');
            $goods->price = $request->input('price');
            $goods->units = $request->input("units");
            $goods->description = $request->input('description');

            if($request->hasFile('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move("storage/goods/", $filename);
                $goods->picture = "storage/goods/".$filename;
            }
            $goods->save();

            return response()->json([
                'status'=> 200,
                'message'=> 'Goods added successfully',
                'error'=>'Oops. Something don go wrong o',
            ]);
        }
    // }
    public function getGoods() {
        $category= Category::get();
        $goods = Goods::get();
        return response()->json([
            'status'=> 200,
            'goods'=>$goods,
            'category'=>$category
        ]);
    }
    public function getProductById(Request $request) {
        $goods = new Goods();
        $id = $request->input('id');
        $products = $goods->where('id', '=', $id)->first();
        return response()->json([
            'status' =>200,
            'products'=>$products
        ]);
    }
    public function getProductsByCategories(Request $request) {
        $goods = new Goods();
        $id = $request->input('id');
        $products = $goods->where('category_id', '=', $id)->get();
        return response()->json([
            'status' =>200,
            'products'=>$products
        ]);
    }

}
