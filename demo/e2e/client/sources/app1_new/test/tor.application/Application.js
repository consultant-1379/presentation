define([
    'tor.application/Application',
    'tor.application/common/table/TableCollection',
    'tor.application/common/table/TableSettings',
    'Titan'
], function (Application, TableCollection, TableSettings, Titan) {

    describe("Application", function () {

        it("1 Check that Places is defined", function () {
            expect(Application.prototype.places).toBeDefined();
        });

        /*
        // TODO: This example with real timeouts runs() and waitFor()
        it("2 Check that Application successfully started up and content is populated.", function () {
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

            var container = new Titan.Element('<div></div>');

            var app = new Application({
                container: container,
                resourcesUrl:'resources'
            });

            expect(function() {
                app.start();
            }).not.toThrow('');

            container.$el.appendTo("#testContainer");

            var anotherTable = new TableSettings({
                id: 'table1'
            });
            anotherTable.fetch();

            expect(anotherTable).toBeDefined();
            expect(anotherTable.get('columns')).toBeDefined();

            // TODO: move to separate file, when app.stop() will start work. ADD
            // Open Add new row items
            container.$el.find('.app1New-Form-ShowAdd').click();

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(false);

            var flag;

            // Close Add new row items
            runs(function() {
                container.$el.find('.app1New-Form-HideAdd').click();
                flag = false;

                setTimeout(function() {
                    flag = true;
                }, 1000);
            });

            waitsFor(function() {
                return flag;
            }, "1 Wait while animation ends", 1250);

            runs(function() {
                expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(false);
                expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);
                expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
            });

            // Open Add new row items
            runs(function() {
                container.$el.find('.app1New-Form-ShowAdd').click();
                flag = false;

                setTimeout(function() {
                    flag = true;
                }, 1000);
            });

            waitsFor(function() {
                return flag;
            }, "2 Wait while animation ends", 1250);

            runs(function() {
                expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(true);
                expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);
                expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(false);
            });

            // Populate values and add new line
            runs(function() {
                container.$el.find('#column1').val("testColumn1");
                container.$el.find('#column2').val("testColumn2");
                container.$el.find('#column3').val("testColumn3");

                container.$el.find('.app1New-Form-AddNew').click();

                flag = false;

                setTimeout(function() {
                    flag = true;
                }, 1000);
            });

            waitsFor(function() {
                return flag;
            }, "3 Wait while animation ends", 1250);

            runs(function() {
                expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(false);
                expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
                expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);

                // TODO: that new row was added


            });

            // TODO: move to separate file, when app.stop() will start work. EDIT
            // Open first line for edit
            runs(function() {
                container.$el.find('.app1New-btn-edit')[0].click();
                flag = false;

                setTimeout(function() {
                    flag = true;
                }, 1000);
            });

            waitsFor(function() {
                return flag;
            }, "4 Wait while animation ends", 1250);

            runs(function() {
                expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(true);
                expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
                expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(false);
            });
        });
        */

        it("3 Check that Application successfully started up and content is populated.", function () {
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
            Titan.mock.put(TableSettings, {
                id: 'table1',
                columns: [
                    {id: 'column1', title: 'Column 1', width: '250px'},
                    {id: 'column2', title: 'Column 2', width: '250px'},
                    {id: 'column3', title: 'Column 3', width: '250px'}
                ],
                sorting: {column: 'column2', asc: false}
            });

            var container = new Titan.Element('<div></div>');

            var app = new Application({
                container: container,
                resourcesUrl:'resources'
            });

            expect(function() {
                app.start();
            }).not.toThrow('');

            container.$el.appendTo("#testContainer");

            var anotherTable = new TableSettings({
                id: 'table1'
            });
            anotherTable.fetch();

            expect(anotherTable).toBeDefined();
            expect(anotherTable.get('columns')).toBeDefined();

            var flag;
            // TODO: move to separate file, when app.stop() will start work. ADD
            // Open Add new row items
            container.$el.find('.app1New-Form-ShowAdd').click();

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(false);

            jasmine.Clock.useMock();

            // Close Add new row items
            container.$el.find('.app1New-Form-HideAdd').click();
            jasmine.Clock.tick(1000);

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(false);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);

            // Open Add new row items
            container.$el.find('.app1New-Form-ShowAdd').click();
            jasmine.Clock.tick(1000);

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(false);

            // Populate values and add new line
            container.$el.find('#column1').val("testColumn1");
            container.$el.find('#column2').val("testColumn2");
            container.$el.find('#column3').val("testColumn3");

            container.$el.find('.app1New-Form-AddNew').click();
            jasmine.Clock.tick(1000);

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(false);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);

            // TODO: that new row was added
            tableRows.fetch();
            expect(tableRows.length).toBe(4);

            // TODO: move to separate file, when app.stop() will start work. EDIT
            // Open first line for edit
            container.$el.find('.app1New-btn-edit')[0].click();
            jasmine.Clock.tick(1000);

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(false);

            container.$el.find('#column1').val("updatedColumn1");
            container.$el.find('#column2').val("updatedColumn2");
            container.$el.find('#column3').val("updatedColumn3");

            container.$el.find('.app1New-Form-AddNew').click();
            jasmine.Clock.tick(1000);

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(false);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);

            // TODO: that selected row was updated
            tableRows.fetch();
            var firstModel = tableRows.models[2];
            expect(firstModel.get('column1')).toBe('updatedColumn1');
            expect(firstModel.get('column2')).toBe('updatedColumn2');
            expect(firstModel.get('column3')).toBe('updatedColumn3');

            // Remove second line from table
            container.$el.find('.app1New-btn-delete')[1].click();

            // TODO: that selected row was deleted
            tableRows.fetch();
            expect(tableRows.length).toBe(3);

            // Real Test case. Open add or save and remove any line from table... Some buttons don't disappear
            container.$el.find('.app1New-btn-edit')[0].click();
            jasmine.Clock.tick(1000);

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(false);

            container.$el.find('.app1New-btn-delete')[1].click();

            expect(container.$el.find('[data-action=showAdd]').css('display') == 'none').toBe(false);
            expect(container.$el.find('[data-action=addNew]').css('display') == 'none').toBe(true);
            expect(container.$el.find('[data-action=edit]').css('display') == 'none').toBe(true);

            // TODO: that selected row was deleted
            tableRows.fetch();
            expect(tableRows.length).toBe(2);
        });
    });

});