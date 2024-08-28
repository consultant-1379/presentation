define(['base'], function (Base) {

    function onAddAction(e) {

        var value = this.getValue();

        if (!value.isEmpty()) {
            if (this.messageModel) {
                this.messageModel.save({
                    'column1':value.column1,
                    'column2':value.column2,
                    'column3':value.column3
                });
                this.onCancel();
            } else {
                this.eventBus.trigger('addRow', value);
                this.setValue({});
            }
        }

        e.preventDefault();
    }

    function onEditRowAction(model) {
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

    function onCancelAction() {
        this.$('[data-action=new]').show();
        this.$('[data-action=edit]').hide();
        this.setValue({});
        delete this.messageModel;
    }

    return Base.ui.Widget.extend({

        events:{
            "submit":"onAddRow",
            "click [type=button]":"onCancel"
        },
        onAddRow:onAddAction,
        onEditRow:onEditRowAction,
        onCancel:onCancelAction,

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
            this.eventBus.bind('editRow', this.onEditRow, this);
        }
    });
});


