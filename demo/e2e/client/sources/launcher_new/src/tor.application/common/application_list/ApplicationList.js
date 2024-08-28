define([
    'Titan',
    './ApplicationListView',
    './item/Item',
    './header/Header'
], function (Titan, View, Item, Header) {

    return Titan.Presenter.extend({

        init:function () {
            this.view = new View();

            this.collection.on('reset',  this.onLoad, this);
        },

        onLoad:function () {
            this.view['applicationList'].$el.empty();
            this.collection.each(this.renderGroups, this);
        },

        renderGroups:function (model) {
            if (model.has('apps')) {
                var header = new Header({
                    model: model,
                    eventBus: this.eventBus
                });
                this.view['applicationList'].addWidget(header);
                var apps = model.get('apps');
                var appCollection = new Titan.Collection(apps);
                appCollection.each(this.renderGroups, this);
            } else {
                this.renderApps(model);
            }
        },

        renderApps:function (model) {
            var item = new Item({
                model:model,
                eventBus:this.eventBus,
                favoritesModel: this.model
            });
            this.view['applicationList'].addWidget(item);
        }

    });

});