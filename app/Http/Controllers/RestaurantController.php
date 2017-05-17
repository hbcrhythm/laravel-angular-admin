<?php
namespace App\Http\Controllers;

use App\Restaurant;
use Auth;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;
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

		if(Restaurant::where('role_id', $user['id'])->where('created_at', '>=', Carbon::today())->where('created_at', '<=', Carbon::tomorrow())->first()){ 
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
	public function getIndex () {

		$restaurant = Restaurant::with('users')->orderBy('seller', 'desc')->get();

		return response()->success(compact('restaurant'));
	}

	public function getStatistics () {
		$restaurant = Restaurant::with('users')->get();

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


}
?>