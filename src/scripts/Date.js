(function (Factory) {

    class Date {

        constructor() {
            this.Date = new Date()
            this.months = []
        }

        daysInMonth(y, m) {
            return 32 - new Date(y, m, 32).getDate();
        }

        currentMonth() {
            return this.Date.getMonth()
        }

        monthIndex(m) {
            let i = this.months.indexOf(m)
            if (i !== -1) { return i } else return undefined
        }

        currentYear() {
            return this.Date.getFullYear()
        }
    }

    Factory.setSingletone("Date", Date)

})(window.Factory);

