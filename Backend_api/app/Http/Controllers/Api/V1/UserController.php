<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{

    public function index()
    {
        $query=User::with(['role','profile']);
        dd($query);

        return response()->json([
            'status'=>'success',
            'data'=>$query
        ]);
    }




}
