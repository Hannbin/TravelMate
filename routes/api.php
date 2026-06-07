<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::post('/create-trip', [TripController::class, 'createTrip']);
Route::get('/trips', [TripController::class, 'getTrips']);
Route::post('/join-trip', [TripController::class, 'joinTrip']);
Route::post('/approve-member', [TripController::class, 'approveMember']);
Route::get('/trip-members/{trip_id}', [TripController::class, 'tripMembers']);
Route::post('/conversation', [ChatController::class, 'getOrCreateConversation']);
Route::post('/send-message', [ChatController::class, 'sendMessage']);
Route::get('/messages/{id}', [ChatController::class, 'getMessages']);
Route::get('/conversations/{user_id}', [ChatController::class, 'getConversations']);
Route::get('/dashboard/{userId}', [TripController::class, 'dashboard']);
Route::get('/trip/{id}', [TripController::class, 'getTripDetail']);
Route::get('/pending-members/{tripId}',[TripController::class,'pendingMembers']);
Route::get('/profile/{id}', [ProfileController::class, 'getProfile']);
Route::get('/my-created-trips/{id}',[ProfileController::class,'myCreatedTrips']);
Route::get('/my-trips/{userId}', [ProfileController::class, 'myTrips']);
Route::get('/manage-trip/{id}', [TripController::class,'manageTrip']);
Route::get('/users',[ProfileController::class,'getUsers']);
Route::post('/reject-member',[TripController::class,'rejectMember']);
