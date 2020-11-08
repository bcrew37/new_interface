(function (Factory) {

    class Datepicker {
        constructor([selector, dmy, on, off]) {
            this.Dates = Factory.getClass("Dates")
            this.selector = selector
            this.dmy = dmy
            this.on = on
            this.off = off

            this.control = this.selector.querySelector(".control");
            this.control.querySelector('[data-event="previous"]').onclick = () => this.toggleControl("previous")
            this.control.querySelector('[data-event="next"]').onclick = () => this.toggleControl("next")

            let [d, m, y] = dmy ? this.Dates.parseDMY(dmy) : [undefined, undefined, undefined]

            this.cMonth = this.control.querySelector('[data-name="pickerMonth"]'); this.cMonth.innerHTML = this.Dates.month()
            this.cYear = this.control.querySelector('[data-name="pickerYear"]'); this.cYear.innerHTML = this.Dates.year()
            this.sDate = this.selector.querySelector('[data-name="selectedDate"]'); this.render(d, m, y);
        }

        toggleControl(arg) {
            switch (arg) {
                case "previous":
                    let preM = (this.Dates.mIndex(this.cMonth.innerHTML) == 0) ? 11 : this.Dates.mIndex(this.cMonth.innerHTML) - 1,
                        preY = (preM == 11) ? parseInt(this.cYear.innerHTML) - 1 : parseInt(this.cYear.innerHTML)

                    this.render(1, preM, preY)
                    break;

                case "next":
                    let nexM = (this.Dates.mIndex(this.cMonth.innerHTML) == 11) ? 0 : this.Dates.mIndex(this.cMonth.innerHTML) + 1,
                        nexY = (nexM == 0) ? parseInt(this.cYear.innerHTML) + 1 : parseInt(this.cYear.innerHTML)

                    this.render(1, nexM, nexY)
                    break;
            }
        }

        toggleDate(target) {
            let d = target.querySelector(".date-item").innerHTML,
                m = this.Dates.mIndex(this.cMonth.innerHTML),
                y = this.cYear.innerHTML

            this.sDate.innerHTML = this.Dates.DMY(d, m, y)
            if (this.on) this.on(target)
        }

        render(d = this.Dates.date(), m = this.Dates.mIndex(), y = this.Dates.year()) {
            this.cYear.innerHTML = y; this.cMonth.innerHTML = this.Dates.months[m]
            this.sDate.innerHTML = this.dmy ?? this.Dates.DMY(d, m, y);

            const mLength = this.Dates.mLength(y, m), firstDay = this.Dates.firstDay(y, m) || 7
            const body = this.selector.querySelector("tbody"); body.innerHTML = ""


            for (let d = 0; d < mLength + (firstDay - 1); d++) {
                let cell = document.createElement("td"); if (d + 1 > firstDay - 1) $(cell).append(
                    `<div class="date-item">${d + 1 - firstDay + 1}</div>`
                )
                if (d % 7 == 0) body.append(document.createElement("tr")); let rows = body.querySelectorAll("tr"); $(rows[rows.length - 1]).append(cell)
            }

            Factory.getClass("Selector", {
                length: 1,
                on: this.toggleDate.bind(this),
                selector: body.querySelectorAll(".date-item")
            })
        }

        getDate() {
            return this.sDate.innerHTML
        }

        set(dmy) {
            this.sDate.innerHTML = dmy
        }

    }

    Factory.setPrototype("Datepicker", Datepicker)

})(window.Factory);

