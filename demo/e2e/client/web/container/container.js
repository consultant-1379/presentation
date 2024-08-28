define([
    'require',
    'jquery',
    'underscore',
    'base',
    'text!./container.html'
], function (require, $, _, Base, template) {

    var content = $('#Content');
    content.on('click', '.tor-NavigationBar-pill', function(event) {
        content.find('.tor-NavigationBar-pill').removeClass('tor-NavigationBar-pillSelected');
        $(event.target).parent('.tor-NavigationBar-pill').addClass('tor-NavigationBar-pillSelected');
    });

    content.on('click', '.tor-NavigationBar-userName', function(event) {
        $(event.target).parent().toggleClass("tor-NavigationBar-userData-menu-open");
    });

    Base.ui.baseUrl = 'apps';

    window.eventBus = Base.eventBus = new Base.EventBus();

    var AppsCollection = Base.Collection.extend({
        url:require.toUrl("apps/apps.json")
    });

    var appsCollection = new AppsCollection();

    appsCollection.bind('reset', function (applications) {
        var username = localStorage.getItem('userName');
        if (username == undefined || username == '') {
            username = 'Name Surname';
        }

        var html = Base.compileTemplate(template);
        content.html(html({
            collection: applications,
            username: username
        }));

        var places = [];

        applications.each(function (app) {
            places.push('apps/' + app.get('name') + '/views/places');
        });

        require(places, function () {

            Base.startApplication(_.flatten(arguments), '#ApplicationContainer');

        });

        content.find(".tor-NavigationBar-pill a[href='" + window.location.hash + "']").parent('.tor-NavigationBar-pill').addClass('tor-NavigationBar-pillSelected');
        
        content.find('.tor-NavigationBar-logout').click(function() {
            $.post(
                'rest/logout',
                function() {
                    location.href = 'index.html';
                }
            );
        });
    });

    appsCollection.fetch();
});