define([
    'Titan',
    './MainView',
    'tor.application/common/table/Table',
    'tor.application/common/table/TableCollection',
    'tor.application/common/table/TableSettings',
    'tor.application/common/form/FormView',
    'tor.application/common/settings/Settings'
], function (Titan, View, Table, TableCollection, TableSettings, FormView, Settings) {

    var tableCollection = new TableCollection();

    var tableSettings = new TableSettings({
        id: 'table1'
    });

    return Titan.Presenter.extend({

        View:View,

        init:function () {
            this.table = new Table({
                model:tableSettings,
                collection:tableCollection,
                eventBus:this.eventBus
            });
            this.table.start(this.view['tablePlaceHolder']);

            this.settings = new Settings({
                model:tableSettings,
                collection:tableCollection,
                eventBus:this.eventBus
            });
            this.settings.start(this.view['settingsPlaceHolder']);

            this.form = new FormView({
                eventBus:this.eventBus
            });
            this.view['formPlaceHolder'].setWidget(this.form);

            this.eventBus.bind('addRow', this.onAddRow, this);
        },

        home:function () {
            tableSettings.fetch({
                success:function () {
                    tableCollection.fetch();
                }
            });
        },

        onAddRow:function (value) {
            tableCollection.create({
                column1:value.column1,
                column2:value.column2,
                column3:value.column3
            });
        },

        toggleSettings:function () {
            this.settings.view.toggle();
        }

    });

});