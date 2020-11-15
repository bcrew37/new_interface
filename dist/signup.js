"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Signup = function () {
        function Signup() {
            var _this = this;

            _classCallCheck(this, Signup);

            this.Alert = Factory.getClass("Alert");
            this.Regexp = Factory.getClass("Regexp");
            this.Loader = Factory.getClass("Loader");
            this.Http = Factory.getClass("Http");

            this.SNPField = $("#SNPField");
            this.pass1Field = $("#pass1Field");
            this.pass2Field = $("#pass2Field");
            this.rmme = document.querySelector("#rmme");

            $("#signup").on("click", function (e) {
                return _this.signup(e);
            });
        }

        _createClass(Signup, [{
            key: "signup",
            value: function signup(e) {
                var _this2 = this;

                e.preventDefault();

                if (this.SNPField.val().length == 0) return this.Alert.render("warning", "Введіть повне ім`я");
                if (this.pass1Field.val().length == 0) return this.Alert.render("warning", "Введіть пароль");
                if (this.pass1Field.val().length < 8) return this.Alert.render("warning", "Пароль має бути не менше ніж 8 символів");
                if (this.pass1Field.val() !== this.pass2Field.val()) return this.Alert.render("warning", "Паролі не співпадають");
                this.Loader.show("infinity");
                var nms = this.SNPField.val().split(" ");
                var firstName = void 0,
                    middleName = void 0,
                    lastName = void 0;
                if (nms.length > 2) {
                    firstName = nms[0];
                    middleName = nms[1];
                    lastName = nms[2];
                } else {
                    return this.Alert.render("warning", "Введіть повне ім`я");
                }
                this.Http.post("/auth/reg/user", {
                    password: this.pass1Field.val(),
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    rememberMe: this.rmme.checked
                }, function (res) {
                    _this2.Loader.hide(function () {
                        if (res.success) {
                            window.location.href = "/";
                        } else _this2.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430 " + res.msg.substr(0, 32));
                    });
                });
            }
        }]);

        return Signup;
    }();

    Factory.setSingletone("Signup", Signup);
})(window.Factory);