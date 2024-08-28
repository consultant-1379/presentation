require.config({
    baseUrl:'../'
});
require([
    'backbone',
    'base',
    'widgets/table/row'
], function (Backbone, Base, Row) {
    test("QUnit Basic test", function () {
        var text = 'text';
        var row = new Row({
            model:new Base.Model({
                column1:text
            }),
            eventBus:new Base.EventBus(),
            config:new Base.Model({
                columns:[
                    {
                        id:'column1'
                    }
                ]
            })
        });
        equal(row.$('td:first-child').text(), text, "We expect value to be " + text);
    });
});
