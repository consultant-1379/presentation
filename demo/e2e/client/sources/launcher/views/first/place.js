define([
    'base',
    './presenter',
    './view'
], function (Base, Presenter, View) {

    return new Base.Place(['launcher'], Presenter, View);

});