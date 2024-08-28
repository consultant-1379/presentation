require(['Titan'], function (Titan) {

    Titan.extension(function (env) {
        var Backbone = env.Backbone;
        var _ = env._;

        // Generate four random hex digits.
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }

        // Generate a pseudo-GUID by concatenating random hexadecimal.
        function guid() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }

        var Store = function(name) {
            this.name = name;
            var store = this.localStorage().getItem(this.name);
            this.records = (store && store.split(",")) || [];
        };

        _.extend(Store.prototype, {
            // Save the current state of the **Store** to *localStorage*.
            save: function() {
                this.localStorage().setItem(this.name, this.records.join(","));
            },

            // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
            // have an id of it's own.
            create: function(model) {
                if (!model.id) {
                    model.id = guid();
                    model.set(model.idAttribute, model.id);
                }
                this.localStorage().setItem(this.getItemId(model.id), JSON.stringify(model));
                this.records.push(model.id.toString());
                this.save();
                return model.toJSON();
            },

            // Update a model by replacing its copy in `this.data`.
            update: function(model) {
                this.localStorage().setItem(this.getItemId(model.id), JSON.stringify(model));
                if (!_.include(this.records, model.id.toString())) this.records.push(model.id.toString()); this.save();
                return model.toJSON();
            },

            // Retrieve a model from `this.data` by id.
            find: function(id) {
                return JSON.parse(this.localStorage().getItem(this.getItemId(id)));
            },

            // Return the array of all models currently in storage.
            findAll: function() {
                return _(this.records).chain()
                    .map(function(id){return JSON.parse(this.localStorage().getItem(this.getItemId(id)));}, this)
                    .compact()
                    .value();
            },

            // Delete a model from `this.data`, returning it.
            destroy: function(model) {
                this.localStorage().removeItem(this.getItemId(model.id));
                this.records = _.reject(this.records, function(record_id){return record_id == model.id.toString();});
                this.save();
                return model;
            },

            clear: function() {
                var data = this.localStorage().getItem(this.name);
                if (data != undefined && data != '') {
                    var ids = data.split(",");
                    var self = this;
                    _.each(ids, function(id) {
                        self.localStorage().removeItem(self.getItemId(id));
                    });
                    this.localStorage().removeItem(this.name);
                    this.records = [];
                }
            },

            getItemId: function(id) {
                return this.name + "-" + id;
            },

            localStorage: function() {
                return localStorage;
            }
        });

        // localSync delegate to the model or collection's
        // *localStorage* property, which should be an instance of `Store`.
        // window.Store.sync and Backbone.localSync is deprectated, use Backbone.LocalStorage.sync instead
        Store.sync = Backbone.localSync = function(method, model, options, error) {
            var store = model.localStorage || model.collection.localStorage;

            // Backwards compatibility with Backbone <= 0.3.3
            if (typeof options == 'function') {
                options = {
                    success: options,
                    error: error
                };
            }

            var resp;

            switch (method) {
                case "read":    resp = model.id != undefined ? store.find(model.id) : store.findAll(); break;
                case "create":  resp = store.create(model);                            break;
                case "update":  resp = store.update(model);                            break;
                case "delete":  resp = store.destroy(model);                           break;
            }

            if (resp) {
                options.success(resp);
            } else {
                options.error("Record not found");
            }
        };

        Backbone.ajaxSync = Backbone.sync;

        Backbone.getSyncMethod = function(model) {
            if(model.localStorage || (model.collection && model.collection.localStorage)) {
                return Backbone.localSync;
            }
            return Backbone.ajaxSync;
        };

        // Override 'Backbone.sync' to default to localSync,
        // the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
        Backbone.sync = function(method, model, options, error) {
            return Backbone.getSyncMethod(model).apply(this, [method, model, options, error]);
        };


        /**
         * Titan extension for testing models
         *
         * @module Mock
         * @class Titan.mock
         */
        var Mock = Titan.mock = {
            get: function(Model, id) {
                return Model.prototype.localStorage.find(id);
            },

            put: function(Model, jsonData) {
                var model = new Model(jsonData);
                return model.localStorage.create(model);
            },

            clear: function(Model) {
                Model.prototype.localStorage.clear();
            },

            register: function(Model, mockUrl) {
                Model.prototype.localStorage = new Store(mockUrl);
                Mock.clear(Model);
            }
        };

    });

});