"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var ECPanel = function () {
        function ECPanel() {
            var _this = this;

            _classCallCheck(this, ECPanel);

            this.Dropdown = Factory.getClass("Dropdown");
            this.Data = Factory.getClass("Data");
            this.Loader = Factory.getClass("Loader");
            this.Lang = Factory.getClass("Lang");
            this.Alert = Factory.getClass("Alert");
            this.Http = Factory.getClass("Http");
            this.Modal = Factory.getClass("Modal");

            this._table = document.querySelector(".enterprises");
            this.Data.get("Enterprises").then(function (list) {
                return _this.render(list);
            });

            var input = document.querySelector(".create-department__input"),
                btn = document.querySelector(".create-department__button");

            btn.onclick = function () {
                if (input.value.trim().length == 0) return;
                if (input.value.trim().length > 64) return _this.Alert.render("warning", "Назва не більше 64 символів");
                _this.Loader.show("infinity");
                _this.Http.post("/tenants/create", { companyName: input.value.trim(), tariff: "Free" }, function (res) {
                    input.value = "";
                    _this.Loader.hide(function () {
                        if (res.success) {
                            _this.Alert.render("success", " створено.");
                            _this.Data.update("Enterprises").then(function (data) {
                                return _this.render(data);
                            });
                            _this.Modal.render("tariffs", res.msg);
                        } else _this.Alert.render("danger", "Сталася помилка." + res.msg.substr(0, 32) + "...");
                    });
                });
            };
        }

        _createClass(ECPanel, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                this._table.innerHTML = "";
                list.forEach(function (e) {
                    $(_this2._table).append("\n                <tr class=\"table-row\" data-enterprise-id=\"" + e.id + "\">\n                    <td>\n                        <div class=\"td-wrapper\">\n                            <span class=\"name\" " + (e.active ? 'style="border-left: 3px solid #2196f3; padding: 0 20px"' : "") + ">\n                            " + e.name + "\n                            </span>\n                        </div>\n                    </td>\n                    <td data-name=\"date\">" + e.number + "</td>\n                    <td data-name=\"space\">" + e.creationDate + "</td>\n                    <td data-name=\"space\">" + e.space + " / " + e.maxSpace + "Gb</td>\n                    <td data-name=\"space\">" + _this2.Lang.get(e.tariff) + "</td>\n                    <td data-name=\"tools\">\n                       <div class=\"drop-down\">\n                       <button data-event=\"toggle\">\n                            <i style=\"font-size:16px\" class=\"far fa-ellipsis-h\"></i>\n                       </button>\n                       <div style=\"width:250px; right:25px;\" class=\"drop-down_menu\">\n                           <div class=\"drop-down__list\">\n                                " + (!e.active ? '<button data-event="toActive" class="item">Обрати як активне <i class="fal fa-toggle-on"></i></button>' : "") + "\n                                <button data-event=\"addNewEmployes\" class=\"item\">\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u043F\u0456\u0432\u0440\u043E\u0431\u0456\u0442\u043D\u0438\u043A\u0456\u0432<i class=\"far fa-users\"></i></button>\n                                <button data-event=\"changeTariff\" class=\"item\">\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u0442\u0430\u0440\u0438\u0444 <i class=\"far fa-shopping-cart\"></i></button>\n                                <button data-event=\"delete\" class=\"item\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 <i class=\"far fa-trash\"></i></button>\n                           </div>\n                       </div>\n                   </div>\n                    </td>\n                </tr> ");

                    var row = _this2._table.querySelector(".table-row:last-child");
                    var toActive = row.querySelector('[data-event="toActive"]');if (toActive) toActive.onclick = function (e) {
                        var btn = e.target.closest("button");
                        btn.setAttribute("disabled", "true");
                        _this2.Loader.show("infinity");
                        _this2.Http.get("/tenants/connect?tenantId=" + e.id, function (res) {
                            btn.removeAttribute("disabled");
                            if (res.success) {
                                _this2.Data.update("Enterprises").then(function (data) {
                                    return _this2.render(data);
                                });
                            } else _this2.Loader.hide(function () {
                                _this2.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: " + res.msg.substr(0, 32) + "...");
                            });
                        });
                    };

                    row.querySelector('[data-event="delete"]').onclick = function (e) {
                        var btn = e.target.closest("button");
                        btn.setAttribute("disabled", "true");
                        _this2.Loader.show("infinity");
                        _this2.Http.post("/try", { id: e.id }, function (res) {
                            btn.removeAttribute("disabled");
                            if (res.success) {
                                _this2.Data.update("Enterprises").then(function (data) {
                                    return _this2.render(data);
                                });
                            } else _this2.Loader.hide(function () {
                                _this2.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: " + res.msg.substr(0, 32) + "...");
                            });
                        });
                    };
                    row.querySelector('[data-event="changeTariff"]').onclick = function () {
                        _this2.Modal.render("tariffs", e.id);
                    };
                    row.querySelector('[data-event="addNewEmployes"]').onclick = function () {
                        _this2.Modal.render("addNewEmployes", e.id);
                    };
                });

                this.Dropdown.init(document.querySelector(".enterprises"), { single: true });
                this.Loader.hide();
            }
        }]);

        return ECPanel;
    }();

    Factory.setSingletone("ECPanel", ECPanel);
})(window.Factory);