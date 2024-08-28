
define('template',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
define('template!widgets/Button/template.html',[],function () { return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div><input type=\"button\" value=\"Click\"/></div>";});});

define('widgets/Button/ButtonView',[
    'Titan',
    'template!./template.html'
], function (Titan, template) {

    return Titan.View.extend({

        template: function() {
            return template();
        }

    });
});
define('widgets/Button/ButtonModel',[
    'Titan'
], function (Titan) {

    return Titan.Model.extend({

    });

});
define('widgets/Button/Button',[
    'Titan',
    './ButtonView',
    './ButtonModel'
], function (Titan, View, Model) {

    return Titan.Widget.extend({
        options: {
            Model: Model,
            View: View
        }
    });

});
define('template!widgets/TextBox/template.html',[],function () { return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div><input type=\"text\" value=\"123\"></div>";});});

define('widgets/TextBox/TextBoxView',[
    'Titan',
    'template!./template.html'
], function (Titan, template) {

    return Titan.View.extend({

        template: function() {
            return template();
        }

    });
});
define('widgets/TextBox/TextBoxModel',[
    'Titan'
], function (Titan) {

    return Titan.Model.extend({

    });

});
define('widgets/TextBox/TextBox',[
    'Titan',
    './TextBoxView',
    './TextBoxModel'
], function (Titan, View, Model) {

    return Titan.Widget.extend({
        options: {
            Model: Model,
            View: View
        }
    });

});
define('widgets',[
    'widgets/Button/Button',
    'widgets/TextBox/TextBox'
], function (Button, TextBox) {

    return {
        Button: Button,
        TextBox: TextBox
    };

});