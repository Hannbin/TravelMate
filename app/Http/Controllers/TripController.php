<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TripController extends Controller
{
    public function createTrip(Request $request)
{
    try {

        DB::table('trips')->insert([
    'user_id' => $request->user_id,
    'title' => $request->title,
    'destination' => $request->destination,
    'start_date' => $request->start_date,
    'end_date' => $request->end_date,
    'description' => $request->description,
    'max_members' => $request->max_members,

    'cover_image' => '',
    'budget' => 0,
    'itinerary' => '',
    'includes' => '',
    'excludes' => '',

    'status' => 'open',
    'created_at' => now(),
    'updated_at' => now()
]);

        return response()->json([
            'message' => 'success'
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'error' => $e->getMessage()
        ], 500);

    }
}

    // public function getTrips()
    // {
    //     $trips = DB::table('trips')
    //         ->join('users', 'trips.user_id', '=', 'users.id')
    //         ->select('trips.*', 'users.name as creator_name')
    //         ->get();

    //     return response()->json($trips);
    // }
    public function getTrips()
{
    $trips = DB::table('trips')->get();

    return response()->json($trips);
}

   public function joinTrip(Request $request)
{
    $trip_id = $request->trip_id;
    $user_id = $request->user_id;

    // Kiểm tra trip tồn tại
    $trip = DB::table('trips')->where('id', $trip_id)->first();
    if (!$trip) {
        return response()->json(['message' => 'Trip not found']);
    }

    // Kiểm tra user đã join chưa
    $exists = DB::table('trip_members')
        ->where('trip_id', $trip_id)
        ->where('user_id', $user_id)
        ->first();

    if ($exists) {
        return response()->json(['message' => 'Already joined']);
    }

    // Insert
    DB::table('trip_members')->insert([
        'trip_id' => $trip_id,
        'user_id' => $user_id,
        'status' => 'pending',
        'joined_at' => now()
    ]);

    return response()->json(['message' => 'Join success']);
    }

    public function approveMember(Request $request)
    {
        DB::table('trip_members')
            ->where('trip_id', $request->trip_id)
            ->where('user_id', $request->user_id)
            ->update([
                'status' => 'approved'
            ]);

        return response()->json([
            'message' => 'Member approved'
        ]);
    }

    public function pendingMembers($tripId)
{
    $members = DB::table('trip_members')
        ->join('users', 'trip_members.user_id', '=', 'users.id')
        ->where('trip_members.trip_id', $tripId)
        ->where('trip_members.status', 'pending')
        ->select(
            'users.id',
            'users.name',
            'users.avatar',
            'trip_members.joined_at'
        )
        ->get();

    return response()->json($members);
}

    public function tripMembers(int $trip_id)
{
    $members = DB::table('trip_members')
        ->join('users', 'trip_members.user_id', '=', 'users.id')
        ->where('trip_members.trip_id', $trip_id)
        ->where('trip_members.status', 'approved')
        ->select(
            'users.id',
            'users.name',
            'users.avatar',
            'trip_members.status',
            'trip_members.joined_at'
        )
        ->get();

    return response()->json($members);
}

    public function dashboard(int $userId)
{
    $availableTrips = DB::table('trips')->count();

    $myTrips = DB::table('trips')
        ->where('user_id', $userId)
        ->count();

    $joinedTrips = DB::table('trip_members')
    ->where('user_id', $userId)
    ->where('status','approved')
    ->count();

    $destinations = DB::table('trips')
        ->distinct()
        ->count('destination');

    return response()->json([
        'availableTrips' => $availableTrips,
        'myTrips' => $myTrips,
        'joinedTrips' => $joinedTrips,
        'destinations' => $destinations
    ]);
}
public function getTripDetail(int $id)
{
    $trip = DB::table('trips')
        ->leftJoin('users', 'trips.user_id', '=', 'users.id')
        ->where('trips.id', $id)
        ->select(
            'trips.*',
            'users.name as host_name',
            'users.email as host_email',
            'users.avatar as host_avatar',
            'users.bio as host_bio'
        )
        ->first();

    $members = DB::table('trip_members')
        ->join('users', 'trip_members.user_id', '=', 'users.id')
        ->where('trip_members.trip_id', $id)
        ->where('trip_members.status', 'approved')
        ->select(
            'users.id',
            'users.name',
            'users.avatar'
        )
        ->get();

    return response()->json([
        'trip' => $trip,
        'members' => $members
    ]);
}

public function manageTrip($id)
{
    $trip = DB::table('trips')
        ->where('id',$id)
        ->first();

    $pendingMembers = DB::table('trip_members')
        ->join('users','trip_members.user_id','=','users.id')
        ->where('trip_id',$id)
        ->where('status','pending')
        ->select(
            'users.id',
            'users.name',
            'users.avatar',
            'trip_members.joined_at'
        )
        ->get();

    $approvedMembers = DB::table('trip_members')
        ->join('users','trip_members.user_id','=','users.id')
        ->where('trip_id',$id)
        ->where('status','approved')
        ->select(
            'users.id',
            'users.name',
            'users.avatar',
            'trip_members.joined_at'
        )
        ->get();

    return response()->json([
        'trip'=>$trip,
        'pendingMembers'=>$pendingMembers,
        'approvedMembers'=>$approvedMembers
    ]);
}

public function rejectMember(Request $request)
{
    DB::table('trip_members')
        ->where('trip_id', $request->trip_id)
        ->where('user_id', $request->user_id)
        ->delete();

    return response()->json([
        'message' => 'Member rejected'
    ]);
}
}