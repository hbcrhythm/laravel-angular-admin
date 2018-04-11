<?php
namespace App\Http\Controllers;

use App\GameManager;
use Auth;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;
use Log;
use \Curl\Curl;

class GameManagerController extends Controller
{
	public function hotUpdate(Request $request){
		Log::info("hotUpdate");
		$curl = new Curl();
		$curl->get('http://127.0.0.1:10001/gm2?hotupdate');
		if ($curl->error) {
		    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
		    $result = $curl->errorMessage;
		} else {
		    // echo 'Response:' . "\n";
		    // var_dump($curl->response);
		    $isSuccess = preg_match("/failed/i", $curl->response)? false: true;
		    $result = array($isSuccess, $curl->response);
		}
		return response()->success($result);
	}
}

?>