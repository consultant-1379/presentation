define([
    'Titan',
    './../LauncherApps'
], function (Titan, LauncherApps) {

    return Titan.Place.extend({
        name:'Categories',
        pattern:'categories',
        presenter:LauncherApps,
        fn:'showCategories'
    });

});