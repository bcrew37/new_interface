(function (Factory) {

    class Datepicker {
        constructor(selector) {
            this.selector = selector
            this.selectedDate = selector.querySelector('[data-name="selectedDate"]')
            this.pickerMonth = selector.querySelector('[data-name="pickerMonth"]')
            this.pickerYear = selector.querySelector('[data-name="pickerYear"]')
            this.pickerNext = selector.querySelector('[data-event="next"]')
            this.pickerPrevious = selector.querySelector('[data-event="previous"]')
            this.pickerToggle = selector.querySelector('[data-event="pickerToggle"]')
            this.pickerBody = selector.querySelector("tbody")

            this.dateInit(this.Date.cm(), this.Date.cy())

            this.Selector = Factory.getClass("Selector", {
                length: 1,
                on: this.datePicked.call(this),
                off: this.datePicked.call(this)
            })
        }

        dateInit(m, y) {

        }

        datePicked() {

        }
    }

    Factory.setPrototype("Datepicker", Datepicker)

})(window.Factory);

