define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template:template,

        styles:styles,

        events: {
            'submit .tor-LoginBox-form': 'onSubmit'
        },

        redirectUrl: '../launcher_new/',

        onSubmit: function(e) {
            var self = this;
            var $loginForm = this.$(".tor-LoginBox-form");
            var $errorBox = this.$(".tor-LoginBox-errorBox");

            Titan.utils.ajax({
                url: 'rest/login',
                type: 'post',
                dataType: 'json',
                data: {
                    torUsername: $loginForm.find('.tor-LoginBox-loginUsername').val(),
                    torPassword: $loginForm.find('.tor-LoginBox-loginPassword').val()
                },
                success:function(data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        localStorage.setItem('userId', data.id);
                        localStorage.setItem('userName', data.name);
                    }
                    location.href = self.redirectUrl;
                },
                error:function (xhr, ajaxOptions, thrownError){
                    if (xhr.status != 403) {
                        $errorBox.html(thrownError);

                        console.log(xhr);
                        console.log(ajaxOptions);
                        console.log(thrownError);
                    }
                    else {
                        var parsedResponse = JSON.parse(xhr.responseText);
                        $errorBox.html(parsedResponse['message']);
                    }
                    $errorBox.show();
                }
            });

            e.preventDefault();
        }
    });

});