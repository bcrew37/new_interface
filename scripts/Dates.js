(function (Factory) {

    class Dates {
        constructor() {
            this.Date = new Date()
            this.months = [
                "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
            ]
        }

        mLength(y = this.year(), m = this.mIndex()) {
            return 32 - new Date(y, m, 32).getDate();
        }

        date() {
            return this.Date.getDate()
        }

        month() {
            return this.months[this.Date.getMonth()]
        }

        year() {
            return this.Date.getFullYear()
        }

        firstDay(y = this.year(), m = this.month()) {
            return new Date(y, m).getDay()
        }

        mIndex(m = this.month()) {
            let i = this.months.indexOf(m); if (i !== -1) { return i } else return undefined
        }

        DMY(d = this.date(), m = this.mIndex(), y = this.year()) {
            d = parseInt(d);
            m = parseInt(m) + 1
            y = parseInt(y)

            if (d < 10) d = '0' + d; if (m < 10) m = '0' + m; return d + '.' + m + '.' + y
        }

        parseDMY(str) {
            let d = parseInt(str.substring(0, 2)), m = parseInt(str.substring(3, 5)) - 1, y = parseInt(str.substring(6, 10)); return [d, m, y]
        }
    }

    Factory.setSingletone("Dates", Dates)

})(window.Factory);

