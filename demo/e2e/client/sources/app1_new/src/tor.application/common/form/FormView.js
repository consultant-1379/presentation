define([
    'Titan',
    'template!./FormTemplate.html',
    'styles!./FormStyles.less'
], function(Titan, template, styles) {

    function onAddAction(e) {
        var value = this.getValue();

        if (!value.isEmpty()) {
            if (this.messageModel) {
                this.messageModel.save({
                    'column1':value.column1,
                    'column2':value.column2,
                    'column3':value.column3
                });
                this.onHideSave();
            } else {
                this.options.eventBus.trigger('addRow', value);
                this.setValue({});
                this.onHideAdd();
            }
        }

        e.preventDefault();
    }

    function onShowAddAction() {
        this.$el.find('[data-action=showAdd]').hide();
        this.$el.find('[data-action=addNew]').show();

        var self = this;
        this.$el.find('.app1New-Form-Inputs').animate({'width': 'show'}, 300).queue(function() {
            self.$el.find(this).addClass('app1New-Form-InputsVisible').dequeue();
        });
    }

    function onShowSaveAction() {
        this.$el.find('[data-action=showAdd]').hide();
        this.$el.find('[data-action=addNew]').hide();
        this.$el.find('[data-action=edit]').show();

        var self = this;
        this.$el.find('.app1New-Form-Inputs').animate({'width': 'show'}, 300).queue(function() {
            self.$el.find(this).addClass('app1New-Form-InputsVisible').dequeue();
        });
    }

    function onEditRowAction(model) {
        this.onShowSave();
        this.messageModel = model;
        this.$el.find('[data-action=new]').hide();
        this.$el.find('[data-action=edit]').show();
        this.setValue({
            column1:model.get('column1'),
            column2:model.get('column2'),
            column3:model.get('column3')
        });
        this.$el.find('#column1').focus();
    }

    function onHideAddAction() {
        this.$el.find('[data-action=showAdd]').show();
        this.$el.find('[data-action=addNew]').hide();
        this.$el.find('.app1New-Form-Inputs').removeClass('app1New-Form-InputsVisible').animate({'width': 'hide'}, 300);
        this.setValue({});
        delete this.messageModel;
    }

    function onHideSaveAction() {
        this.$el.find('[data-action=showAdd]').show();
        this.$el.find('[data-action=edit]').hide();
        this.$el.find('.app1New-Form-Inputs').removeClass('app1New-Form-InputsVisible').animate({'width': 'hide'}, 300);
        this.setValue({});
        delete this.messageModel;
    }

    return Titan.View.extend({

        template: template,

        styles: styles,

        events: {
            "submit":"onAddRow",
            "click .app1New-Form-ShowAdd":"onShowAdd",
            "click .app1New-Form-HideAdd":"onHideAdd",
            "click .app1New-Form-HideSave":"onHideSave"
        },
        onShowAdd:onShowAddAction,
        onShowSave:onShowSaveAction,
        onAddRow:onAddAction,
        onEditRow:onEditRowAction,
        onHideAdd:onHideAddAction,
        onHideSave:onHideSaveAction,

        getValue:function () {
            var value = Object.create({
                isEmpty:function () {
                    return this.column1.length == 0 &&
                        this.column2.length == 0 &&
                        this.column3.length == 0;
                }
            });
            value.column1 = this.$el.find('#column1').val();
            value.column2 = this.$el.find('#column2').val();
            value.column3 = this.$el.find('#column3').val();
            return value;
        },

        setValue:function (value) {
            this.$el.find('#column1').val(value.column1);
            this.$el.find('#column2').val(value.column2);
            this.$el.find('#column3').val(value.column3);
        },

        init:function () {
            this.options.eventBus.bind('editRow', this.onEditRow, this);
            this.options.eventBus.bind('hideSaveAction', this.onHideSave, this);
        }

    });

});