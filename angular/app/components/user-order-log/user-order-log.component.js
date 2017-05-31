class UserOrderLogController {
	constructor ($scope, $log, API, DTOptionsBuilder, DTColumnBuilder, $compile) {
		this.API = API
		this.$log = $log
		this.dateTime1 = ""
		this.dateTime2 = ""
		this.dtInstance = {}

		let RestaurantLog = this.API.service('log', this.API.all('restaurant'))
		
		this.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
			return RestaurantLog.getList()
		}).withPaginationType('full_numbers').withDataProp('data')

		this.dtColumns = [
			DTColumnBuilder.newColumn('seller').withTitle('店铺'),
			DTColumnBuilder.newColumn('users.name').withTitle('小主'),
			DTColumnBuilder.newColumn('variety').withTitle('菜肴'),
			DTColumnBuilder.newColumn('price').withTitle('RMB'),
			DTColumnBuilder.newColumn('created_at').withTitle('日期')
		]

		this.displayTable = true
	}

	$onInit () {}

	click(){
		let Excel = this.API.service('excel', this.API.all('restaurant'))
		Excel.getList()
			.then((response) => {
				response
				this.$log.info("success ！")
			})
	}

	submit () {

		let startTime = this.dateTime1;
		let endTime = this.dateTime2;

		let RestaurantLog = this.API.service('log', this.API.all('restaurant'))

		this.dtInstance.changeData(function(){
			return RestaurantLog.getList({
				starttime : startTime,
				endtime : endTime
			})
		})
	}
}

export const UserOrderLogComponent = {
	templateUrl: './views/app/components/user-order-log/user-order-log.component.html',
	controller: UserOrderLogController,
	controllerAs: 'vm',
	bindings: {}
}