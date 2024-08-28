({
    baseUrl:'../src',
    dir:'../temp',
    optimize:'none',
    paths:{
        'Titan':'empty:',
        'template':'../node_modules/titan/lib/requirejs/template',
        'styles':'../node_modules/titan/lib/requirejs/styles'
    },
    stubModules:['template', 'styles'],
    modules:[
        {
            name:'tor.application/Application'
        }
    ]
})