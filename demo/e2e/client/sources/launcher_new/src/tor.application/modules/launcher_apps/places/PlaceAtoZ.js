define([
    'Titan',
    './../LauncherApps'
], function (Titan, LauncherApps) {

    return Titan.Place.extend({
        name:'A-Z',
        pattern:'AtoZ',
        presenter:LauncherApps,
        fn:'showAtoZ'
    });

});