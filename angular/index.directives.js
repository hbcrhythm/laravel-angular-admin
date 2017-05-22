import { RouteBodyClassComponent } from './directives/route-bodyclass/route-bodyclass.component'
import { PasswordVerifyClassComponent } from './directives/password-verify/password-verify.component'
var dateTimePicker = function ($rootScope) {

        return {
            require: '?ngModel',
            restrict: 'AE',
            scope: {
                pick12HourFormat: '@',
                language: '@',
                useCurrent: '@',
                location: '@'
            },
            link: function (scope, elem, attrs) {
                elem.datetimepicker({
                    pick12HourFormat: scope.pick12HourFormat,
                    language: scope.language,
                    useCurrent: scope.useCurrent
                })

                //Local event change
                elem.on('blur', function () {

                    console.info('this', this);
                    console.info('scope', scope);
                    console.info('attrs', attrs);


                    /*// returns moments.js format object
                    scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                    // Global change propagation
                    $rootScope.$broadcast("emit:dateTimePicker", {
                        location: scope.location,
                        action: 'changed',
                        dateTime: scope.dateTime,
                        example: scope.useCurrent
                    });
                    scope.$apply();*/
                })
            }
        };
   }

angular.module('app.components')
  .directive('routeBodyclass', RouteBodyClassComponent)
  .directive('passwordVerify', PasswordVerifyClassComponent)
  .directive('dateTimePicker', dateTimePicker);
