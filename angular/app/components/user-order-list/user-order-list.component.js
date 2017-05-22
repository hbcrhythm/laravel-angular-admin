class UserOrderListController {
	constructor ($scope, API, $log, DTOptionsBuilder, DTColumnBuilder, $compile) {
		this.API = API
		this.$log = $log

		let Restaurants = this.API.service('restaurant')
		Restaurants.getList()
			.then((response) => {

				let dataSet = response.plain()
				
				this.dtOptions1 = DTOptionsBuilder.newOptions()
					.withOption('data', dataSet)
					.withOption('createdRow', createdRow1)
					.withOption('responsive', true)
					.withBootstrap()

				this.dtColumns1 = [
					DTColumnBuilder.newColumn('seller').withTitle('店铺'),
					DTColumnBuilder.newColumn('users.name').withTitle('小主'),
					DTColumnBuilder.newColumn('variety').withTitle('菜肴'),
					DTColumnBuilder.newColumn('price').withTitle('RMB')
				]

				this.displayTable = true
			})

			let createdRow1 = (row) => {
				$compile(angular.element(row).contents())($scope)
			}

		let Statistics = this.API.service('statistics', this.API.all('restaurant'))
		Statistics.getList()
			.then((response) => {
				let dataSet = response.plain()
				this.dtOptions2 = DTOptionsBuilder.newOptions()
					.withOption('data', dataSet)
					.withOption('createRow', createdRow2)
					.withOption('responsive', true)
					.withBootstrap()

				this.dtColumns2 = [
					DTColumnBuilder.newColumn('name').withTitle('店铺'),
					DTColumnBuilder.newColumn('rmb').withTitle('预收'),
					DTColumnBuilder.newColumn('count').withTitle('订单量')
				]

				this.displayTable2 = true
			})

		let createdRow2 = (row) => {
			$compile(angular.element(row).contents())($scope)
		}
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
	let datepicker = $('#datetimepicker').datetimepicker({}).on('dp.change', function(e){
		var result = new moment(e.date).format('YYYY-MM-DD')
		$scope.dateOne = result
		$scope.$apply() 
	})
// let datepicker = $('#datetimepicker').datetimepicker({  
// format: 'YYYY-MM-DD',  
// locale: moment.locale('zh-cn')  
// }).on('dp.change', function (e) {  
// var result = new moment(e.date).format('YYYY-MM-DD') 
// $scope.dateOne = result  
// $scope.$apply() 
// })
}

export const UserOrderListComponent = {
	templateUrl: './views/app/components/user-order-list/user-order-list.component.html',
	controller: UserOrderListController,
	controllerAs: 'vm',
	bindings: {}
}