import { RouteBodyClassComponent } from './directives/route-bodyclass/route-bodyclass.component'
import { PasswordVerifyClassComponent } from './directives/password-verify/password-verify.component'
import { DateTimePickerComponent } from './directives/date-time-picker/date-time-picker.component'
// var dateTimePicker = function ($rootScope) {

//         return {
//             require: '?ngModel',
//             restrict: 'AE',
//             scope: {
//                 pick12HourFormat: '@',
//                 language: '@',
//                 useCurrent: '@',
//                 location: '@',
//                 dateTime: '='
//             },
//             link: function (scope, elem, attrs) {
//                 elem.datetimepicker({
//                     pick12HourFormat: scope.pick12HourFormat,
//                     language: scope.language,
//                     useCurrent: scope.useCurrent
//                 })

//                 //Local event change
//                 elem.on('blur', function () {

//                     console.info('this', this);
//                     console.info('scope', scope);
//                     console.info('attrs', attrs);
//                     console.info('input', elem.data("DateTimePicker").date().format());

//                     // returns moments.js format object
//                     scope.dateTime = Date.parse(new Date(elem.data("DateTimePicker").date().format())) / 1000;
//                     console.log('input ', scope.dateTime);

//                     // Global change propagation
//                     $rootScope.$broadcast("dateTimePicker", {
//                         location: scope.location,
//                         action: 'changed',
//                         datatime: scope.dateTime,
//                         example: scope.useCurrent
//                     });
//                     scope.$apply();
//                 })
//             }
//         };
//    }

angular.module('app.components')
  .directive('routeBodyclass', RouteBodyClassComponent)
  .directive('passwordVerify', PasswordVerifyClassComponent)
  .directive('dateTimePicker', DateTimePickerComponent)
