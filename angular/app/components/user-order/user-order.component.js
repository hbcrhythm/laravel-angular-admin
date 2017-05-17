class UserOrderController {
	constructor ($state, $stateParams, API, $log){
		'ngInject'

		this.formSubmitted = false
		this.API = API
		this.alerts = []
		this.$state = $state
		this.$log = $log

		if($stateParams.alerts){
			this.alerts.push($stateParams.alerts)
		}
	}

	// 闭包里面是无法需要访问的变量，需要在外部重新生命。 闭包内的this，已经改变。
	save(isValid) {
		if (isValid) {
			let Restaurant = this.API.service('order', this.API.all('restaurant'))
			let $state = this.$state

			Restaurant.post({
				'variety' : this.variety,
				'price' : this.price,
				'seller' : this.seller
			}).then(function () {
				let alert = { type: 'success', 'title': 'Success!', msg: 'Order has been finished.' }
				$state.go($state.current, { alerts: alert})
			}, function(error) {
				let alert = { type: 'error', title: 'Error!', msg: error.data.errors.message[0] }
				$state.go($state.current, { alerts: alert})
			})
		} else {
			this.formSubmitted = true
		}
	}

	$onInit () {}
}

export const UserOrderComponent = {
	templateUrl: './views/app/components/user-order/user-order.component.html',
	controller: UserOrderController,
	controllerAs: 'vm',
	bindings: {}
}