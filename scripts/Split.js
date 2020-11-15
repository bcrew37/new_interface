(function (Factory) {

    class Split {
        split(data, a) {
            let result = []

            for (let d = 0; d < data.length; d++) {
                let element = data[d];
                if (d % a == 0) result.push([])
                result[result.length - 1].push(element)
            }

            return result
        }
    }

    Factory.setSingletone("Split", Split)

})(window.Factory);



