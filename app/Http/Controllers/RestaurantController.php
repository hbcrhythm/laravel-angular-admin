<?php
namespace App\Http\Controllers;

use App\Restaurant;
use Auth;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;
use Excel;
use Log;


class RestaurantController extends Controller
{
	public function order(Request $request)
	{
		$user = Auth::user();

		$this->validate($request, [
			'variety' => 'required|min:3',
			'price' => 'required',
			'seller' => 'required|min:3'
		]);
		
		$only = $request->only('variety', 'price', 'seller');

		$TodayStart = strtotime(date('Ymd'));
		$TodayEnd = $TodayStart + 86400;

		$user = Auth::user();

		if(Restaurant::where('role_id', $user['id'])->where('created_at', '>=', Carbon::today("Asia/Shanghai"))->where('created_at', '<=', Carbon::tomorrow("Asia/Shanghai"))->first()){ 
			return response()->error('Today has been order');
		};

		Restaurant::create([
			'role_id' => $user['id'],
			'variety' => $only['variety'],
			'price' => $only['price'],
			'seller' => $only['seller'],
		]);

		$result = 'ok';
		return response()->success(compact('result'));

	}

	/**
	 * Get All Orders
	 *
	 */
	public function getIndex (Request $request) {
		
		$only = $request->only('starttime', 'endtime');

		if(empty($only['starttime'])){
			$restaurant = Restaurant::with('users')->orderBy('seller', 'desc')->get();
		}else{
			$restaurant = Restaurant::with('users')->where('created_at', '>=', Carbon::createFromTimestamp($only['starttime'], "Asia/Shanghai"))->where('created_at', '<=', Carbon::createFromTimestamp($only['endtime'], "Asia/Shanghai"))->orderBy('seller', 'desc')->get();
		}

		return response()->success(compact('restaurant'));
	}

	public function getStatistics (Request $request) {
		
		$only = $request->only('starttime', 'endtime');

		if(empty($only['starttime'])){
			$restaurant = Restaurant::with('users')->get();
		}else{
			$restaurant = Restaurant::with('users')->where('created_at', '>=', Carbon::createFromTimestamp($only['starttime'], "Asia/Shanghai"))->where('created_at', '<=', Carbon::createFromTimestamp($only['endtime'], "Asia/Shanghai"))->get();
		}

		$arrKind = array();
		foreach ($restaurant as $value) {
			
			if(empty($arrKind[$value->seller])){
				$arrKind[$value->seller]['rmb'] = 0;
				$arrKind[$value->seller]['count'] = 0;
			}

			$arrKind[$value->seller]['rmb'] += $value->price;
			$arrKind[$value->seller]['count'] += 1;
		}

		foreach ($arrKind as $key => $value) {
			$subKind['name'] = $key;
			$subKind['rmb'] = $value['rmb'];
			$subKind['count'] = $value['count'];
			$statistics[] = $subKind;
		}

		return response()->success(compact('statistics'));
	}

	public function postIndex(Request $request) {
		
		$this->validate($request, [
			'starttime' => 'required',
			'endtime' => 'required'
		]);
		
		$only = $request->only('starttime', 'endtime');
		Log::info("postindex");
		Log::info($only);
		Log::info(Carbon::createFromTimestamp($only['starttime'], "Asia/Shanghai"));
		Log::info(Carbon::createFromTimestamp($only['endtime'], "Asia/Shanghai"));

		$restaurant = Restaurant::with('users')
		->where('created_at', '>=', Carbon::createFromTimestamp($only['starttime'], "Asia/Shanghai"))
		->where('created_at', '<=', Carbon::createFromTimestamp($only['endtime'], "Asia/Shanghai"))->orderBy('seller', 'desc')->get();

		return response()->success(compact('restaurant'));
	}

	public function getExcel () {
		$restaurant = Restaurant::with('users')->orderBy('seller', 'desc')->get();
		foreach ($restaurant as $value) {
			$export[] = array(
				'id' => $value['id'],
				'名字' => $value['users']['name'],
				'菜肴' => $value['variety'],
				'价格' => $value['price'],
				'店铺' => $value['seller'],
				'下单时间' => $value['created_at']
			);
		}
		Excel::create('Filename', function($excel) use($export) {
    		 $excel->sheet('export', function($sheet) use ($export) {
		        $sheet->fromArray($export);

		    });
    		 $excel->sheet('export1', function($sheet) use ($export) {
		        $sheet->fromArray($export);

		    });
		})->store('xls');
		$excel[] = "ok";
		return response()->success(compact('excel'));
	}

	public function getLog (Request $request) {

		$this->validate($request, [
			'starttime',
			'endtime'
		]);
		
		$only = $request->only('starttime', 'endtime');

		$startTime = $only['starttime'];
		$endTime = $only['endtime'];

		$user = Auth::user();

		if(empty($startTime)){
			$log = Restaurant::with('users')->where('role_id', $user['id'])->get();
		}else{
			$log = Restaurant::with('users')->where('role_id', $user['id'])->where('created_at', ">=", Carbon::createFromTimestamp($only['starttime'], "Asia/Shanghai"))->where('created_at', "<=", Carbon::createFromTimestamp($only['endtime'], "Asia/Shanghai"))->get();
		}

		return response()->success(compact('log'));
	}
}
?>