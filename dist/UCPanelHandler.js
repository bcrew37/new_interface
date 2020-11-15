"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var UCPanelHandler = function () {
        function UCPanelHandler() {
            var _this = this;

            _classCallCheck(this, UCPanelHandler);

            this.Data = Factory.getClass("Data");
            this.Loader = Factory.getClass("Loader");
            this.Lang = Factory.getClass("Lang");
            this.Http = Factory.getClass("Http");
            this.Alert = Factory.getClass("Alert");

            var file = void 0;
            this.Data.get("User").then(function (user) {
                return _this.render(user);
            });
            document.querySelector("#uploadFilesForm").onchange = function () {
                var name = document.querySelector('#uploadFilesFormName');
                name.innerText = this.files[0].name.substr(0, 32) + "...";
                file = this.files[0];
            };
            document.querySelector("#uploadFilesFormSubmit").onclick = function () {
                if (file) {
                    var formdata = new FormData();
                    formdata.append("file", file);
                    _this.Loader.show("infinity");
                    _this.Http.post("/try", formdata, function (res) {
                        if (res.success) {
                            _this.Data.update("User");
                            window.location = window.location;
                        } else {
                            _this.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: " + res.msg.substr(0, 32));
                        }
                    });
                }
            };

            document.querySelector("#changePass").onclick = function () {
                var pass1 = document.querySelector("#pass1"),
                    pass2 = document.querySelector("#pass2");

                if (pass1.value.trim() == "") return _this.Alert.render("warning", "Напишіть старий пароль");
                if (pass2.value.trim() == "") return _this.Alert.render("warning", "Напишіть новий пароль");
                _this.Loader.show("infinity");

                _this.Http.post("/settings/chagne/password", { oldPasswd: pass1.value, newPasswd: pass2.value }, function (res) {
                    _this.Loader.hide(function () {
                        if (res.success) {
                            _this.Alert.render("success", "Пароль змінено");
                            pass1.value = "";
                            pass2.value = "";
                        } else {
                            _this.Alert.render("danger", "Сталася помилка: " + res.msg.substr(0, 32) + "...");
                        }
                    });
                });
            };
        }

        _createClass(UCPanelHandler, [{
            key: "render",
            value: function render(user) {
                document.querySelector("#userName").innerHTML = user.name;
                document.querySelector("#userEmail").innerHTML = user.email;
                document.querySelector("#userDepartment").innerHTML = user.department;
                document.querySelector("#userRole").innerHTML = this.Lang.get(user.role);
                document.querySelector("#userRegdate").innerHTML = user.regdate;
                document.querySelector("#userImg").setAttribute("data-src", user.imgPath);
                $(document).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    effectTime: 200,
                    threshold: document.body.clientHeight,
                    visibleOnly: false,
                    onError: function onError(element) {
                        console.log('error loading ' + element.data('src'));
                    },
                    autoDestroy: true
                });
                this.Loader.hide();
            }
        }]);

        return UCPanelHandler;
    }();

    Factory.setSingletone("UCPanelHandler", UCPanelHandler);
})(window.Factory);