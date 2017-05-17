class UserOrderListController {
	constructor ($scope, API, $log, DTOptionsBuilder, DTColumnBuilder, $compile) {
		this.API = API
		this.$log = $log
		let Restaurants = this.API.service('restaurant')
		Restaurants.getList()
			.then((response) => {

				let dataSet = response.plain()
				
				this.dtOptions = DTOptionsBuilder.newOptions()
					.withOption('data', dataSet)
					.withOption('createdRow', createdRow)
					.withOption('responsive', true)
					.withBootstrap()

				this.dtColumns = [
					DTColumnBuilder.newColumn('users.name').withTitle('小主'),
					DTColumnBuilder.newColumn('seller').withTitle('店铺'),
					DTColumnBuilder.newColumn('variety').withTitle('菜肴'),
					DTColumnBuilder.newColumn('price').withTitle('RMB')
				]

				this.displayTable = true
			})

			let createdRow = (row) => {
				$compile(angular.element(row).contents())($scope)
			}

		let Statistics = this.API.service('statistics')
		Statistics.getList()
			.then((response) => {
				this.$log.info(response);
			})
	}

	$onInit () {}
}

export const UserOrderListComponent = {
	templateUrl: './views/app/components/user-order-list/user-order-list.component.html',
	controller: UserOrderListController,
	controllerAs: 'vm',
	bindings: {}
}