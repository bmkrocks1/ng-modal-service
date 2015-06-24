/**
 * Copyright (c) 2015 Billie Ko <billie.mikhael@gmail.com>
 * Licensed under the MIT license.
 */
angular.module('modal-service', ['ui.bootstrap'])

    .provider('modalService', function() {
        'use strict';

        var modalMap = {};

        this.modal = function(name, options) {
            modalMap[name] = options;
        };

        this.$get = function($modal) {
            return {
                open: function(name, params) {
                    var options = angular.extend({}, modalMap[name]);
                    options.resolve = options.resolve || {};
                    angular.extend(options.resolve, {
                        modalParams: function() { return params || {}; }
                    });
                    return $modal.open(options);
                }
            };
        };
    })

    .directive('openModal', ['modalService', '$parse', function(modalService, $parse) {
        'use strict';

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                function parseModalRef(ref, current) {
                    var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
                    if (preparsed) ref = current + '(' + preparsed[1] + ')';
                    parsed = ref.replace(/\n/g, ' ').match(/^([^(]+?)\s*(\((.*)\))?$/);
                    if (!parsed || parsed.length !== 4) throw new Error('Invalid modal ref "' + ref + '"');
                    return { modal: parsed[1], paramExpr: parsed[3] || null };
                }

                var ref = parseModalRef(attrs.openModal),
                    params = null,
                    onClose = attrs.onClose ? $parse(attrs.onClose) : angular.noop,
                    onDismiss = attrs.onDismiss ? $parse(attrs.onDismiss) : angular.noop;

                if (ref.paramExpr) {
                    params = angular.copy(scope.$eval(ref.paramExpr));
                }

                if (element.prop('tagName').toUpperCase() === 'A') {
                    attrs.$set('href', '');
                    attrs.$set('target', '');
                }

                element.bind('click', function(e) {
                    var modalInstance = modalService.open(ref.modal, params);
                    modalInstance.result.then(
                        function(result) {
                            onClose(scope, {result: result});
                        },
                        function(reason) {
                            onDismiss(scope, {reason: reason});
                        }
                    );
                });
            }
        };
    }]);