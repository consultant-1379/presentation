define([
    'base',
    'text!./styles.less'
], function (Base, styles) {

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
                this.eventBus.trigger('addRow', value);
                this.setValue({});
                this.onHideAdd();
            }
        }

        e.preventDefault();
    }

    function onShowAddAction() {
        this.$('[data-action=showAdd]').hide();
        this.$('[data-action=addNew]').show();
        this.$('.app1-Form-Inputs').animate({'width': 'show'}, 300).queue(function() {
            $(this).addClass('app1-Form-InputsVisible').dequeue();
        });
    }

    function onShowSaveAction() {
        this.$('[data-action=showAdd]').hide();
        this.$('[data-action=addNew]').hide();
        this.$('[data-action=edit]').show();
        this.$('.app1-Form-Inputs').animate({'width': 'show'}, 300).queue(function() {
            $(this).addClass('app1-Form-InputsVisible').dequeue();
        });
    }

    function onEditRowAction(model) {
        this.onShowSave();
        this.messageModel = model;
        this.$('[data-action=new]').hide();
        this.$('[data-action=edit]').show();
        this.setValue({
            column1:model.get('column1'),
            column2:model.get('column2'),
            column3:model.get('column3')
        });
        this.$('#column1').focus();
    }

    function onHideAddAction() {
        this.$('[data-action=showAdd]').show();
        this.$('[data-action=addNew]').hide();
        this.$('.app1-Form-Inputs').removeClass('app1-Form-InputsVisible').animate({'width': 'hide'}, 300);
        this.setValue({});
        delete this.messageModel;
    }

    function onHideSaveAction() {
        this.$('[data-action=showAdd]').show();
        this.$('[data-action=edit]').hide();
        this.$('.app1-Form-Inputs').removeClass('app1-Form-InputsVisible').animate({'width': 'hide'}, 300);
        this.setValue({});
        delete this.messageModel;
    }

    return Base.ui.Widget.extend({

        events:{
            "submit":"onAddRow",
            "click .app1-Form-ShowAdd":"onShowAdd",
            "click .app1-Form-HideAdd":"onHideAdd",
            "click .app1-Form-HideSave":"onHideSave"
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
            value.column1 = this.$('#column1').val();
            value.column2 = this.$('#column2').val();
            value.column3 = this.$('#column3').val();
            return value;
        },
        setValue:function (value) {
            this.$('#column1').val(value.column1);
            this.$('#column2').val(value.column2);
            this.$('#column3').val(value.column3);
        },

        init:function () {
            Base.ui.injectStyles('app1', this.cid, styles);
            this.eventBus.bind('editRow', this.onEditRow, this);
        }
    });
});


