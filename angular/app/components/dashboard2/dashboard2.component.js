class DashboardController2 {
  constructor ($scope,$state, $stateParams, API, $log) {
    this.$state = $state
    this.API = API
    this.$log = $log
    this.opResult = $stateParams.data

    this.$log.info($stateParams)
    this.alerts = []

    
    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
  }

  $onInit () {}
    
  click(){
    let opResult = this.opResult
    let $log  = this.$log
    let $state = this.$state
    this.$log.info("click")
    this.$log.info($state.current)

    let $type
    let $title
    let HotUpdate = this.API.service('hotUpdate', this.API.all('gamemanager'))
    HotUpdate.post({
      }).then(function (response) {
        $log.info("click success !")
        $log.info({data: response.data})
        let alert = { type: 'success', 'title': 'Success!', msg: response.data}
        // $state.go($state.current, {data:response.data}, {reload:true})
        $log.info(response.data[0])
        if (response.data[0] == true){
          $type = 'success'
          $title = 'Success!'
        }else{
          $type = 'error'
          $title = "Error!"
        }
        let tips = {
            title: $title,
            text: response.data[1],
            type: $type,
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }
        swal(tips)
        // $state.go($state.current, { alerts: alert}, {reload:true})
      }, function(error) {
        $log.info("click fail !")
      })
  }
}


export const DashboardComponent2 = {
  templateUrl: './views/app/components/dashboard2/dashboard2.component.html',
  controller: DashboardController2,
  controllerAs: 'vm',
  bindings: {}
}
