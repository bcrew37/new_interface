"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Lang = function () {
        function Lang() {
            _classCallCheck(this, Lang);

            this.words = {
                "admin": "Адміністратор",
                "gmanager": "Головний менеджер",
                "manager": "Менеджер",
                "secretary": "Секретар",
                "performer": "Виконавець",
                "free": "Безкоштовний",
                "standart": "Стандартний",
                "unlimited": "Необмежений",
                "new": "Нове",
                "inprogress": "В процесі",
                "onhold": "Відкладено",
                "completed": "Завершено",
                "overdue": "Прострочено"
            };
        }

        _createClass(Lang, [{
            key: "get",
            value: function get(word) {
                word = word.toLowerCase();
                if (this.words[word]) {
                    return this.words[word];
                } else return word;
            }
        }]);

        return Lang;
    }();

    Factory.setSingletone("Lang", Lang);
})(window.Factory);