define([
    'Titan',
    'template!./ItemTemplate.html'
], function (Titan, template) {

    return Titan.View.extend({

        template:template,

        events:{
            "click .launcher-appSelector-list-item-faveIcon": "onFavoriteClicked",
            "click .launcher-appSelector-list-item-infoIcon": "onInfoClicked"
        },

        init:function () {
            this.model.view = this;
            this.model.bind('change', function() {
                this.render();
            }, this);
        },

        onFavoriteClicked:function (e) {
            var $selectedApp = this.$(".launcher-appSelector-list-item-faveIcon");

            var favorite = true;
            if ($selectedApp.hasClass("launcher-appSelector-list-item-faveIcon-favorited")) {
                favorite = false;
            }
            this.options.favoritesModel.save({
                id: this.model.get('id'),
                favorite: favorite
            }, {
                success: function(model, response) {
                    if (favorite) {
                        $selectedApp.addClass("launcher-appSelector-list-item-faveIcon-favorited");
                    } else {
                        $selectedApp.removeClass("launcher-appSelector-list-item-faveIcon-favorited");
                    }
                }
            });
            e.preventDefault();
        },

        onInfoClicked:function (e) {
            console.log("Info clicked");
            e.preventDefault();
        }

    });

});