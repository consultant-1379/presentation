define([
    'underscore',
    'base',
    'text!./launcher.html',
    'text!./launcher.less'
], function (_, Base, template, styles) {

    var launcherTemplate = Base.compileTemplate(template);

    function initWidget() {
        this.loadData();
    }

    /*function drawSettings() {

    }*/

    function render() {
        return this;
    }

    return Base.ui.Widget.extend({

        template:launcherTemplate,
        init:initWidget,
        render:render,
        currentGroups: [],
        favorites: [],
        appsLoaded: false,

        initialize:function () {
            Base.ui.injectStyles('launcher', this.cid, styles);
            $(document).keydown(_.bind(this.onKeyDown, this));
            this.init();
        },

        events:{
            'click .launcher-groupSelector-list-item-link': 'onGroupSelected',
            'click .launcher-appSelector-item-link': 'onAppSelected',
            'click .launcher-appDetails-close': 'onAppDetailsClosed',
            'click .launcher-appSelector-toolbar-searchIcon': 'onSearchIconClicked',
            'focus .launcher-appSelector-toolbar-searchIcon': 'onSearchFieldFocus',
            'focus .launcher-appSelector-toolbar-searchInput': 'onSearchFieldFocus',
            'blur .launcher-appSelector-toolbar-searchInput': 'onSearchFieldBlur',
            'click .launcher-appSelector-list-item-faveIcon': 'onFaveIconClicked'
            // 'click .app1-Settings-add':'onAdd'
        },

        loadData: function () {
            var self = this;
            this.collection.fetch({
                success: function() {
                    self.currentGroups = self.collection.toJSON();
                    self.renderView();
                }
            });
        },

        renderView: function(target) {
            var element = $(this.template(this));
            this.$(".launcher-groupSelector-list-item-link").removeClass("launcher-groupSelector-list-item-link-selected");
            if (target == null) {
                $(this.el).html(element.children());
                target = this.$(".launcher-groupSelector-list-item-link").first();
                target.click();
            }
            else
            {
                $(this.el).find(".launcher-appSelector-container").html(element.find(".launcher-appSelector-container").children());
            }
            target.addClass("launcher-groupSelector-list-item-link-selected");
        },

        onGroupSelected: function(e) {
            var self = this;
            var selectedGroup = $(e.currentTarget);
            var selectedGroupID = selectedGroup.attr("data-id");
            //this.collection.url = "rest/groups/" + selectedGroupID + "/apps";
            this.collection.url = "rest/" + selectedGroupID;
            this.collection.fetch({
                success: function(collection, response) {
                    self.appsLoaded = true;
                    self.renderView(selectedGroup);
                }
            });
            e.preventDefault();
        },

        onAppSelected: function(e) {
            var selectedApp = $(e.currentTarget);
            var selectedAppIndex = parseInt(selectedApp.attr("data-index"));
            //$(".launcher-appDetails-title").html(this.currentGroups[selectedAppIndex].title);
            $(".launcher-appDetails").show();
            e.preventDefault();
        },

        onAppDetailsClosed: function(e) {
            $(".launcher-appDetails").hide();
            e.preventDefault();
        },

        onSearchIconClicked: function(e) {
            var input = $(e.target).parent().find(".launcher-appSelector-toolbar-searchInput");
            var sendRequest = false;
            if (input.width() <= 160) {
                input.focus();
            } else {
                input.blur();
                sendRequest = true;
            }

            if (sendRequest && input.val() != '') {
                $.ajax("rest/search", {
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        searchValue: input.val()
                    }),
                    success: function() {
                        // response

                    }
                });
            }

            e.preventDefault();
        },

        onSearchFieldFocus: function(e) {
            $(e.target).parent().find(".launcher-appSelector-toolbar-searchInput").animate({
                "width": "300px"
            });
        },

        onSearchFieldBlur: function(e) {
            $(e.target).parent().find(".launcher-appSelector-toolbar-searchInput").animate({
                "width": "160px"
            });
        },

        onFaveIconClicked: function(e) {
            var selectedApp = $(e.currentTarget);
            var appid = selectedApp.parent().attr("data-app-id");

            var favorite = true;
            if (selectedApp.hasClass("launcher-appSelector-list-item-faveIcon-favorited")) {
                favorite = false;
            }

            $.ajax("rest/ui/settings/favorites", {
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    id: appid,
                    favorite: favorite
                }),
                success: function() {
                    if (favorite) {
                        selectedApp.addClass("launcher-appSelector-list-item-faveIcon-favorited");
                    } else {
                        selectedApp.removeClass("launcher-appSelector-list-item-faveIcon-favorited");
                    }
                }
            });
            e.preventDefault();
        },

        onKeyDown: function(e) {
            if (!(e.srcElement instanceof HTMLInputElement)) {
                $(".launcher-appSelector-toolbar-searchInput").focus();
            }
        }
    });
});