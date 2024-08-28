define([
    'Titan',
    './SettingsView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View({
                model: this.model,
                collection: this.collection
            });
            this.view.setPresenter(this);
        },

        triggerReloadTable: function () {
            this.eventBus.trigger('reloadTable');
        }

    });

});