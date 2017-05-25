dateTimePickerClass.$inject = ['$rootScope']
function dateTimePickerClass($rootScope) {
    return {
        require: '?ngModel',
        restrict: 'AE',
        scope: {
            pick12HourFormat: '@',
            language: '@',
            useCurrent: '@',
            location: '@',
            dateTime: '='
        },
        link: function (scope, elem) {
            elem.datetimepicker({
                pick12HourFormat: scope.pick12HourFormat,
                language: scope.language,
                useCurrent: scope.useCurrent,
                locale: moment.locale('zh-cn')
            })

            //Local event change
            elem.on('blur', function () {

                // console.info('this', this);
                // console.info('scope', scope);
                // console.info('attrs', attrs);
                // console.info('input', elem.data("DateTimePicker").date().format());
                
                // returns moments.js format object
                scope.dateTime = Date.parse(new Date(elem.data("DateTimePicker").date().format())) / 1000;
                // console.log('input ', scope.dateTime);

                // Global change propagation
                $rootScope.$broadcast("dateTimePicker", {
                    location: scope.location,
                    action: 'changed',
                    datatime: scope.dateTime,
                    example: scope.useCurrent
                });
                scope.$apply();
            })
        }
    }
}

export const DateTimePickerComponent = dateTimePickerClass