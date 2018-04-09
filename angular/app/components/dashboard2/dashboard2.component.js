class DashboardController2 {
  constructor ($scope, API, $log) {

    this.API = API
    this.$log = $log
  }

  $onInit () {}
    
  click(){
    this.$log.info("click")
    let HotUpdate = this.API.service('hotUpdate', this.API.all('gamemanager'))
    HotUpdate.post({
      }).then(function () {
        this.$log.info("click success !")
      }, function(error) {
        this.$log.info("click fail !")
      })
  }
}


export const DashboardComponent2 = {
  templateUrl: './views/app/components/dashboard2/dashboard2.component.html',
  controller: DashboardController2,
  controllerAs: 'vm',
  bindings: {}
}
