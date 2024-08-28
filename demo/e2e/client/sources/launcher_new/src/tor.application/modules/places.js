define([
    'Titan',
    './launcher_apps/places/PlaceDefault',
    './launcher_apps/places/PlaceCategories',
    './launcher_apps/places/PlaceAtoZ',
    './launcher_apps/places/PlaceFavorites'
], function (Titan, Default) {

    return Titan.utils.getListFromArguments(arguments, 1);

});