"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (Factory) {
    var Modal = function () {
        function Modal() {
            var _this = this;

            _classCallCheck(this, Modal);

            this.modals = {};
            this.Http = Factory.getClass("Http");
            this.Alert = Factory.getClass("Alert");
            this.Data = Factory.getClass("Data");
            this.Split = Factory.getClass("Split");
            this.Loader = Factory.getClass("Loader");
            this.Regexp = Factory.getClass("Regexp");
            this.Dropdown = Factory.getClass("Dropdown");
            this.FilesManager = Factory.getClass("FilesManager");

            this.init("newTodo", document.querySelector('[data-modal="newTodo"]'), function (d) {
                if (d.length == 0) return _this.Alert.render("warning", "Оберіть файли...");
                return "done";
            }, function (d) {
                // Variables
                var modal = _this.modals["newTodo"].node,
                    name = modal.querySelector('[data-role="name"]'),
                    description = modal.querySelector('[data-role="description"]'),
                    files = modal.querySelector('[data-role="files"]'),
                    performers = modal.querySelector('[data-role="performers"]'),
                    deadline = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-deadline"]')),
                    control = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-control"]')),
                    submit = modal.querySelector('[data-event="submit"]'),
                    pList = new Map(),
                    pageNum = 0,
                    pagBtn = modal.querySelector('[data-event="pagination"]');

                description.value = "";

                // Performers
                pagBtn.style.display = "flex";
                var renderPerformers = function renderPerformers(data) {
                    var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                    if (clear) performers.innerHTML = "";
                    data.forEach(function (p) {
                        $(performers).append("\n                            <div class=\"performer\" data-performer-id=\"" + p.id + "\">\n                                <div class=\"user-block\">\n                                    <img class=\"img\" data-src=\"" + p.imgPath + "\" alt=\"\" />\n                                    <span class=\"name\">" + p.name + "</span>\n                                </div>\n                                <div class=\"form-check\">\n                                    <input class=\"form-check-input position-static\" type=\"checkbox\" " + (p.checked == true ? "checked" : "") + "/>\n                                </div>\n                            </div>");
                        performers.querySelector("[data-performer-id=\"" + p.id + "\"] .form-check-input").onclick = function (e) {
                            var pId = e.target.closest(".performer").dataset.performerId;
                            if (e.target.checked == true) {
                                pList.set(pId, p);pList.get(pId).checked = true;
                            } else {
                                pList.get(pId).checked = false;pList.delete(pId);
                            }
                        };
                    });$(performers).find('[data-src]').Lazy({
                        effect: 'fadeIn',
                        autoDestroy: true,
                        effectTime: 200,
                        threshold: performers.scrollHeight,
                        visibleOnly: false,
                        onError: function onError(element) {
                            console.log('error loading ' + element.data('src'));
                        }
                    });
                };_this.Data.get("Performers").then(function (result) {
                    var data = _this.Split.split(result, 10);renderPerformers(data[0]);
                    var findForm = Factory.getClass("Finder", modal.querySelector(".findPerformer"), result, data[0]);
                    findForm.subscribe(function (result) {
                        $(performers).animate({
                            scrollTop: 0
                        }, 100, function () {
                            return renderPerformers(result);
                        });
                        pageNum = 0;if (result == data[0]) {
                            pagBtn.style.display = "flex";
                        } else pagBtn.style.display = "none";
                    });
                    pagBtn.onclick = function () {
                        if (data.length - 1 !== pageNum) {
                            pageNum += 1;renderPerformers(data[pageNum], false);
                            if (data.length - 1 == pageNum) pagBtn.style.display = "none";
                        } else return;
                        $(performers).animate({
                            scrollTop: performers.scrollHeight
                        }, 100);
                    };
                });

                // Files    
                files.innerHTML = "";
                if (d) d.forEach(function (f) {
                    var file = f.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim(),
                        fileId = file.dataset.fileId;

                    $(files).append("\n                        <div class=\"file\" data-file-id=\"" + fileId + "\">\n                            <img class=\"img\" data-src=\"./img/docs-img/" + fileExt.substr(1) + ".png\" alt=\"\" />\n                            <span class=\"name\">\n                                " + fileName + "\n                            </span>\n                            <span class=\"extension\"> " + fileExt + " </span>\n                        </div>");
                });$(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    autoDestroy: true,
                    effectTime: 200,
                    threshold: files.scrollHeight,
                    visibleOnly: false,
                    onError: function onError(element) {
                        console.log('error loading ' + element.data('src'));
                    }
                });

                // Confirm
                submit.onclick = function () {
                    if (description.value.length > 2024) return _this.Alert.render("warning", "Опис не більше 2024 символів");
                    if (name.value.length == 0 || name.length > 232) return _this.Alert.render("warning", "Укажіть назву");
                    if (pList.size == 0) return _this.Alert.render("warning", "Оберіть виконвців...");

                    var performers = [];var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = pList.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var key = _step.value;

                            performers.push(key);pList.get(key).checked = false;pList.delete(key);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    _this.Loader.show("infinity");

                    _this.Http.post("/task/create", {
                        name: name.value.trim(),
                        description: description.value.trim(),
                        performerList: performers,
                        docList: Array.from(files.querySelectorAll(".file"), function (f) {
                            return f.dataset.fileId;
                        }),
                        dateControl: control.getDate(), dateDeadline: deadline.getDate()
                    }, function (res) {
                        _this.Loader.hide();setTimeout(function () {
                            if (res.success) {
                                _this.Alert.render("success", "Задачу створено.");
                            } else {
                                _this.Alert.render("danger", "Сталася помилка. " + res.msg.substr(0, 32) + "...");
                            }
                        }, 400);
                        console.log({
                            name: name.value.trim(),
                            description: description.value.trim(),
                            performerList: performers,
                            docList: Array.from(files.querySelectorAll(".file"), function (f) {
                                return f.dataset.fileId;
                            }),
                            dateControl: control.getDate(), deadline: dateDeadline.getDate()
                        });
                        $(modal).modal("hide");name.value = "";description.innerHTML = "";
                    });
                };
            });

            this.init("existTodo", document.querySelector('[data-modal="existTodo"]'), function (d) {
                if (d.length == 0) return _this.Alert.render("warning", "Оберіть файли...");
                return "done";
            }, function (d) {
                var modal = _this.modals["existTodo"].node,
                    files = modal.querySelector('[data-role="files"]'),
                    submit = modal.querySelector('[data-event="submit"]'),
                    todos = modal.querySelector('[data-role="todos"]'),
                    tList = new Map(),
                    pageNum = 0,
                    pagBtn = modal.querySelector('[data-event="pagination"]');

                // Todos
                pagBtn.style.display = "flex";
                var renderTodos = function renderTodos(data) {
                    var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                    if (clear) todos.innerHTML = "";

                    data.forEach(function (t) {
                        var status = Factory.getClass("Lang").get(status);

                        $(todos).append("\n                        <div class=\"todo\" data-todo-id=\"" + t.id + "\">\n                            <img data-placement=\"top\" data-toggle=\"tooltip\" title=\"" + t.manager.firstName + " " + t.manager.lastName + "\" data-src=\"" + t.manager.imgPath + "\" alt=\"\">\n                            <div class=\"body\">\n                                <div class=\"name\">\n                                   " + t.name + "\n                                </div>\n                                <span data-placement=\"top\" data-toggle=\"tooltip\" title=\"" + status + "\" class=\"status " + t.status + "\"></span>\n                            </div>\n                            <div class=\"form-check\">\n                                <input " + (t.checked ? "checked" : "") + " class=\"form-check-input position-static\" type=\"checkbox\" />\n                            </div>\n                        </div>");
                        todos.querySelector("[data-todo-id=\"" + t.id + "\"] .form-check-input").onclick = function (e) {
                            var tId = e.target.closest(".todo").dataset.todoId;
                            if (e.target.checked == true) {
                                tList.set(tId, t);tList.get(tId).checked = true;
                            } else {
                                tList.get(tId).checked = false;tList.delete(tId);
                            }
                        };
                    });

                    $(todos).find('[data-src]').Lazy({
                        effect: 'fadeIn',
                        autoDestroy: true,
                        effectTime: 200,
                        threshold: todos.scrollHeight,
                        visibleOnly: false,
                        onError: function onError(element) {
                            console.log('error loading ' + element.data('src'));
                        }
                    });

                    $(todos).find('[data-toggle="tooltip"]').tooltip();
                };

                // this.Data.get("Todos").then(result => {
                //     let data = this.Split.split(result, 10); renderTodos(data[0])
                //     let findForm = Factory.getClass("Finder", modal.querySelector(".findTodo"), data, data[0]);
                //     findForm.subscribe((result) => {
                //         $(todos).animate({
                //             scrollTop: 0
                //         }, 100, () => renderTodos(result))
                //         pageNum = 0; if (result == data[0]) {
                //             pagBtn.style.display = "flex"
                //         } else pagBtn.style.display = "none"
                //     });

                //     pagBtn.onclick = () => {
                //         if (data.length - 1 !== pageNum) {
                //             pageNum += 1; renderTodos(data[pageNum], false);
                //             if (data.length - 1 == pageNum) pagBtn.style.display = "none"
                //         } else return
                //         $(todos).animate({
                //             scrollTop: todos.scrollHeight
                //         }, 100)
                //     }
                // })

                _this.Data.get("Todos").then(function (data) {
                    var splitData = _this.Split.split(data, 10);renderTodos(splitData[0]);
                    var findForm = Factory.getClass("Finder", modal.querySelector(".findTodo"), data, splitData[0]);

                    findForm.subscribe(function (result) {
                        $(todos).animate({
                            scrollTop: 0
                        }, 100, function () {
                            return renderTodos(result);
                        });
                        pageNum = 0;if (result == data[0]) {
                            pagBtn.style.display = "flex";
                        } else pagBtn.style.display = "none";
                    });

                    pagBtn.onclick = function () {
                        if (data.length - 1 !== pageNum) {
                            pageNum += 1;renderTodos(data[pageNum], false);
                            if (data.length - 1 == pageNum) pagBtn.style.display = "none";
                        } else return;
                        $(todos).animate({
                            scrollTop: todos.scrollHeight
                        }, 100);
                    };
                });

                // Files    
                files.innerHTML = "";
                d.forEach(function (f) {
                    var file = f.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim(),
                        fileId = file.dataset.fileId;

                    $(files).append("\n                            <div class=\"file\" data-file-id=\"" + fileId + "\">\n                                <img class=\"img\" data-src=\"./img/docs-img/" + fileExt.substr(1) + ".png\" alt=\"\" />\n                                <span class=\"name\">\n                                    " + fileName + "\n                                </span>\n                                <span class=\"extension\"> " + fileExt + " </span>\n                            </div>");
                });$(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    autoDestroy: true,
                    effectTime: 200,
                    threshold: files.scrollHeight,
                    visibleOnly: false,
                    onError: function onError(element) {
                        console.log('error loading ' + element.data('src'));
                    }
                });

                // Confirm
                submit.onclick = function () {
                    if (tList.size == 0) return _this.Alert.render("warning", "Оберіть завдання.");

                    var todos = [];var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = tList.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var key = _step2.value;

                            todos.push(key);tList.get(key).checked = false;tList.delete(key);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    ;$(modal).modal("hide");_this.Loader.show("infinity");

                    _this.Http.post("/task/modify/docs", {
                        todoIds: todos,
                        docIds: Array.from(files.querySelectorAll(".file"), function (f) {
                            return f.dataset.fileId;
                        })
                    }, function (res) {
                        _this.Loader.hide();setTimeout(function () {
                            if (res.success) {
                                _this.Alert.render("success", "Файли додано.");
                            } else {
                                _this.Alert.render("danger", "Сталася помилка." + res.msg.substr(0, 32) + "...");
                            }
                        }, 400);
                        console.log({
                            todos: todos,
                            documents: Array.from(files.querySelectorAll(".file"), function (f) {
                                return f.dataset.fileId;
                            })
                        });
                    });
                };
            });

            this.init("uploadFiles", document.querySelector('[data-modal="uploadFiles"]'), function () {
                return "done";
            }, function () {
                var modal = _this.modals["uploadFiles"].node,
                    files = modal.querySelector('[data-role="files"]'),
                    form = modal.querySelector('[data-event="uploadFiles"]'),
                    submit = modal.querySelector('[data-event="submit"]'),
                    fList = function fList() {
                    return files.querySelectorAll(".file");
                };var data = new Map();form.value = "";

                files.innerHTML = "";
                var Alert = _this.Alert;
                form.onchange = function () {
                    var _this2 = this;

                    if (this.files.length > 6 || this.files.length > 6 - fList().length) return Alert.render("danger", "" + (6 - fList().length ? "\u043D\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 \u043D\u0456\u0436: " + (6 - fList().length) + " \u0444\u0430\u0439\u043B\u0456\u0432" : "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0444\u0430\u0439\u043B\u0456\u0432!"));

                    var _loop = function _loop(i) {
                        var f = _this2.files[i];
                        var name = f.name.substr(0, f.name.lastIndexOf("."));
                        if (data.has(encodeURIComponent(name))) {
                            Alert.render("warning", "\u0444\u0430\u0439\u043B \u0437 \u0442\u0430\u043A\u0438\u043C \u0456\u043C'\u044F\u043C: " + name.substr(0, 32) + "... - \u0432\u0436\u0435 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043E");
                        } else {
                            var ext = f.name.substr(f.name.lastIndexOf("."));

                            $(files).prepend("\n                            <div class=\"file\" data-file-id=\"" + encodeURIComponent(name) + "\">\n                                <img class=\"img\" src=\"./img/docs-img/" + ext.substr(1) + ".png\" alt=\"\" />\n                                <span class=\"name\">\n                                    " + decodeURIComponent(name) + "\n                                </span>\n                                <span class=\"extension\"> " + ext + " </span>\n                                <i data-event=\"dismiss\" class=\"fas fa-trash\"></i>\n                            </div>");

                            files.querySelector('.file [data-event="dismiss"]').onclick = function (e) {
                                var file = $(files).find(e.target.closest(".file"));

                                file.slideUp(100, function () {
                                    return file.remove();
                                });
                                data.delete(encodeURIComponent(name));
                            };

                            data.set(encodeURIComponent(name), f);
                        }
                    };

                    for (var i = 0; i < this.files.length; i++) {
                        _loop(i);
                    }
                    form.value = "";
                };

                // Confirm
                submit.onclick = function () {
                    if (data.size == 0 || data.size > 6) return _this.Alert.render("warning", "Оберіть файли");
                    var formData = new FormData();
                    data.forEach(function (f) {
                        return formData.append("files", f);
                    });
                    $(modal).modal("hide");_this.Loader.show("infinity");

                    _this.Http.post("/archive/doc/upload", formData, function (res) {
                        _this.Loader.hide();setTimeout(function () {
                            if (res.success) {
                                _this.Alert.render("success", "Файли завантажено.");
                            } else {
                                _this.Alert.render("danger", "Сталася помилка." + res.msg.substr(0, 32) + "...");
                            }
                        }, 400);
                    }, {
                        headers: {
                            "Content-Type": false,
                            "cache": false,
                            "processData": false
                        }
                    });
                };
            });

            this.init("tariffs", document.querySelector('[data-modal="tariffs"]'), function () {
                return "done";
            }, function (id) {
                var modal = _this.modals["tariffs"].node,
                    standart = modal.querySelector("#standartTariff"),
                    unlimited = modal.querySelector("#unlimitedTariff");

                function changeTariff(tariff) {
                    console.log("work");
                }

                standart.onclick = function () {
                    return changeTariff("standart");
                };
                unlimited.onclick = function () {
                    return changeTariff("unlimited");
                };
            });

            this.init("shareFiles", document.querySelector('[data-modal="shareFiles"]'), function (d) {
                if (d.length == 0) return _this.Alert.render("warning", "Оберіть файли...");
                if (d.length > 6) return _this.Alert.render("warning", "Не більше 6 файлів");
                return "done";
            }, function (d) {
                var modal = _this.modals["shareFiles"].node,
                    files = modal.querySelector('[data-role="files"]'),
                    submit = modal.querySelector('[data-event="submit"]'),
                    msg = modal.querySelector('[data-name="message"]'),
                    email = modal.querySelector('[data-name="email"]');

                email.value = "";msg.value = "";

                files.innerHTML = "";
                d.forEach(function (f) {
                    var file = f.closest("tr"),
                        fileName = file.querySelector(".name").innerHTML.trim(),
                        fileExt = file.querySelector(".extension").innerHTML.trim(),
                        fileId = file.dataset.fileId;

                    $(files).append("\n                            <div class=\"file\" data-file-id=\"" + fileId + "\">\n                                <img class=\"img\" data-src=\"./img/docs-img/" + fileExt.substr(1) + ".png\" alt=\"\" />\n                                <span class=\"name\">\n                                    " + fileName + "\n                                </span>\n                                <span class=\"extension\"> " + fileExt + " </span>\n                            </div>");
                });$(files).find('[data-src]').Lazy({
                    effect: 'fadeIn',
                    autoDestroy: true,
                    effectTime: 200,
                    threshold: files.scrollHeight,
                    visibleOnly: false,
                    onError: function onError(element) {
                        console.log('error loading ' + element.data('src'));
                    }
                });

                // Confirm
                submit.onclick = function () {
                    if (email.value.trim().length == 0) return _this.Alert.render("warning", "Введіть електронну адресу");
                    if (!_this.Regexp.email.test(email.value.trim())) return _this.Alert.render("warning", "Невірний формат електронної адреси");

                    $(modal).modal("hide");_this.Loader.show("infinity");

                    _this.Http.post("/archive/doc/send", {
                        docList: Array.from(files.querySelectorAll(".file"), function (f) {
                            return f.dataset.fileId;
                        }), message: msg.value.trim(), email: email.value.trim()
                    }, function (res) {
                        _this.Loader.hide();setTimeout(function () {
                            if (res.success) {
                                _this.Alert.render("success", "Файли відправлено.");
                                console.log({ documents: Array.from(files.querySelectorAll(".file"), function (f) {
                                        return f.dataset.fileId;
                                    }), message: msg.value.trim(), email: email.value.trim() });
                            } else {
                                _this.Alert.render("danger", "Сталася помилка." + res.msg.substr(0, 32) + "...");
                            }
                        }, 400);
                    }, {
                        headers: {
                            "Content-Type": false,
                            "cache": false,
                            "processData": false
                        }
                    });
                };
            });

            this.init("todoInfo", document.querySelector('[data-modal="todoInfo"]'), function () {
                return "done";
            }, function (d) {
                _this.Loader.show("infinity");
                var modal = _this.modals["todoInfo"].node,
                    name = modal.querySelector('[data-role="name"]'),
                    description = modal.querySelector('[data-role="description"]'),
                    files = modal.querySelector('[data-role="files"]'),
                    rFiles = modal.querySelector('[data-role="report-files"]'),
                    comments = modal.querySelector('[data-role="comments"]'),
                    toggleBtns = modal.querySelector(".toggle-buttons"),
                    detailsBtn = toggleBtns.querySelector('[ data-slide-to="0"]'),
                    reportBtn = toggleBtns.querySelector('[ data-slide-to="1"]'),
                    controlBtns = modal.querySelector('.control-buttons'),
                    completeBtn = controlBtns.querySelector(".event-complete"),
                    overdueBtn = controlBtns.querySelector(".event-overdue"),
                    onholdBtn = controlBtns.querySelector(".event-onhold"),
                    tonewBtn = controlBtns.querySelector(".event-new"),
                    inProgressBtn = modal.querySelector(".event-inProgress"),
                    changeBtn = modal.querySelector(".apply-changes"),
                    uploadBtn = modal.querySelector(".upload-files"),
                    downloadFiles = modal.querySelector('[data-event="downloadFiles"]'),
                    downloadReportFiles = modal.querySelector('[data-event="downloadReportFiles"]'),
                    uploadFiles = modal.querySelector('[data-role="upload-files"]'),
                    reportForm = modal.querySelector('[data-event="upload-report"]'),
                    pageNum = 0,
                    pagBtn = modal.querySelector('[data-event="pagination"]'),
                    performers = modal.querySelector('[data-role="performers"]'),
                    pList = new Map();

                var User = Factory.getClass("User");

                comments.innerHTML = "";
                description.value = "";
                name.value = "";
                reportForm.value = "";
                uploadFiles.innerHTML = "";
                rFiles.innerHTML = "";
                files.innerHTML = "";
                performers.innerHTML = "";
                pagBtn.style.display = "flex";
                changeBtn.style.display = "none";
                controlBtns.style.display = "none";
                inProgressBtn.style.display = "none";
                description.setAttribute("disabled", "true");
                name.setAttribute("readonly", "true");

                _this.Http.get("/task/details?todoId=" + d.dataset.todoId, function (t) {

                    {
                        // Name + Description
                        name.value = t.name;description.value = t.description;
                    }

                    {
                        // Files - Details
                        if (t.documents) t.documents.forEach(function (f) {
                            var fileName = f.name,
                                fileExt = f.extName,
                                fileId = f.id;

                            $(files).prepend("\n                                <div class=\"file\" data-file-id=\"" + fileId + "\">\n                                    <img class=\"img\" src=\"./img/docs-img/" + fileExt.substr(1) + ".png\" alt=\"\" />\n                                    <span class=\"name\">\n                                        " + fileName + "\n                                    </span>\n                                    <span class=\"extension\"> " + fileExt + " </span>\n                                    <button style=\"display:none\"  data-event=\"dismiss\">\n                                        <i class=\"fas fa-trash\"></i>\n                                    </button>\n                                </div>");

                            files.querySelector('.file [data-event="dismiss"]').onclick = function (e) {
                                var file = $(files).find(e.target.closest(".file")),
                                    fileId = e.target.closest(".file").dataset.dataId,
                                    btn = e.target.closest('[data-event="dismiss"]');

                                btn.setAttribute("disabled", "true");
                                _this.Alert.render("confirm", "Файл буде видално. Ви впевнені?", {
                                    confirm: function confirm() {
                                        _this.Loader.show("infinity");
                                        _this.Http.post("/task/doc/remove", { taskId: d.dataset.todoId, docId: fileId }, function (res) {
                                            _this.Loader.hide(function () {
                                                if (res.success) {
                                                    file.slideUp(100, function () {
                                                        return file.remove();
                                                    });
                                                    _this.Alert.render("success", "Файл прибрано.");
                                                } else {
                                                    _this.Alert.render("danger", "Сталася помилка.");
                                                    btn.removeAttribute("disabled");
                                                }
                                            });
                                        });
                                    },
                                    unConfirm: function unConfirm() {
                                        btn.removeAttribute("disabled");
                                    }
                                });
                            };
                        });$(files).find('[data-src]').Lazy({
                            effect: 'fadeIn',
                            autoDestroy: true,
                            effectTime: 200,
                            threshold: files.scrollHeight,
                            visibleOnly: false,
                            onError: function onError(element) {
                                console.log('error loading ' + element.data('src'));
                            }
                        });
                    }

                    {
                        // Comments
                        if (t.comments) t.comments.forEach(function (c) {
                            var author = Factory.getClass("User").get(c.authorId);
                            $(comments).prepend("\n                                <div class=\"comment\" data-comment-id=\"" + c.id + "\">\n                                    <img data-src=\"" + author.imgPath + "\" alt=\"\" />\n                                    <div class=\"body\">\n                                        <div class=\"name\">\n                                        " + author.name + "\n                                        <button style=\"display:none\"  data-event=\"dismiss\" class=\"dismiss\">\n                                        <i class=\"fa fa-trash\"></i>\n                                        </button>\n                                        </div>\n                                        <div class=\"text\">\n                                            " + c.comment + "\n                                        </div>\n                                        <div class=\"meta\"> \n                                            " + c.date + " \n                                        </div>\n                                    </div>\n                                </div>");

                            comments.querySelector("[data-comment-id=\"" + c.id + "\"] [data-event=\"dismiss\"]").onclick = function (e) {
                                var commentId = e.target.closest(".comment").dataset.commentId,
                                    comment = e.target.closest(".comment"),
                                    btn = e.target.closest('[data-event="dismiss"]');

                                btn.setAttribute("disabled", "true");
                                _this.Alert.render("confirm", "Коментар буде видално. Ви впевнені?", {
                                    confirm: function confirm() {
                                        _this.Loader.show("infinity");
                                        _this.Http.post("/task/comment/remove", { taskId: d.dataset.todoId, commentId: commentId }, function (res) {
                                            _this.Loader.hide();setTimeout(function () {
                                                if (res.success) {
                                                    $(comment).slideUp(100, function () {
                                                        return comment.remove();
                                                    });
                                                    _this.Alert.render("success", "Коментар видалено.");
                                                } else {
                                                    _this.Alert.render("danger", "Сталася помилка.");
                                                    btn.removeAttribute("disabled");
                                                }
                                            }, 400);
                                        });
                                    },
                                    unConfirm: function unConfirm() {
                                        btn.removeAttribute("disabled");
                                    }
                                });
                            };
                        });$(comments).find('[data-src]').Lazy({
                            effect: 'fadeIn',
                            autoDestroy: true,
                            effectTime: 200,
                            threshold: files.scrollHeight,
                            visibleOnly: false,
                            onError: function onError(element) {
                                console.log('error loading ' + element.data('src'));
                            }
                        });

                        var commentsBlock = comments.closest('[data-name="comments"]'),
                            commentInput = commentsBlock.querySelector('.add-comment [data-name="comment"'),
                            commentBtn = commentsBlock.querySelector('.add-comment [data-event="sendComment"]');

                        commentBtn.onclick = function () {
                            if (commentInput.value.trim().length == 0) return _this.Alert.render("warning", "Введіnm коментар");
                            _this.Loader.show("infinity");
                            var comment = commentInput.value;
                            commentInput.value = "";
                            _this.Http.post("/task/comment/add", { taskId: d.dataset.todoId, comment: comment }, function (res) {
                                _this.Loader.hide(function () {
                                    if (res.success) {
                                        _this.Data.get("User").then(function (u) {
                                            $(comments).prepend("\n                                            <div class=\"comment\" data-comment-id=\"" + res.msg + "\">\n                                                <img data-src=\"" + u.imgPath + "\" alt=\"\" />\n                                                <div class=\"body\">\n                                                    <div class=\"name\">\n                                                        " + u.name + "\n                                                    <button style=\"display:none\"  data-event=\"dismiss\" class=\"dismiss\">\n                                                    <i class=\"fa fa-trash\"></i>\n                                                    </button>\n                                                    </div>\n                                                    <div class=\"text\">\n                                                        " + comment + "\n                                                    </div>\n                                                    <div class=\"meta\"> \n                                                        " + Factory.getClass("Dates").DMY() + " \n                                                    </div>\n                                                </div>\n                                            </div>");

                                            $(comments).find('[data-src]').Lazy({
                                                effect: 'fadeIn',
                                                autoDestroy: true,
                                                effectTime: 200,
                                                threshold: files.scrollHeight,
                                                visibleOnly: false,
                                                onError: function onError(element) {
                                                    console.log('error loading ' + element.data('src'));
                                                }
                                            });
                                        });
                                    } else {
                                        _this.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: " + res.msg.substr(0, 32) + "...");
                                    }
                                });
                            });
                        };
                    }

                    {
                        // Files - Report
                        if (t.report.documents) t.report.documents.forEach(function (f) {
                            var fileName = f.name,
                                fileExt = f.extName,
                                fileId = f.id;

                            $(rFiles).prepend("\n                                <div class=\"file\" data-report-id=\"" + t.report.id + "\" data-file-id=\"" + fileId + "\">\n                                    <img class=\"img\" src=\"./img/docs-img/" + fileExt.substr(1) + ".png\" alt=\"\" />\n                                    <span class=\"name\">\n                                        " + fileName + "\n                                    </span>\n                                    <span class=\"extension\"> " + fileExt + " </span>\n                                    <button data-event=\"dismiss\">\n                                        <i style=\"display:none\"  class=\"fas fa-trash\"></i>\n                                    </button>\n                                </div>");

                            rFiles.querySelector('.file [data-event="dismiss"]').onclick = function (e) {
                                var file = $(rFiles).find(e.target.closest(".file")),
                                    fileId = e.target.closest(".file").dataset.fileId,
                                    btn = e.target.closest('[data-event="dismiss"]');

                                btn.setAttribute("disabled", "true");
                                _this.Alert.render("confirm", "Файл буде видално. Ви впевнені?", {
                                    confirm: function confirm() {
                                        _this.Loader.show("infinity");
                                        _this.Http.post("/report/doc/remove", { reportId: e.target.closest(".file").dataset.reportId, docId: fileId }, function (res) {
                                            _this.Loader.hide(function () {
                                                console.log({ reportId: e.target.closest(".file").dataset.reportId, fileId: fileId });
                                                if (res.success) {
                                                    file.slideUp(100, function () {
                                                        return file.remove();
                                                    });
                                                    _this.Alert.render("success", "Файл прибрано.");
                                                } else {
                                                    _this.Alert.render("danger", "Сталася помилка.");
                                                    btn.removeAttribute("disabled");
                                                }
                                            });
                                        });
                                    },
                                    unConfirm: function unConfirm() {
                                        btn.removeAttribute("disabled");
                                    }
                                });
                            };
                        });$(rFiles).find('[data-src]').Lazy({
                            effect: 'fadeIn',
                            autoDestroy: true,
                            effectTime: 200,
                            threshold: rFiles.scrollHeight,
                            visibleOnly: false,
                            onError: function onError(element) {
                                console.log('error loading ' + element.data('src'));
                            }
                        });
                    }

                    {
                        // User rights
                        _this.Data.get("User").then(function (user) {
                            if (user.role == "MANAGER" || user.role == "G_MANAGER" || user.role == "ADMIN") {
                                controlBtns.style.display = "flex";
                                modal.querySelectorAll('[data-event="dismiss"]').forEach(function (b) {
                                    return b.style.display = "block";
                                });
                                description.removeAttribute("disabled");
                                name.removeAttribute("readonly");

                                {
                                    // Performers
                                    var _pList = new Map();
                                    var renderPerformers = function renderPerformers(data) {
                                        var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                                        if (clear) performers.innerHTML = "";
                                        data.forEach(function (p) {
                                            $(performers).append("\n                                                <div class=\"performer\" data-performer-id=\"" + p.id + "\">\n                                                    <div class=\"user-block\">\n                                                        <img class=\"img\" data-src=\"" + p.imgPath + "\" alt=\"\" />\n                                                        <span class=\"name\">" + p.name + "</span>\n                                                    </div>\n                                                    <div class=\"form-check\">\n                                                        <input class=\"form-check-input position-static\" type=\"checkbox\" " + (p.checked == true ? "checked" : "") + "/>\n                                                    </div>\n                                                </div>");
                                            performers.querySelector("[data-performer-id=\"" + p.id + "\"] .form-check-input").onclick = function (e) {
                                                var pId = e.target.closest(".performer").dataset.performerId;
                                                if (e.target.checked == true) {
                                                    e.target.checked = false;e.target.setAttribute("disabled", "true");
                                                    _this.Alert.render("confirm", "Виконавця буде додано до задачі. Ви впевнені?", {
                                                        confirm: function confirm() {
                                                            _this.Loader.show("infinity");
                                                            _this.Http.post("/task/performer/add", { taskId: d.dataset.todoId, performerId: pId }, function (res) {
                                                                if (res.success) {
                                                                    _pList.set(pId, p);_pList.get(pId).checked = true;e.target.checked = true;
                                                                    _this.Alert.render("success", "Виконавця додано.");
                                                                } else _this.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: " + res.msg.substr(0, 32) + "...");
                                                                _this.Loader.hide();e.target.removeAttribute("disabled");
                                                            });
                                                        },
                                                        unConfirm: function unConfirm() {
                                                            return e.target.removeAttribute("disabled");
                                                        }
                                                    });
                                                } else {
                                                    e.target.checked = true;e.target.setAttribute("disabled", "true");
                                                    _this.Alert.render("confirm", "Виконавця буде вилучено з задачі. Ви впевнені?", {
                                                        confirm: function confirm() {
                                                            _this.Loader.show("infinity");
                                                            _this.Http.post("/task/preformer/remove", { taskId: d.dataset.todoId, performerId: pId }, function (res) {
                                                                if (res.success) {
                                                                    _pList.get(pId).checked = false;_pList.delete(pId);e.target.checked = false;
                                                                    _this.Alert.render("success", "Виконавця вилучено.");
                                                                } else _this.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: " + res.msg.substr(0, 32) + "...");
                                                                _this.Loader.hide();e.target.removeAttribute("disabled");
                                                            });
                                                        },
                                                        unConfirm: function unConfirm() {
                                                            return e.target.removeAttribute("disabled");
                                                        }
                                                    });
                                                }
                                            };
                                        });$(performers).find('[data-src]').Lazy({
                                            effect: 'fadeIn',
                                            autoDestroy: true,
                                            effectTime: 200,
                                            threshold: performers.scrollHeight,
                                            visibleOnly: false,
                                            onError: function onError(element) {
                                                console.log('error loading ' + element.data('src'));
                                            }
                                        });
                                    };

                                    var _pageNum = 0;
                                    _this.Data.get("Performers").then(function (data) {

                                        data.forEach(function (p) {
                                            return _pList.set(p.id, p);
                                        });
                                        t.performerList.forEach(function (id) {
                                            return _pList.get(id).checked = true;
                                        });

                                        data.sort(function (perf1, perf2) {
                                            var p1 = perf1.checked;
                                            var p2 = perf2.checked;
                                            if (p1 !== p2) {
                                                if (p1) {
                                                    return -1;
                                                } else {
                                                    return 1;
                                                }
                                            } else {
                                                return 0;
                                            }
                                        });

                                        var splitData = _this.Split.split(data, 10);
                                        renderPerformers(splitData[0]);
                                        var findForm = Factory.getClass("Finder", modal.querySelector(".findPerformer"), data, splitData[0]);

                                        findForm.subscribe(function (result) {
                                            $(performers).animate({
                                                scrollTop: 0
                                            }, 100, function () {
                                                return renderPerformers(result);
                                            });
                                            _pageNum = 0;if (result == splitData[0]) {
                                                pagBtn.style.display = "flex";
                                            } else pagBtn.style.display = "none";
                                        });

                                        pagBtn.onclick = function () {
                                            if (splitData.size - 1 !== _pageNum) {
                                                _pageNum += 1;renderPerformers(splitData[_pageNum], false);
                                                if (splitData.length - 1 == _pageNum) pagBtn.style.display = "none";
                                            } else return;
                                            $(performers).animate({
                                                scrollTop: performers.scrollHeight
                                            }, 100);
                                        };
                                    });
                                }
                            } else {
                                t.performerList.forEach(function (id) {
                                    var user = User.get(id);

                                    $(performers).append("\n                                    <div class=\"performer\" data-performer-id=\"" + user.id + "\">\n                                        <div class=\"user-block\">\n                                            <img class=\"img\" data-src=\"" + user.imgPath + "\" alt=\"\" />\n                                            <span class=\"name\">" + user.name + "</span>\n                                        </div>\n                                    </div>");
                                });

                                $(performers).find('[data-src]').Lazy({
                                    effect: 'fadeIn',
                                    autoDestroy: true,
                                    effectTime: 200,
                                    threshold: performers.scrollHeight,
                                    visibleOnly: false,
                                    onError: function onError(element) {
                                        console.log('error loading ' + element.data('src'));
                                    }
                                });
                            }

                            if (t.status !== "INPROGRESS") {
                                inProgressBtn.style.display = "block";
                            }
                        });
                    }

                    {
                        // Download files
                        downloadFiles.onclick = function () {
                            return _this.FilesManager.download(Array.from(files.querySelectorAll(".file")).map(function (f) {
                                return f.dataset.fileId;
                            }));
                        };

                        downloadReportFiles.onclick = function () {
                            return _this.FilesManager.download(Array.from(rFiles.querySelectorAll(".file")).map(function (f) {
                                return f.dataset.fileId;
                            }));
                        };
                    }

                    {
                        // Apply changes
                        name.oninput = function () {
                            if (name.value.length == 0) {
                                if (changeBtn.style.display = "block" && description.value.trim() == t.description) changeBtn.style.display = "none";
                            } else if (name.value.trim() == t.name) {
                                if (changeBtn.style.display = "block" && description.value.trim() == t.description) changeBtn.style.display = "none";
                            } else {
                                changeBtn.style.display = "block";
                            }
                        };
                        name.onchange = function () {
                            if (name.value.length == 0) {
                                name.value = t.name;
                            }
                        };

                        description.oninput = function () {
                            if (description.value.length == 0) {
                                if (changeBtn.style.display = "block" && name.value.trim() == t.name) changeBtn.style.display = "none";
                            } else if (description.value.trim() == t.description) {
                                if (changeBtn.style.display = "block" && name.value.trim() == t.name) changeBtn.style.display = "none";
                            } else {
                                changeBtn.style.display = "block";
                            }
                        };
                        description.onchange = function () {
                            if (description.value.length == 0) {
                                description.value = t.description;
                            }
                        };

                        changeBtn.onclick = function () {
                            _this.Loader.show("infinity");
                            var data = { todoId: d.dataset.todoId };
                            if (description.value.trim() !== t.description) {
                                data.description = description.value;
                            }
                            if (name.value.trim() !== t.name) {
                                data.name = name.value;
                            }
                            $(modal).modal("hide");

                            _this.Http.post("/task/modify/name", data, function (res) {
                                _this.Loader.hide();setTimeout(function () {
                                    if (res.success) {
                                        _this.Alert.render("success", "Зміни застосовано.");
                                    } else {
                                        _this.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430 " + res.msg.substr(0, 32) + ".");
                                    }
                                }, 400);
                            });
                        };
                    }

                    _this.Loader.hide();
                });

                {
                    // Toggle buttons
                    toggleBtns.querySelector(".active").classList.remove("active");detailsBtn.classList.add("active");
                    detailsBtn.onclick = function (e) {
                        if (!e.target.classList.contains("active")) {
                            toggleBtns.querySelector(".active").classList.remove("active");
                            detailsBtn.classList.add("active");
                        } else return;
                    };

                    reportBtn.onclick = function (e) {
                        if (!e.target.classList.contains("active")) {
                            toggleBtns.querySelector(".active").classList.remove("active");
                            reportBtn.classList.add("active");
                        } else return;
                    };
                }

                {
                    // Upload report files
                    uploadBtn.style.display = "none";
                    var fList = function fList() {
                        return uploadFiles.querySelectorAll(".file");
                    };var data = new Map();
                    var Alert = _this.Alert;
                    reportForm.onchange = function () {
                        var _this3 = this;

                        if (this.files.length > 6 || this.files.length > 6 - fList().length) return Alert.render("danger", "" + (6 - fList().length ? "\u043D\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 \u043D\u0456\u0436: " + (6 - fList().length) + " \u0444\u0430\u0439\u043B\u0456\u0432" : "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0444\u0430\u0439\u043B\u0456\u0432!"));

                        var _loop2 = function _loop2(i) {
                            var f = _this3.files[i];
                            var name = f.name.substr(0, f.name.lastIndexOf("."));
                            if (data.has(encodeURIComponent(name))) {
                                Alert.render("warning", "\u0444\u0430\u0439\u043B \u0437 \u0442\u0430\u043A\u0438\u043C \u0456\u043C'\u044F\u043C: " + name.substr(0, 32) + "... - \u0432\u0436\u0435 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043E");
                            } else {
                                var ext = f.name.substr(f.name.lastIndexOf("."));

                                $(uploadFiles).prepend("\n                                <div class=\"file\" data-file-id=\"" + encodeURIComponent(name) + "\">\n                                    <img class=\"img\" src=\"./img/docs-img/" + ext.substr(1) + ".png\" alt=\"\" />\n                                    <span class=\"name\">\n                                        " + decodeURIComponent(name) + "\n                                    </span>\n                                    <span class=\"extension\"> " + ext + " </span>\n                                    <i data-event=\"dismiss\" class=\"fas fa-trash\"></i>\n                                </div>");

                                uploadFiles.querySelector('.file [data-event="dismiss"]').onclick = function (e) {
                                    var file = $(uploadFiles).find(e.target.closest(".file"));

                                    file.slideUp(100, function () {
                                        file.remove();if (fList().length == 0) uploadBtn.style.display = "none";
                                    });
                                    data.delete(encodeURIComponent(name));
                                };

                                data.set(encodeURIComponent(name), f);
                            }
                        };

                        for (var i = 0; i < this.files.length; i++) {
                            _loop2(i);
                        }
                        reportForm.value = "";
                        if (fList().length > 0) uploadBtn.style.display = "block";
                    };uploadBtn.onclick = function () {
                        if (data.size > 0) {
                            var formData = new FormData();
                            data.forEach(function (f) {
                                return formData.append("files", f);
                            });
                            $(modal).modal("hide");_this.Loader.show("infinity");
                            console.log(formData.getAll("files"));
                            formData.append("taskId", d.dataset.todoId);

                            _this.Http.post("/report/upload", formData, function (res) {
                                _this.Loader.hide();setTimeout(function () {
                                    if (res.success) {
                                        _this.Alert.render("success", "Файли завантажено.");
                                    } else {
                                        _this.Alert.render("danger", "Сталася помилка.");
                                    }
                                }, 400);
                            }, {
                                headers: {
                                    "Content-Type": false,
                                    "cache": false,
                                    "processData": false
                                }
                            });
                        } else {
                            _this.Alert.render("warning", "Сталася помилка.");
                        }
                    };
                }

                {
                    // Change status
                    var changeStatus = function changeStatus(status) {
                        $(modal).modal("hide");_this.Loader.show("infinity");
                        _this.Http.post("/task/modify/status", { taskId: d.dataset.todoId, status: status }, function (res) {
                            _this.Loader.hide(function () {
                                if (res.success) {
                                    _this.Alert.render("success", "Статус змінено.");
                                    _this.BoardsHandler = Factory.getClass("BoardsHandler");
                                    _this.Data.update("Todos").then(function (data) {
                                        return _this.BoardsHandler.render(data);
                                    });
                                } else {
                                    _this.Alert.render("danger", "Сталася помилка.");
                                }
                            });
                        });
                    };

                    completeBtn.onclick = function () {
                        return changeStatus("COMPLETED");
                    };
                    overdueBtn.onclick = function () {
                        return changeStatus("OVERDUE");
                    };
                    onholdBtn.onclick = function () {
                        return changeStatus("ONHOLD");
                    };
                    tonewBtn.onclick = function () {
                        return changeStatus("NEW");
                    };
                    inProgressBtn.onclick = function () {
                        return changeStatus("INPROGRESS");
                    };
                }
            });$('[data-modal="todoInfo"]').on("hidden.bs.modal", function () {
                $(todoInfoCarousel).carousel(0);
                _this.Data.get("Performers").then(function (data) {
                    data.forEach(function (p) {
                        setTimeout(function () {
                            if (p.checked) p.checked = false;
                        }, 0);
                    });
                });
            });

            this.init("filesFilter", document.querySelector('[data-modal="filesFilter"]'), function () {
                return "done";
            }, function () {
                var modal = _this.modals["filesFilter"].node,
                    df = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-from"]')),
                    dt = Factory.getClass("Datepicker", modal.querySelector('[data-role="calendar-to"]')),
                    name = modal.querySelector(".filter__name"),
                    submit = modal.querySelector('[data-event="submit"]');

                _this.Dropdown.init(modal, { single: true });
                var FilesHandler = Factory.getClass("FilesHandler");

                // Confirm
                submit.onclick = function () {
                    _this.Loader.show("infinity");
                    _this.Http.get("/archive/doc/list?" + (name.value.length > 0 ? "name=" + name.value + "&" : "") + "startDate=" + df.getDate() + "&endDate=" + dt.getDate(), function (data) {
                        FilesHandler.render(data);$(modal).modal("hide");
                        Factory.getClass("Pagination").init(".pagination", "/archive/doc/list?" + (name.value.length > 0 ? "name=" + name.value + "&" : "") + "startDate=" + df.getDate() + "&endDate=" + dt.getDate(), "FilesHandler");
                    });
                };
            });

            this.init("addNewEmployes", document.querySelector('[data-modal="addNewEmployes"]'), function () {
                return "done";
            }, function (d) {
                var modal = _this.modals["addNewEmployes"].node,
                    submit = modal.querySelector('[data-event="submit"]'),
                    form = modal.querySelector(".add-employes__input-wrapper"),
                    input = modal.querySelector(".add-employes__input"),
                    list = modal.querySelector(".add-employes__list");

                list.innerHTML = "";

                form.onsubmit = function (e) {
                    e.preventDefault();
                    if (input.value.length == 0) return;
                    if (!_this.Regexp.email.test(input.value)) {
                        input.value = "";
                        return _this.Alert.render("warning", "Не вірний формат пошти");
                    }
                    $(list).prepend("\n                    <div class=\"add-employes__item\">\n\t\t\t\t\t\t<div class=\"add-employes__item-name\">" + input.value + "</div>\n\t\t\t\t\t\t<button class=\"add-employes__item-remove\">\n\t\t\t\t\t\t\t<i class=\"fa fa-trash\"></i>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n                    ");
                    list.querySelector(".add-employes__item-remove").onclick = function (e) {
                        var employee = e.target.closest(".add-employes__item");
                        $(employee).slideUp(150, function () {
                            return $(employee).remove();
                        });
                    };
                    input.value = "";
                };

                // Confirm
                submit.onclick = function () {
                    if (list.querySelectorAll(".add-employes__item").length == 0) return _this.Alert.render("warning", "Додайте адреси.");
                    _this.Loader.show("infinity");
                    _this.Http.post("/tenants/invite", {
                        emails: Array.from(list.querySelectorAll(".add-employes__item")).map(function (e) {
                            return e.querySelector(".add-employes__item-name").innerText.trim();
                        }),
                        tenantId: d.id
                    }, function (res) {
                        _this.Loader.hide(function () {
                            console.log({ employes: Array.from(list.querySelectorAll(".add-employes__item")).map(function (e) {
                                    return e.querySelector(".add-employes__item-name").innerText.trim();
                                }) });
                            if (res.success) {
                                _this.Alert.render("success", "Запрошення відправлено.");
                            } else {
                                _this.Alert.render("danger", "\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430 " + res.msg.substr(0, 32) + "...");
                            }
                            $(modal).modal("hide");
                        });
                    });
                };
            });
        }

        _createClass(Modal, [{
            key: "render",
            value: function render(name, data) {
                this.modals[name].render(data);
            }
        }, {
            key: "init",
            value: function init(name, node, conditions, _render) {
                this.modals[name] = {
                    render: function render(data) {
                        if (!data) {
                            $(node).modal("show");setTimeout(function () {
                                return _render();
                            }, 200);
                        } else if (conditions(data) == "done") {
                            $(node).modal("show");setTimeout(function () {
                                return _render(data);
                            }, 200);
                        }
                    }, node: node
                };
            }
        }]);

        return Modal;
    }();

    Factory.setSingletone("Modal", Modal);
})(window.Factory);