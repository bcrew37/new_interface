"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Navigation scrolling //

(function (Factory) {
    var Nav = function () {
        function Nav() {
            var _this = this;

            _classCallCheck(this, Nav);

            $("#scrollTTM").on("click", function () {
                return _this.scrollTo("#TM");
            });
            $("#scrollTFM").on("click", function () {
                return _this.scrollTo("#FM");
            });
            $("#scrollTCB").on("click", function () {
                return _this.scrollTo("#CB");
            });
            $("#scrollTCP").on("click", function () {
                return _this.scrollTo("#CP");
            });
            $("#scrollTPL").on("click", function () {
                return _this.scrollTo("#PL");
            });
        }

        _createClass(Nav, [{
            key: "scrollTo",
            value: function scrollTo(element) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(element).offset().top - 122
                }, 400);
            }
        }]);

        return Nav;
    }();

    Factory.setSingletone("Nav", Nav);
})(window.Factory);

// Authentication //

(function (Factory) {
    var Auth = function () {
        function Auth() {
            var _this2 = this;

            _classCallCheck(this, Auth);

            this.Regexp = Factory.getClass("Regexp");
            this.Http = Factory.getClass("Http");
            this.Loader = Factory.getClass("Loader");
            this.Alert = Factory.getClass("Alert");

            $("#suwf").on("click", function (e) {
                return _this2.signupWF(e);
            });
            $("#suwg").on("click", function (e) {
                return _this2.signupWG(e);
            });
            $("#su").on("click", function (e) {
                return _this2.signup(e);
            });
        }

        _createClass(Auth, [{
            key: "signup",
            value: function signup(e) {
                var _this3 = this;

                var efield = $(".signup-form__input").val();

                if (!this.Regexp.email.test(efield)) return;
                sessionStorage.setItem("email", efield);
                e.preventDefault();

                this.Loader.show("infinity");
                this.Http.get("/auth/reg/send?email=" + efield, function (res) {
                    _this3.Loader.hide(function () {
                        if (res.success) {
                            window.location.href = "/confirm";
                        } else _this3.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: " + res.msg.substr(0, 32) + "...");
                    });
                });
            }
        }, {
            key: "signupWF",
            value: function signupWF(e) {}
        }, {
            key: "signupWG",
            value: function signupWG(e) {}
        }]);

        return Auth;
    }();

    Factory.setSingletone("Auth", Auth);
})(window.Factory);