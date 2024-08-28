require([
    'tor.application/Application'
], function (Application, undefined) {

    module('Application');
    test('Application must have start method', function () {
        ok(Application.prototype.start, 'Application has start method');
    });

});
