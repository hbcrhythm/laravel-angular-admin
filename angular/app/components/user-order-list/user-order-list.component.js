class UserOrderListController {
	constructor ($scope, $state, API, $log, DTOptionsBuilder, DTColumnBuilder, $compile) {
		this.API = API
		this.$log = $log
		this.$state = $state
		this.$scope = $scope
		this.DTOptionsBuilder = DTOptionsBuilder
		this.DTColumnBuilder = DTColumnBuilder
		this.$compile = $compile
		this.dateTime1 = ""
		this.dateTime2 = ""
		this.dateTime3 = ""
		this.dateTime4 = ""
		this.dtInstance = {}
		this.dtInstance1 = {}

		let Restaurants = this.API.service('restaurant')

		this.dtOptions1 = DTOptionsBuilder.fromFnPromise(function() {
			return Restaurants.getList()
		}).withPaginationType('full_numbers').withDataProp('data')

		this.dtColumns1 = [
			DTColumnBuilder.newColumn('seller').withTitle('店铺'),
			DTColumnBuilder.newColumn('users.name').withTitle('小主'),
			DTColumnBuilder.newColumn('variety').withTitle('菜肴'),
			DTColumnBuilder.newColumn('price').withTitle('RMB')
		]

		this.displayTable = true

		let Statistics = this.API.service('statistics', this.API.all('restaurant'))
		this.dtOptions2 = DTOptionsBuilder.fromFnPromise(function() {
			return Statistics.getList()
		}).withPaginationType('full_numbers').withDataProp('data')

		this.dtColumns2 = [
			DTColumnBuilder.newColumn('name').withTitle('店铺'),
			DTColumnBuilder.newColumn('rmb').withTitle('预收'),
			DTColumnBuilder.newColumn('count').withTitle('订单量')
		]

		this.displayTable2 = true

		// let Statistics = this.API.service('statistics', this.API.all('restaurant'))
		// Statistics.getList()
		// 	.then((response) => {
		// 		let dataSet = response.plain()
		// 		this.dtOptions2 = DTOptionsBuilder.newOptions()
		// 			.withOption('data', dataSet)
		// 			.withOption('createRow', createdRow2)
		// 			.withOption('responsive', true)
		// 			.withBootstrap()

		// 		this.dtColumns2 = [
		// 			DTColumnBuilder.newColumn('name').withTitle('店铺'),
		// 			DTColumnBuilder.newColumn('rmb').withTitle('预收'),
		// 			DTColumnBuilder.newColumn('count').withTitle('订单量')
		// 		]

		// 		this.displayTable2 = true
		// 	})

		// let createdRow2 = (row) => {
		// 	$compile(angular.element(row).contents())($scope)
		// }

		$scope.$on("dateTimePicker", function(event, data){
			event
			data
		})

		// this.$log.info(this.dtInstance)
	}

	$onInit () {}

	click(){
		this.$log.info(this.dateTime1)
		this.$log.info(this.dateTime2)
		let Excel = this.API.service('excel', this.API.all('restaurant'))
		Excel.getList()
			.then((response) => {
				response
				this.$log.info("success ！")
			})
	}

	reloadData() {

		this.dtInstance.rerender() 
	}

	submitOrderList(){

		let dateTime1 = this.dateTime1
		let dateTime2 = this.dateTime2

		let Restaurants = this.API.service('restaurant')
		this.dtInstance.changeData(function(){
			return Restaurants.getList({
						starttime: dateTime1,
						endtime: dateTime2
					})
		})
	}

	submitOrderInfo() {

		let dateTime3 = this.dateTime3
		let dateTime4 = this.dateTime4

		let Statistics = this.API.service('statistics', this.API.all('restaurant'))

		this.dtInstance.changeData(function(){
			return Statistics.getList({
				starttime : dateTime3,
				endtime : dateTime4
			})
		})
	}

}

export const UserOrderListComponent = {
	templateUrl: './views/app/components/user-order-list/user-order-list.component.html',
	controller: UserOrderListController,
	controllerAs: 'vm',
	bindings: {}
}