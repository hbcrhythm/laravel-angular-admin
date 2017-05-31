class UserWeekLogController {
	constructor($scope, API) {
		this.$scope = $scope
		this.API = API 
		this.dateTime = ""

	}

	$onInit () {

	}

	save () {
		let $scope = this.$scope
		let UserLog = this.API.service('userlog')
		UserLog.post({
			'week': this.dateTime,
			'content' : $scope.htmlVariable
		}).then(function(){
			console.log("success!");
		})
	}
}

export const UserWeekLogComponent = {
	templateUrl: './views/app/components/user-week-log/user-week-log.component.html',
	controller: UserWeekLogController,
	controllerAs: 'vm',
	bindings: {}
}	