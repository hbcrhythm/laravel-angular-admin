class UserWeekLogListController {
	constructor (API, DTOptionsBuilder, DTColumnBuilder){
		
		this.API = API
		this.DTOptionsBuilder = DTOptionsBuilder
		this.DTColumnBuilder = DTColumnBuilder
		this.dtInstance = {}

		let UserLog = this.API.service('userlog');
	
		// UserLog.getList().then(function(response){
		// 	console.log(response)
		// })
		
		this.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
			return UserLog.getList()
		}).withPaginationType('full_numbers').withDataProp('data')

		this.dtColumns = [
			DTColumnBuilder.newColumn('users.name').withTitle('小主'),
			DTColumnBuilder.newColumn('week').withTitle('周报日期'),
			DTColumnBuilder.newColumn('created_at').withTitle('创建时间'),
			DTColumnBuilder.newColumn('content').withTitle('内容')
		]

		this.displayTable = true
	}

	submit () {

	}
}

export const UserWeekLogListComponent = {
	templateUrl: './views/app/components/user-week-log-list/user-week-log-list.component.html',
	controller: UserWeekLogListController,
	controllerAs: 'vm',
	bindings: {}
}