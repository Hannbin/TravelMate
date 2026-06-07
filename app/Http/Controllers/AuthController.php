<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        DB::table('users')->insert([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json([
            'message' => 'Register success'
        ]);
    }

    public function login(Request $request)
{
    $user = DB::table('users')
        ->where('email', $request->email)
        ->where('password', $request->password)
        ->first();

    if (!$user) {
        return response()->json([
            'message' => 'Sai tài khoản'
        ], 401);
    }

    return response()->json($user);
}
}