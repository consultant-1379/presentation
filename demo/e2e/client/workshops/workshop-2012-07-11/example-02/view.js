

define('text!template.html',[],function () { return '<div>Hello, World!</div>';});

define('view',[
    'text!./template.html'
], function (template) {

    $('body').append(template)

    return {};

});