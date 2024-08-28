
define('template',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
define('template!application/pages/main/Main.html',[],function () { return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div class=\"app-Main\">\r\n    <div>Hello, World!</div>\r\n</div>";});});

define('styles',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
define('styles!application/pages/main/Main.less',[],function () { return '.app-Main {\n  border: 2px solid #eeeeee;\n  padding: 30px 10px;\n  background: url(\'./application/pages/main/elogo.png\') 99% 50% no-repeat;\n}\n';});

define('application/pages/main/MainView',[
    'Titan',
    'template!./Main.html',
    'styles!./Main.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});
define('application/pages/main/Main',[
    'Titan',
    './MainView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View: View,

        hello: function () {
            console.log('Application.Main.hello()');
        }

    });

});
define('application/pages/main/MainPlace',[
    'Titan',
    './Main'
], function (Titan, Main) {

    return Titan.Place.extend({
        name: 'main',
        pattern: 'application',
        presenter: Main,
        fn: 'hello',
        default: true
    });

});
define('application/pages/places',[
    'Titan',
    './main/MainPlace'
], function (Titan) {

    return Titan.utils.getListFromArguments(arguments, 1);

});
define('application/Application',[
    'Titan',
    './pages/places'
], function (Titan, places) {

    return Titan.Application.extend({

        places:places

    });

});