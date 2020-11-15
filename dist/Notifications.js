"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Notifications = function () {
        function Notifications() {
            _classCallCheck(this, Notifications);
        }

        _createClass(Notifications, [{
            key: "render",
            value: function render(selector) {
                var _this = this;

                this.selector = selector;
                this.Http = Factory.getClass("Http");
                this.Data = Factory.getClass("Data");

                var wrapper = this.selector.querySelector(".notifications-wrapper"),
                    list = this.selector.querySelector(".notifications-list"),
                    btn = this.selector.querySelector('[data-event="toggle"]');

                this.Data.get("Notifications").then(function (data) {
                    var renderNotifications = function renderNotifications(data) {
                        data.forEach(function (n) {
                            var author = Factory.getClass("User").get(n.authorId);
                            $(list).append("\n                        <div class=\"notification\"}>\n                            <img data-src=\"" + author.imgPath + "\" alt=\"\" />\n                            <div class=\"body\">\n                                <div class=\"name\">\n                                " + author.name + "\n                                </div>\n                                <div class=\"msg\">\n                                    " + (n.task ? "<a data-todo-id=\"" + n.task.id + "\" role=\"button\" class=\"link\">" + n.task.name.substr(0, 32) + "... -</a>" : "") + "\n                                    \"" + n.message.substr(0, 256) + "...\"\n                                </div>\n                                <div class=\"meta\">" + n.date + "</div>\n                            </div>\n                        </div>");

                            if (n.todo) {
                                list.querySelector(".notification:last-child .link").onclick = function (e) {
                                    Factory.getClass("Modal").render("todoInfo", e.target);
                                };
                            }
                        });

                        $(list).find('[data-src]').Lazy({
                            effect: 'fadeIn',
                            effectTime: 200,
                            threshold: list.scrollHeight,
                            visibleOnly: false,
                            onError: function onError(element) {
                                console.log('error loading ' + element.data('src'));
                            },
                            autoDestroy: true,
                            onFinishedAll: function onFinishedAll() {
                                Loader.hide();
                            }
                        });
                    }; renderNotifications(data);

                    var counter = 1;
                    wrapper.querySelector('[data-event="more"]').onclick = function () {
                        _this.Http.get("/notifications/list/" + counter, function (data) {
                            renderNotifications(data);
                            counter++;
                        });
                    };

                    if (data.numOfNew) _this.selector.dataset.amount = data.numOfNew;
                });

                btn.addEventListener("click", function () {
                    return wrapper.classList.contains("active") ? _this._close(wrapper) : _this._open(wrapper);
                });
                window.addEventListener("click", function (e) {
                    if (e.target.closest(".notifications")) {
                        return;
                    } else _this._close(wrapper);
                });
            }
        }, {
            key: "_open",
            value: function _open(target) {
                $(target).fadeIn(100);
                target.classList.add("active");
                if (this.selector.dataset.amount) {
                    this.selector.removeAttribute("data-amount");
                    this.Http.post("/test", { read: true });
                    this.Data.get("Notifications").then(function (data) {
                        data.numOfNew = 0;
                        sessionStorage.setItem("Notifications", JSON.stringify(data));
                    });
                }
            }
        }, {
            key: "_close",
            value: function _close(target) {
                $(target).fadeOut(100);
                target.classList.remove("active");
            }
        }]);

        return Notifications;
    }();

    Factory.setPrototype("Notifications", Notifications);
})(window.Factory);