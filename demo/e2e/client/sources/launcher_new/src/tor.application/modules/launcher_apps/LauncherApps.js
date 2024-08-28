define([
    'Titan',
    './LauncherAppsView',
    'tor.application/common/sidebar/Sidebar',
    'tor.application/common/search/Search',
    'tor.application/common/application_list/ApplicationList'
], function (Titan, View, SidebarWidget, SearchWidget, ApplicationListWidget) {

    var ApplicationListCollection = Titan.Collection.extend({
        parse: function(res) {
            if (res.constructor != Array) {
                return res.items;
            } else {
                return res;
            }
        }
    });

    var applicationListCollection = new ApplicationListCollection();

    var FavoritesSettings = Titan.Model.extend({
        url:'rest/ui/settings/favorites'
    });

    var favoritesSettings = new FavoritesSettings();

    return Titan.Presenter.extend({

        View:View,

        init: function() {
            //favoritesSettings.fetch();
            this.sidebarWidget = new SidebarWidget();
            this.searchWidget = new SearchWidget();
            this.applicationListWidget = new ApplicationListWidget({
                collection: applicationListCollection,
                model: favoritesSettings
            });
            this.view['searchbar'].setWidget(this.searchWidget);
            this.view['sidebar'].setWidget(this.sidebarWidget);
            this.applicationListWidget.start(this.view['app_selector']);
        },

        showCategories:function () {
            this.sidebarWidget.setSelectedFolder("categories");
            applicationListCollection.url = "rest/groups";
            this.reloadApplicationList();
        },

        showAtoZ:function () {
            this.sidebarWidget.setSelectedFolder("AtoZ");
            applicationListCollection.url = "rest/apps";
            this.reloadApplicationList();
        },

        showFavorites:function () {
            this.sidebarWidget.setSelectedFolder("favorites");
            applicationListCollection.url = "rest/favorites";
            this.reloadApplicationList();
        },

        reloadApplicationList: function() {
            applicationListCollection.fetch({
                success: function(collection, response) {

                }
            })
        }

    });

});