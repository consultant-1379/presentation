define([
    'base',
    './presenter',
    './view'
], function (Base, Presenter, View) {

    return new Base.Place(['app2'], Presenter, View);

});