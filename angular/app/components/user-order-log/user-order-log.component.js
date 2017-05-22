class UserOrderLogController {
	constructor ($scope, $log, API, DTOptionsBuilder, DTColumnBuilder, $compile) {
		this.API = API
		this.$log = $log
		let RestaurantLog = this.API.service('log', this.API.all('restaurant'))
		RestaurantLog.getList()
			.then((response) => {
				let dataSet = response.plain()
				this.dtOptions = DTOptionsBuilder.newOptions()
					.withOption('data', dataSet)
					.withOption('createdRow', createdRow)
					.withOption('responsive', true)
					.withBootstrap()

				this.dtColumns = [
					DTColumnBuilder.newColumn('seller').withTitle('店铺'),
					DTColumnBuilder.newColumn('users.name').withTitle('小主'),
					DTColumnBuilder.newColumn('variety').withTitle('菜肴'),
					DTColumnBuilder.newColumn('price').withTitle('RMB'),
					DTColumnBuilder.newColumn('created_at').withTitle('日期')
				]

				this.displayTable = true

			})

			let createdRow = (row) => {
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
}

export const UserOrderLogComponent = {
	templateUrl: './views/app/components/user-order-log/user-order-log.component.html',
	controller: UserOrderLogController,
	controllerAs: 'vm',
	bindings: {}
}