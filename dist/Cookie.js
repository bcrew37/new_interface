"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Cookie = function () {
        function Cookie() {
            _classCallCheck(this, Cookie);
        }

        _createClass(Cookie, [{
            key: "get",
            value: function get(name) {
                var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }
        }, {
            key: "set",
            value: function set(name, value) {
                var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                options = {
                    path: '/'
                };

                Object.assign(options, _options);

                if (options.expires instanceof Date) {
                    options.expires = options.expires.toUTCString();
                }

                var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

                for (var optionKey in options) {
                    updatedCookie += "; " + optionKey;
                    var optionValue = options[optionKey];
                    if (optionValue !== true) {
                        updatedCookie += "=" + optionValue;
                    }
                }

                document.cookie = updatedCookie;
            }
        }]);

        return Cookie;
    }();

    Factory.setSingletone("Cookie", Cookie);
})(window.Factory);