# angular-modal-service
Very easy to use [UI Bootstrap](https://github.com/angular-ui/bootstrap)'s modal service.

***

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Installation

`bower install ng-modal-service`

## How To Use

```javascript
angular.module('myApp', ['modal-service']);
```

Register modal in angular.config() through `modalServiceProvider`.

```javascript
modalServiceProvider.modal('modalName', {
      // modal options
      templateUrl: 'some/path/sample-modal.html',
      controller: 'modalCtrl',
      // etc..
    });
```

## Two ways in activating a modal:

#### 1. Call `modalService` in your controller.
```javascript
angular.module('myComponent')
  .controller('MyComponentCtrl', function(modalService) {
    var modalInstance = modalService.open('modalName');
  })
```

#### 2. Use `open-modal` directive in a link or button.
```html
<a open-modal="modalName({data: 'resolvedData'})" on-close="onCloseCallback(result)" on-dismiss="onDismissCallback(reason)"></a>
```
Resolved data are available in modalParams.
```javascript
angular.module('myComponent')
  .controller('MyComponentCtrl', function(modalParams) {
    var data = modalParams.data;
    
    $scope.onCloseCallback = function(result) {
    };
    
    $scope.onDismissCallback = function(reason) {
    };
  })
```
