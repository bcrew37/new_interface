"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var ChartsHandler = function () {
        function ChartsHandler() {
            var _this = this;

            _classCallCheck(this, ChartsHandler);

            Factory.getClass("Notifications").render(document.querySelector(".tool-bar .notifications"));
            this.Data = Factory.getClass("Data");
            this._table = document.querySelector(".body");
            this.Loader = Factory.getClass("Loader");

            google.charts.load('current', { packages: ['corechart', 'bar'] });

            this.Data.get("Stats").then(function (list) {
                google.charts.setOnLoadCallback(function () {
                    return _this.render(list);
                });
            });
        }

        _createClass(ChartsHandler, [{
            key: "render",
            value: function render(list) {
                var _this2 = this;

                this._table.innerHTML = "";
                list.sort(function (a, b) {
                    var nameA = a.department ? a.department.name : a.department,
                        nameB = b.department ? b.department.name : b.department;
                    if (nameA || nameB) {
                        if (nameA > nameB) return 1;
                        if (nameB > nameA) return -1;
                    };return 0;
                });

                var lastDep = void 0,
                    lastData = [];

                list.forEach(function (p, i) {
                    if (p.department && lastDep !== p.department.name) {
                        lastDep = p.department.name;
                        lastData = [['Виконавець', 'Нові', 'В прогреці', 'Просрочені', 'Завершені', 'Відкладені']];

                        lastData.push([p.name, p.newStatus, inprogress, overdue, completed, onhold]);
                        $(_this2._table).append("<div class=\"chart\"></div>");
                    } else if (p.department && lastDep == p.department.name) {
                        lastData.push([p.name, p.newStatus, inprogress, overdue, completed, onhold]);
                    } else if (!p.department) {
                        if (lastDep !== "Не розподілені") {
                            lastData = [['Виконавець', 'Нові', 'В прогреці', 'Просрочені', 'Завершені', 'Відкладені']];
                            lastDep = "Не розподілені";
                            $(_this2._table).append("<div class=\"chart\"></div>");
                        }

                        lastData.push([p.name, p.newStatus, inprogress, overdue, completed, onhold]);
                    }

                    if (!list[i + 1] || list[i + 1].department && list[i + 1].department.name !== lastDep) {
                        var container = _this2._table.querySelector(".chart:last-child"),
                            options = {
                            title: lastDep,
                            chartArea: { width: '50%' },
                            isStacked: true,
                            colors: ['#2196f3', '#ff9800', '#f44336', '#1bc943', '#b7bbca']
                        },
                            chart = new google.visualization.BarChart(container);

                        chart.draw(google.visualization.arrayToDataTable(lastData), options);
                    } else if (!list[i + 1].department) {
                        var _container = _this2._table.querySelector(".chart:last-child"),
                            _options = {
                            title: lastDep,
                            chartArea: { width: '50%' },
                            isStacked: true,
                            colors: ['#2196f3', '#ff9800', '#f44336', '#1bc943', '#b7bbca']
                        },
                            _chart = new google.visualization.BarChart(_container);

                        _chart.draw(google.visualization.arrayToDataTable(lastData), _options);
                    }
                });

                this.Loader.hide();
            }
        }]);

        return ChartsHandler;
    }();

    Factory.setSingletone("ChartsHandler", ChartsHandler);
})(window.Factory);