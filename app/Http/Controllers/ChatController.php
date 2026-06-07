<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    // 1. Tạo hoặc lấy conversation
    public function getOrCreateConversation(Request $request)
    {
        $user1 = $request->input('user_one');
        $user2 = $request->input('user_two');

        if (!$user1 || !$user2) {
            return response()->json(['message' => 'Missing data'], 400);
        }

        $conversation = DB::table('conversations')
            ->where(function ($q) use ($user1, $user2) {
                $q->where('user_one', $user1)
                  ->where('user_two', $user2);
            })
            ->orWhere(function ($q) use ($user1, $user2) {
                $q->where('user_one', $user2)
                  ->where('user_two', $user1);
            })
            ->first();

        if (!$conversation) {
            $id = DB::table('conversations')->insertGetId([
                'user_one' => $user1,
                'user_two' => $user2,
                'created_at' => now()
            ]);

            $conversation = DB::table('conversations')->where('id', $id)->first();
        }

        return response()->json($conversation);
    }

    // 2. Gửi tin nhắn
    public function sendMessage(Request $request)
{
    $trip_id = $request->input('trip_id');
    $sender_id = $request->input('sender_id');
    $message = $request->input('message');

    if (!$trip_id || !$sender_id || !$message) {
        return response()->json(['message' => 'Missing data'], 400);
    }

    DB::table('messages')->insert([
        'conversation_id' => $trip_id, // 🔥 map qua đây
        'sender_id' => $sender_id,
        'message' => $message,
        'is_read' => 0,
        'created_at' => now()
    ]);

    return response()->json(['message' => 'Send success']);
}

    // 3. Lấy tin nhắn
  public function getMessages($trip_id)
{
    return DB::table('messages')
        ->where('conversation_id', $trip_id) // 🔥 map luôn
        ->orderBy('created_at', 'asc')
        ->get();
}

    // 4. Danh sách conversation
    public function getConversations($user_id)
    {
        $conversations = DB::table('conversations')
            ->where('user_one', $user_id)
            ->orWhere('user_two', $user_id)
            ->get();

        return response()->json($conversations);
    }
}