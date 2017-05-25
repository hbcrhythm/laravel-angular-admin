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
		this.dtInstance = {}


		let Restaurants = this.API.service('restaurant')
		this.Restaurants = Restaurants
		Restaurants.getList()
			.then((response) => {
				console.log(response)
				let dataSet = response.plain()
				
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
			})

			// this.createdRow1 = (row) => {
			// 	$compile(angular.element(row).contents())($scope)
			// }



		// let Restaurants = this.API.service('restaurant')
		// Restaurants.getList()
		// 	.then((response) => {

		// 		let dataSet = response.plain()
				
		// 		this.dtOptions1 = DTOptionsBuilder.newOptions()
		// 			.withOption('data', dataSet)
		// 			.withOption('createdRow', createdRow1)
		// 			.withOption('responsive', true)
		// 			.withBootstrap()

		// 		this.dtColumns1 = [
		// 			DTColumnBuilder.newColumn('seller').withTitle('店铺'),
		// 			DTColumnBuilder.newColumn('users.name').withTitle('小主'),
		// 			DTColumnBuilder.newColumn('variety').withTitle('菜肴'),
		// 			DTColumnBuilder.newColumn('price').withTitle('RMB')
		// 		]

		// 		this.displayTable = true
		// 	})

		// 	let createdRow1 = (row) => {
		// 		$compile(angular.element(row).contents())($scope)
		// 	}

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

		$scope.$on("dateTimePicker", function(event, data){
			event
			data
			// this.$log.info($scope)
		})

		this.$log.info(this.dtInstance)
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

	newPromise(Restaurants) {
		console.log(Restaurants.post({
			'starttime' : this.dateTime1,
			'endtime' : this.dateTime2
			}))
		return Restaurants.post({
			'starttime' : this.dateTime1,
			'endtime' : this.dateTime2
			})
	}
	submit(){
		let $compile = this.$compile
		let $state = this.$state
		let $scope = this.$scope
		let DTOptionsBuilder = this.DTOptionsBuilder
		let DTColumnBuilder = this.DTColumnBuilder
		let Restaurants = this.API.service('restaurant')
		Restaurants.post({
			starttime: this.dateTime1,
			endtime: this.dateTime2
		}).then((response) => {

				let dataSet = response.plain()
				
				// this.dtOptions1 = this.dtOptions1
				// 	.withOption('destroy', true)
				// 	.withOption('data', dataSet)
				// 	.withOption('createdRow', this.createdRow1)
				// 	.withOption('responsive', true)
				// 	.withBootstrap()

				this.dtOptions1 = DTOptionsBuilder.newOptions()
					.withDataProp('data')
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

			// 	// this.dtColumns1 = [
			// 	// 	DTColumnBuilder.newColumn('seller').withTitle('店铺'),
			// 	// 	DTColumnBuilder.newColumn('users.name').withTitle('小主'),
			// 	// 	DTColumnBuilder.newColumn('variety').withTitle('菜肴'),
			// 	// 	DTColumnBuilder.newColumn('price').withTitle('RMB')
			// 	// ]

			// 	// this.displayTable = true
			// 	// var resetPaging = true
   //  //    			this.dtInstance.reloadData(function(){
   //  //    				console.log("reloadData")
   //  //    			}, resetPaging)

			// 	// this.dtInstance.changeData(dataSet.$promise)

			// 	// this.dtInstance.rerender();
   //  // 			let resetPaging = true;
			// 	// this.dtInstance.changeData(function(){
			// 	// 	this.dtOptions1.$promise;
			// 	// });
			// 	// // $scope.$apply()

			// })

			let createdRow = (row) => {
				$compile(angular.element(row).contents())($scope)
			}
	}

}

export const UserOrderListComponent = {
	templateUrl: './views/app/components/user-order-list/user-order-list.component.html',
	controller: UserOrderListController,
	controllerAs: 'vm',
	bindings: {}
}