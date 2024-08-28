
define('text!template.html',[],function () { return '<div>Hello</div>';});

define('main',[
    'text!./template.html'
], function (template) {

    return {
        message:'hello',
        template:template
    };

});