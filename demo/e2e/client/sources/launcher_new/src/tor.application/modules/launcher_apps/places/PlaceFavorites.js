define([
    'Titan',
    './../LauncherApps'
], function (Titan, LauncherApps) {

    return Titan.Place.extend({
        name:'Favorites',
        pattern:'favorites',
        presenter:LauncherApps,
        fn:'showFavorites'
    });

});