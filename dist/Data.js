"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Data = function () {
        function Data() {
            _classCallCheck(this, Data);

            this.Http = Factory.getClass("Http");
            this.Alert = Factory.getClass("Alert");
            this.Cookie = Factory.getClass("Cookie");

            this.keys = new Map([]);

            this.init({
                "/archive/doc/list/1": "Files",
                "/notifications/list/1": "Notifications",
                "/task/list/1": "Todos",
                "/performers/list": "Performers",
                "/departments/list": "Departments",
                "/tenants/com/my/list": "Enterprises",
                "/myinfo": "User",
                "/statistics/ALL_TIME": "Stats"
            });
        }

        _createClass(Data, [{
            key: "init",
            value: function init(obj) {
                var _this = this;

                var _loop = function _loop(path) {
                    var key = obj[path],
                        cookie = _this.Cookie.get(key);

                    _this.keys.set(key, new Promise(function (resolve, reject) {
                        var data = sessionStorage.getItem(key);
                        if (data && cookie) {
                            resolve(JSON.parse(data));
                        } else {
                            _this.Http.get(path, function (data) {
                                _this.Cookie.set(key, path, { "max-age": 600 });
                                sessionStorage.setItem(key, JSON.stringify(data));
                                resolve(data);
                            });
                        }
                    }));
                };

                for (var path in obj) {
                    _loop(path);
                }
            }
        }, {
            key: "get",
            value: function get(key) {
                return this.keys.get(key);
            }
        }, {
            key: "update",
            value: function update(key) {
                var _this2 = this;

                var path = this.Cookie.get(key);
                return new Promise(function (resolve, reject) {
                    _this2.Http.get(path, function (data) {
                        _this2.Cookie.set(key, path, { "max-age": 900 });
                        sessionStorage.setItem(key, JSON.stringify(data));
                        resolve(data);
                    });
                });
            }
        }]);

        return Data;
    }();

    Factory.setSingletone("Data", Data);
})(window.Factory);