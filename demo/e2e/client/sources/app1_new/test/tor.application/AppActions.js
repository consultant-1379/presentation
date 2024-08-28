define([
    'tor.application/Application',
    'tor.application/common/table/TableCollection',
    'tor.application/common/table/TableSettings',
    'Titan'
], function (Application, TableCollection, TableSettings, Titan) {

    describe("Application", function () {

        var app = null;
        var container = null;

        beforeEach(function() {
            Titan.utils.jQuery('#testContainer').html('');

            Titan.mock.register(TableCollection, 'TableRows');
            Titan.mock.register(TableSettings, 'TableSettings');

            // Predefine table rows
            var tableRows = new TableCollection();
            tableRows.create({
                column1: 'column11',
                column2: 'column12',
                column3: 'column13'
            });
            tableRows.create({
                column1: 'column21',
                column2: 'column22',
                column3: 'column23'
            });
            tableRows.create({
                column1: 'column31',
                column2: 'column32',
                column3: 'column33'
            });
            tableRows.fetch();

            // Predefine table settings
            var tableSettings = new TableSettings({
                id: 'table1',
                columns: [
                    {id: 'column1', title: 'Column 1', width: '250px'},
                    {id: 'column2', title: 'Column 2', width: '250px'},
                    {id: 'column3', title: 'Column 3', width: '250px'}
                ],
                sorting: {column: 'column2', asc: false}
            });
            tableSettings.save();

            container = new Titan.Element('<div></div>');

            app = new Application({
                container: container,
                resourcesUrl:'resources'
            });

            expect(function() {
                app.start();
            }).not.toThrow('');

            container.$el.appendTo("#testContainer");
        });

        afterEach(function() {
            app = null;
            container = null;
        });

        it("1 Check that Collections and Settings populated and shown", function () {
            // Check Settings
            var anotherTable = new TableSettings({
                id: 'table1'
            });
            anotherTable.fetch();
            expect(anotherTable).toBeDefined();
            expect(anotherTable.get('columns')).toBeDefined();

            // Check Collection
            var tableRows = new TableCollection();
            tableRows.fetch();

            expect(tableRows).toBeDefined();
            expect(tableRows.length).toBe(3);
        });

        it("1 Check that form actions work fine", function () {
            waitsFor(function() {
                expect(container.$el.find('[data-action=showAdd]').is(':visible')).toBe(false);
                expect(container.$el.find('[data-action=addNew]').is(':visible')).toBe(false);
                return true;
            }, "The field status need to be changed", 1000);


        });

    });

});