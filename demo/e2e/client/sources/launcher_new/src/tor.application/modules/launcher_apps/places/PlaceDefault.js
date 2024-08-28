define([
    'Titan',
    './../LauncherApps'
], function (Titan, LauncherApps) {

    return Titan.Place.extend({
        name:'Categories',
        pattern:'',
        presenter:LauncherApps,
        fn:'showCategories'
    });

});