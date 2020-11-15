(function (Factory) {

    class Lang {
        constructor() {
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
                "overdue": "Прострочено",
            }
        }

        get(word) {
            word = word.toLowerCase()
            if (this.words[word]) { return this.words[word] } else return word
        }
    }

    Factory.setSingletone("Lang", Lang)

})(window.Factory);



