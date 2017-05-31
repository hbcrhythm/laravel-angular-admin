<?php

namespace App\Http\Controllers;

use App\UserLog;
use Auth;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;
use Log;

class UserLogController extends Controller{

	public function postIndex(Request $request){

		$only = $request->only('week','content');
		Log::info($only);

		$user = Auth::user();

		$week = Carbon::createFromTimestamp($only['week'], "Asia/Shanghai");
		Log::info($week);

		UserLog::create([
			'role_id' => $user['id'],
			'content' => $only['content'],
			'week' => $week
		]);

		$result = 'ok';

		return response()->success(compact('result'));
	}

	public function getIndex() {
		
		$user = Auth::user();

		$userlog = UserLog::with('users')->where('role_id', $user['id'])->get();

		return response()->success(compact('userlog'));
	}

	public function getManagerlist() {

		$managerlist = UserLog::with('users')->get();

		return response()->success(compact('managerlist'));
	}

}


?>