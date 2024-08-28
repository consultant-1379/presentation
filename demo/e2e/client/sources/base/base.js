define('base',[
    'jquery',
    'underscore',
    'backbone',
    'less'
], function ($, _, Backbone, less) {

    var Base = {};


    // Base.EventBus
    //
    Base.EventBus = function () {
        _.extend(this, Backbone.Events);
    };


    // Base.Place
    //
    Base.Place = function (routes, Presenter, View) {
        this.id = _.uniqueId('Place');
        this.routes = routes;
        this.name = this.id;
        this.Presenter = Presenter;
        this.View = View;
    };

    _.extend(Base.Place.prototype, Backbone.Events);


    // Base.Presenter
    //
    Base.Presenter = function (view, eventBus) {

        view.setPresenter(this);
        view.init();

        this.view = view;
        this.eventBus = eventBus;
        this.init();

    };

    _.extend(Base.Presenter.prototype, {

        router:new Backbone.Router(),

        init:function () {
        },

        start:function () {
        },

        goto:function (url) {
            this.router.navigate(url, true);
        },

        initializeWidgets:function(options) {
            var initializer = new Base.WidgetInitializer({
                selector:this.view.el,
                path: options.path,
                eventBus: this.eventBus,
                context: options.context
            });
            if (options.callback) {
                var fn = _.bind(options.callback, options.context || initializer);
                initializer.parse(fn);
            } else {
                initializer.parse();
            }
        },

        proxy:function (context, bindEventName, triggerEventName) {
            context.bind(bindEventName, function (data) {
                this.eventBus.trigger(triggerEventName, data);
            }, this);
        },

        subscribe:function (eventName, fn) {
            this.eventBus.bind(eventName, fn, this);
        }

    });


    // Base.View
    //
    Base.View = Backbone.View.extend({

        init:function () {
        },

        setPresenter:function (presenter) {
            this.presenter = presenter;
        },

        getElement:function () {
            return this.el;
        },

        template: function() {
            return '<div></div>';
        },

        renderTemplate:function () {
            var element = $('<div></div>').html(this.template(this));
            this.el = $(this.el).replaceWith(element.children());
            this.delegateEvents();
        },

        setParent: function(parent) {
            if (this.parent) {
                this.removeFromParent();
            }
            parent.el.append(this.el);
            this.parent = parent;
            this.trigger(Base.events.attachEvent);
        },

        removeFromParent: function() {
            this.el.detach();
            delete this.parent;
            this.trigger(Base.events.detachEvent);
        }

    });


    // Base.Model
    //
    Base.Model = Backbone.Model;


    Base.Binding = function(model) {
        this.model = model;
    };

    _.extend(Base.Binding.prototype, {

        bindWidget: function(prop, widget) {
            this.model.bind('change:' + prop, function (model, value) {
                widget.setValue(value);
            }, this);

            widget.bind(Base.events.changeEvent, function (value) {
                var m = {};
                m[prop] = value;
                this.model.set(m);
            }, this);

            var v = this.model.get(prop);
            if (v) {
                widget.setValue(v);
            } else {
                var m = {};
                m[prop] = widget.getValue();
                this.model.set(m);
            }
        }

    });


    // Base.Model
    //
    Base.Collection = Backbone.Collection;


    // Base.PlaceHandler
    //
    Base.PlaceHandler = function (options) {
        this.eventBus = options.eventBus;
        this.init(options);
    };

    _.extend(Base.PlaceHandler.prototype, {

        router:new Backbone.Router(),

        init:function (options) {

            _.each(options.places, function(place) {
                _.each(place.routes, function(route) {
                    this.register(place, route)
                }, this);
            }, this);

        },

        register:function (place, route) {
            this.router.route(
                route,
                place.name,
                _.bind(function () {
                    this.eventBus.trigger("Place:change", place, arguments);
                }, this)
            );
        },

        handleCurrentState:function () {
            Backbone.history.start();
        }

    });


    // Base.ApplicationController
    //
    Base.ApplicationController = function (eventBus) {

        this.eventBus = eventBus.bind("Place:change", _.bind(this.onPlaceChange, this));

    };

    _.extend(Base.ApplicationController.prototype, {

        presenters:{},

        onPlaceChange:function (place, args) {
            if (!this.presenters[place.id]) {
                var model = new Base.Model();
                var view = new place.View({
                    model:model
                });
                this.presenters[place.id] = new place.Presenter(view, this.eventBus);
            }
            this.presenters[place.id].start(this.container, args);
        },

        setContainer:function (el) {

            this.container = new Base.ui.SimplePanel({
                element: el || 'body'
            });

        }

    });


    // Shared empty constructor function to aid in prototype-chain creation.
    var ctor = function () {
    };

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var inherits = function (parent, protoProps, staticProps) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call `super()`.
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }

        // Inherit class (static) properties from parent.
        _.extend(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Add static properties to the constructor function, if supplied.
        if (staticProps) _.extend(child, staticProps);

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;

        return child;
    };


    var extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };

    Base.Place.extend = Base.Presenter.extend = extend;


    Base.events = {
        changeEvent: 'changeEvent',
        attachEvent: 'attachEvent',
        detachEvent: 'detachEvent'
    };

    /**
     *
     * Base.ui
     *
     */

    Base.ui = {};

    /**
     *
     * Base.ui.Widget
     *
     */
    Base.ui.Widget = Backbone.View.extend({

        template: function() {
            return '<div></div>';
        },

        subTree: false,

        initialize: function() {
            if (!this.model) {
                this.model = new Base.Model()
            }
            this.eventBus = this.options.eventBus;
            if (this.options.element) {                                     // Widget will use Document sub-tree as view
                this.el = $(this.options.element);
                this.subTree = true;
            } else {                                                        // View will be generated from template
                var element = $('<div></div>').html(this.template(this));   //   based on model data
                this.el = $(this.el).replaceWith(element.children());
            }
            this.delegateEvents();                                          // Delegate events for new DOM tree
            this.initElements();
            this.initNewEvents();
            this.init();
        },

        init: function() {
        },

        initElements: function(elements) {
            if (elements || (elements = this.elements)) {
                var sel = this.subTree ? '#' : '#' + this.cid;
                for (var prop in elements) {
                    var selector = sel + elements[prop];
                    this[prop] = this.$(selector);
                }
            }
        },

        initNewEvents: function(events) {
            if (!(events || (events = this.bindEvents))) return;
            if (_.isFunction(events)) events = events.call(this);
            var eventSplitter = /^(\S+)\s*(.*)$/;
            for (var key in events) {
                var method = this[events[key]];
                if (!method) throw new Error('Event "' + events[key] + '" does not exist');
                var match = key.match(eventSplitter);
                var eventName = match[1], prop = match[2];
                method = _.bind(method, this);
                $(this[prop]).bind(eventName, method);
            }
        },

        setParent: function(parent) {
            if (this.parent) {
                this.removeFromParent();
            }
            parent.el.append(this.el);
            this.parent = parent;
            this.trigger(Base.events.attachEvent);
        },

        removeFromParent: function() {
            this.el.detach();
            delete this.parent;
            this.trigger(Base.events.detachEvent);
        }

    });


    /**
     *
     * Base.ui.Panel
     *
     */
    Base.ui.Panel = Base.ui.Widget.extend({

        addWidget: function(widget) {
            this.el.append(widget.el);
        },

        removeWidget: function(widget) {
            widget.el.detach();
        }

    });

    /**
     *
     * Base.ui.SimplePanel
     *
     */
    Base.ui.SimplePanel = Base.ui.Widget.extend({

        setWidget: function(widget) {
            if (this.widget) {
                if (this.widget == widget) return;
                this.widget.removeFromParent();
            }
            widget.setParent(this);
            this.widget = widget;
        },

        removeWidget: function(widget) {
            if (this.widget && this.widget == widget) {
                this.widget.removeFromParent();
                delete this.widget;
            }
        }

    });

    /**
     *
     * Base.ui.TextBox
     *
     */
    Base.ui.TextBox = Base.ui.ListBox = Base.ui.Widget.extend({

        events: {
            'change': 'onChange'
        },

        onChange: function() {
            this.trigger(Base.events.changeEvent, this.getValue());
        },

        getValue: function() {
            this.value = $(this.el).val();
            return this.value;
        },

        setValue: function(value) {
            if (!_.isEqual(this.value, value)) {
                this.value = value;
                $(this.el).val(value);
            }
        }

    });

    Base.startApplication = function(places, container) {
        var eventBus = Base.eventBus || new Base.EventBus();

        var applicationController = new Base.ApplicationController(eventBus);
        applicationController.setContainer(container);

        var placeHandler = new Base.PlaceHandler({
            eventBus:eventBus,
            places:places
        });

        placeHandler.handleCurrentState();
    };

    Base.compileTemplate = function(template) {
        return _.template(template)
    };

    Base.WidgetInitializer = function(options) {
        this.options = _.extend({}, options);
        this.dom = $(this.options.selector || '<div></div>');
        this.path = this.options.path || '';
        this.eventBus = options.eventBus || new Base.EventBus();
        this.context = options.context || this;
    };

    _.extend(Base.WidgetInitializer.prototype, {

        parse: function(callback) {
            var eventBus = this.eventBus;
            var path = this.path;
            var context = this.context;
            var count = 0;
            $('[data-widget]', this.dom).each(function() {
                var el = $(this);
                var location = el.attr('data-widget');
                if (/^\./.test(location)) {
                    location = path.substring(0, path.length - 2) + location.substring(1);
                }
                count++;
                require([location], function(Widget) {
                    var name = el.attr('data-name');
                    var config = el.attr('data-settings');
                    if (el.children().length > 0) {
                        context[name] = new Widget({
                            element: el,
                            eventBus: eventBus
                        });
                    } else if (el.attr('data-json')){
                        var url = el.attr('data-json');
                        $.getJSON(url, function(data) {
                            context[name] = new Widget({
                                model: new Base.Model(data),
                                eventBus: eventBus
                            });
                            el.append(context[name].render().el);
                        });
                    } else if (el.attr('data-collection')){
                        var Collection = Base.Collection.extend({
                            url: el.attr('data-collection')
                        });
                        var WidgetProto = {
                            collection: new Collection(),
                            eventBus: eventBus
                        };
                        if (config) {
                            var Model = Base.Model.extend({
                                url: config
                            });
                            _.extend(WidgetProto, {
                                model: new Model()
                            });
                        }
                        context[name] = new Widget(WidgetProto);
                        el.append(context[name].render().el);
                    } else {
                        context[name] = new Widget({
                            eventBus: eventBus
                        });
                        el.append(context[name].render().el);
                    }
                    count--;
                    if (count == 0 && callback) {
                        callback();
                    }
                })

            });
        }

    });

    Base.less = less;
    Base.$ = $;

    Base.ui.injectStyles = function (baseUrl, target, styles) {
        var url = '@base-url: "";';
        if (Base.ui.baseUrl) {
            url = '@base-url: "' + Base.ui.baseUrl + '/' + baseUrl + '/";';
        }
        var parser = new (Base.less.Parser);
        parser.parse(url + styles, function (err, tree) {
            Base.$('<style></style>', {
                'data-target': target
            }).html(tree.toCSS()).appendTo('head');
        });
    };

    return Base;

});

window.BaseUtils = {
    initWidgets: function() {
        $(function init() {
            require(['base'], function(Base) {
                var tmp = new Base.WidgetInitializer({
                    selector:'body'
                });
                tmp.parse();
            })
        })
    }
};
