"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Signin = function () {
        function Signin() {
            var _this = this;

            _classCallCheck(this, Signin);

            this.Alert = Factory.getClass("Alert");
            this.Regexp = Factory.getClass("Regexp");
            this.Loader = Factory.getClass("Loader");
            this.Http = Factory.getClass("Http");

            this.email = $("#email");
            this.passwd = $("#passwd");
            this.rmme = document.querySelector("#rmme");

            $("#signup").on("click", function (e) {
                return _this.signin(e);
            });
        }

        _createClass(Signin, [{
            key: "signin",
            value: function signin(e) {
                var _this2 = this;

                e.preventDefault();

                if (this.email.val().length == 0) return this.Alert.render("warning", "Введіть електронну пошту");
                if (this.passwd.val().length == 0) return this.Alert.render("warning", "Введіть пароль");
                this.Loader.show("infinity");

                this.Http.post("/try", {
                    email: this.email.val(),
                    passwd: this.passwd.val(),
                    rememberMe: this.rmme.checked
                }, function (res) {
                    _this2.Loader.hide(function () {
                        if (res.success) {
                            sessionStorage.setItem("email", _this2.email.val());
                            window.location.href = "/confirm";
                        } else _this2.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430 " + res.msg.substr(0, 32) + "...");
                    });
                });
            }
        }]);

        return Signin;
    }();

    Factory.setSingletone("Signin", Signin);
})(window.Factory);