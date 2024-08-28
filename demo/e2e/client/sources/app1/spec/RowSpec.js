define([
    'backbone',
    'base',
    'widgets/table/row'
], function (Backbone, Base, Row) {
	console.log("RowSpec inside require functiongit ");
    describe("Row widget", function () {
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
        it("should contains text", function() {
            expect(row.$('td:first-child').text()).toEqual(text);
        });
    });
});
