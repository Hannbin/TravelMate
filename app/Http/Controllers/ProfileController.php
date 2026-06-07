<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
      public function getProfile($id)
    {
        $user = DB::table('users')
            ->where('id', $id)
            ->first();

        $createdTrips = DB::table('trips')
            ->where('user_id', $id)
            ->get();

        $joinedTrips = DB::table('trip_members')
            ->join('trips', 'trip_members.trip_id', '=', 'trips.id')
            ->where('trip_members.user_id', $id)
            ->where('trip_members.status', 'approved')
            ->select('trips.*')
            ->get();

        return response()->json([
            'user' => $user,
            'createdTrips' => $createdTrips,
            'joinedTrips' => $joinedTrips
        ]);
    }

    public function getUsers()
{
    return DB::table('users')
        ->select(
            'id',
            'name',
            'avatar',
            'bio'
        )
        ->get();
}

    public function myTrips($userId)
{
    $createdTrips = DB::table('trips')
        ->where('user_id', $userId)
        ->get();

    $joinedTrips = DB::table('trip_members')
        ->join('trips', 'trip_members.trip_id', '=', 'trips.id')
        ->where('trip_members.user_id', $userId)
        ->where('trip_members.status', 'approved')
        ->select('trips.*')
        ->get();

    return response()->json([
        'createdTrips' => $createdTrips,
        'joinedTrips' => $joinedTrips
    ]);
}
    
    public function myCreatedTrips($id)
{
    $trips = DB::table('trips')
        ->where('user_id', $id)
        ->get();

    return response()->json($trips);
}

}