"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var History = function () {
        function History() {
            var _this = this;

            _classCallCheck(this, History);

            this.Navbar = Factory.getClass("Navbar");
            this.Content = Factory.getClass("Content");

            this.Content.init(_defineProperty({
                "/charts": document.querySelector('templates [data-content="charts"]'),
                "/files": document.querySelector('templates [data-content="files"]'),
                "/boards": document.querySelector('templates [data-content="boards"]'),
                "/clPanel": document.querySelector('templates [data-content="clPanel"]'),
                "/econfig": document.querySelector('templates [data-content="econfig"]'),
                "/uconfig": document.querySelector('templates [data-content="uconfig"]')
            }, "/charts", document.querySelector('templates [data-content="charts"]')));

            this.Navbar.elements["files"].sub(function () {
                return _this.push({ title: "Файли", url: "/files" });
            });

            this.Navbar.elements["boards"].sub(function () {
                return _this.push({ title: "Дошки", url: "/boards" });
            });

            this.Navbar.elements["clPanel"].sub(function () {
                return _this.push({ title: "Панель управління", url: "/clPanel" });
            });

            this.Navbar.elements["econfig"].sub(function () {
                return _this.push({ title: "Кабінет підприємства", url: "/econfig" });
            });

            this.Navbar.elements["uconfig"].sub(function () {
                return _this.push({ title: "Кабінет користувача", url: "/uconfig" });
            });

            this.Navbar.elements["charts"].sub(function () {
                return _this.push({ title: "Статистика", url: "/charts" });
            });

            if (history.state == null) {
                this.set({ title: "Дошки", url: "/boards" });
            } else this.set(history.state);

            window.onpopstate = function (e) {
                if (e.state) {
                    _this.set(e.state);
                } else return;
            };
        }

        _createClass(History, [{
            key: "render",
            value: function render(data) {
                this.Content.render(data.url);
                this.Navbar.elements[data.url.substring(1)].active();
                document.title = data.title;
            }
        }, {
            key: "push",
            value: function push(data) {
                history.pushState(data, data.title, data.url);
                this.render(data);
            }
        }, {
            key: "set",
            value: function set(data) {
                history.replaceState(data, data.title, data.url);
                this.render(data);
            }
        }]);

        return History;
    }();

    Factory.setSingletone("History", History);
})(window.Factory);