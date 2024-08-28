require([
    'Titan'
], function (Titan) {

    Titan.extension(function (env) {

        env['Handlebars'].registerHelper('forEach', function (list, context, options) {
            var ret = [];
            var column = list.get(options.hash['get']);

            for (var i = 0, j = column.length; i < j; i++) {
                ret.push(options.fn(context.get(column[i][options.hash['prop']])));
            }

            return ret.join('');
        });

        env['Handlebars'].registerHelper('eachObj', function (context, options) {
            var columns = context.get(options.hash['get']);

            if (columns === undefined) {
                return '';
            }

            var ret = [];
            for (var i = 0, j = columns.length; i < j; i++) {
                ret.push(options.fn(columns[i]));
            }

            return ret.join('');
        });

        Titan.utils.bind = env['_'].bind;
        Titan.utils.jQuery = env['$'];

    })

});