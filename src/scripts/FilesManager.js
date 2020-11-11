(function (Factory) {

    class FilesManager {

        download(data) {
            if (data.length == 0) return Factory.getClass("Alert").render("warning", "Обріть файли")
            let download = window.open(`/test/${data.join("&")}`, "Download"); download.close()
            console.log(`/test/${data.join("&")}`)
        }
    }

    Factory.setSingletone("FilesManager", FilesManager)

})(window.Factory);


