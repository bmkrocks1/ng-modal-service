/**
 * Author: Billie Ko <bmkrocks@gmail.com>
 */
describe('Testing: modal-service', function() {
    'use strict';

    var $compile, $document, $rootScope;
    var modalServiceProvider, modalService;

    beforeEach(module('modal-service'));

    beforeEach(function() {
        module(function(_modalServiceProvider_) {
            modalServiceProvider = _modalServiceProvider_;

            modalServiceProvider.modal('alpha', {
                template: '<div>Content</div>'
            });

            modalServiceProvider.modal('beta', {
                template:
                    '<div>' +
                        '<button id="close" ng-click="close()">Close</button>' +
                        '<button id="dismiss" ng-click="dismiss()">Dismiss</button>' +
                    '</div>',

                controller: function($scope, $modalInstance) {
                    $scope.close = function() {
                        $modalInstance.close('beta modal closed');
                    };
                    $scope.dismiss = function() {
                        $modalInstance.dismiss('beta modal dismissed');
                    };
                }
            });
        });
    });

    beforeEach(inject(function(_$compile_, _$document_, _$rootScope_, _modalService_) {
        $compile = _$compile_;
        $document = _$document_;
        $rootScope = _$rootScope_;
        modalService = _modalService_;
    }));

    beforeEach(function() {
        Assertion.addMethod('toHaveOpenModal', function() {
            this._obj.find('body > div.modal').should.exist;
            this._obj.find('body > div.modal').should.be.visible;
        });

        Assertion.addMethod('toHaveOpenModalWithContent', function(content) {
            this._obj.find('body > div.modal > div.modal-dialog > div.modal-content').should.have.html(content);
        });
    });

    afterEach(function() {
        var body = $document.find('body');
        body.find('div.modal').remove();
        body.find('div.modal-backdrop').remove();
        body.removeClass('modal-open');
    });

    describe('modalService', function() {

        it('should open and dismiss a modal', function() {
            var modalInstance = modalService.open('alpha');
            $rootScope.$digest();
            expect($document).toHaveOpenModal();
            expect($document).toHaveOpenModalWithContent('<div class="ng-scope">Content</div>');

            modalInstance.dismiss();
            $rootScope.$digest();
            expect($document).not.toHaveOpenModal();
        });
    });

    describe('open-modal directive', function() {

        it('should open a modal on click', function() {
            var el = $compile(angular.element('<a open-modal="alpha"></a>'))($rootScope);
            el.click();
            $rootScope.$digest();
            expect($document).toHaveOpenModal();
        });

        it('should call on-close', function() {
            // create spy
            var onCloseCallbackSpy = chai.spy();
            expect(onCloseCallbackSpy).to.be.spy;
            $rootScope.onCloseCallback = function(result) {
                onCloseCallbackSpy(result);
            };

            var el = $compile(angular.element('<a open-modal="beta" on-close="onCloseCallback(result)"></a>'))($rootScope);
            el.click();
            $rootScope.$digest();
            expect($document).toHaveOpenModal();

            // close the modal
            var closeBtn = $document.find('#close');
            closeBtn.click();
            $rootScope.$digest();
            expect($document).not.toHaveOpenModal();
            expect(onCloseCallbackSpy).to.have.been.called.with('beta modal closed');
        });

        it('should call on-dismiss', function() {
            // create spy
            var onDismissCallbackSpy = chai.spy();
            expect(onDismissCallbackSpy).to.be.spy;
            $rootScope.onDismissCallback = function(result) {
                onDismissCallbackSpy(result);
            };

            var el = $compile(angular.element('<a open-modal="beta" on-dismiss="onDismissCallback(reason)"></a>'))($rootScope);
            el.click();
            $rootScope.$digest();
            expect($document).toHaveOpenModal();

            // dismiss the modal
            var dismissBtn = $document.find('#dismiss');
            dismissBtn.click();
            $rootScope.$digest();
            expect($document).not.toHaveOpenModal();
            expect(onDismissCallbackSpy).to.have.been.called.with('beta modal dismissed');
        });
    });
});