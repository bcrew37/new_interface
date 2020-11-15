"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Http = function () {
        function Http() {
            _classCallCheck(this, Http);

            this.Alert = Factory.getClass("Alert");
        }

        _createClass(Http, [{
            key: "get",
            value: function get(url, callback) {
                (async function () {
                    try {
                        var response = await fetch(url, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            }
                        });

                        if (response.ok) {
                            var result = await response.json();
                            console.log(result);
                            callback(result);
                        } else console.error("Not al ok...");
                    } catch (error) {
                        console.error(error);
                    }
                })();
            }
        }, {
            key: "post",
            value: function post(url, body, callback) {
                var _options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

                (async function () {
                    console.log(body);
                    try {
                        var options = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            body: JSON.stringify(body)
                        };

                        Object.assign(options, _options);
                        var response = await fetch(url, options);

                        if (response.ok) {
                            var result = await response.json();
                            if (callback) callback(result);
                        } else console.error("Not al ok...");
                    } catch (error) {
                        throw console.error("Oops! " + error);
                    }
                })();
            }
        }]);

        return Http;
    }();

    Factory.setSingletone("Http", Http);
})(window.Factory);