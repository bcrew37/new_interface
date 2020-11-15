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

            this.emailToConfirm = $("#emailToConfirm");
            this.confirmcode = $("#confirmcode");

            var ssEfield = sessionStorage.getItem("email");
            if (ssEfield) this.emailToConfirm.html(ssEfield);

            $("#confirm").on("click", function (e) {
                return _this.confirm(e);
            });
        }

        _createClass(Signup, [{
            key: "confirm",
            value: function confirm(e) {
                var _this2 = this;

                e.preventDefault();

                if (this.confirmcode.val().length == 0) return this.Alert.render("warning", "Введіть код");
                this.Loader.show("infinity");

                this.Http.get("/auth/verify?verificationCode=" + this.confirmcode.val(), function (res) {
                    _this2.Loader.hide(function () {
                        if (res.success) {
                            sessionStorage.setItem("confirm", true);
                            window.location.href = "/signup";
                        } else _this2.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430 " + res.msg.substr(0, 32) + "...");
                    });
                });
            }
        }]);

        return Signup;
    }();

    Factory.setSingletone("Signup", Signup);
})(window.Factory);