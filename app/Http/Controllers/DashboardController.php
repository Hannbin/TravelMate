<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = DB::table('users')->count();
        $totalTrips = DB::table('trips')->count();
        $openTrips = DB::table('trips')->where('status', 'open')->count();

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalTrips' => $totalTrips,
            'openTrips' => $openTrips
        ]);
    }
}