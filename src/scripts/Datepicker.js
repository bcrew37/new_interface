(function (Factory) {

    class Datepicker {
        constructor() {
            this.Dates = Factory.getClass("Dates")
            this.Selector = Factory.getClass("Selector", {
                length: 1,
                on: this.datePicked.call(this),
                off: this.datePicked.call(this)
            })
        }

        init(selector) {
            let selectedDate = selector.querySelector('[data-name="selectedDate"]'),
                pickerBody = selector.querySelector("tbody")

            selectedDate.innerHTML = this.Dates.DMY()
        }
    }

    Factory.setPrototype("Datepicker", Datepicker)

})(window.Factory);

