require([
    'tor.application/main'
], function (Application, undefined) {

    module('Application');
    test('Application must have start method', function () {
        ok(Application.prototype.start, 'Application have start');
    });

});
