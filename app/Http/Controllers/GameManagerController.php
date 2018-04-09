<?php
namespace App\Http\Controllers;

use App\GameManager;
use Auth;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;
use Log;

class GameManagerController extends Controller
{
	public function hotUpdate(Request $request){
		Log::info("hotUpdate");
		$result = 'ok';
		return response()->success(compact('result'));
	}
}

?>