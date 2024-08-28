({
    baseUrl:'src',
    dir:'temp',
    paths: {
        template: '../../lib/requirejs/template-0.0.1',
        styles: '../../lib/requirejs/styles-0.0.1'
    },
    stubModules:['template', 'styles'],
    optimize:'none',
    modules:[
        {
            name:'widgets',
            exclude:[
                'Titan'
            ]
        }
    ]
})