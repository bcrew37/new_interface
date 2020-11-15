(function (Factory) {

    class FilesManager {

        download(data) {
            if (data.length == 0) return Factory.getClass("Alert").render("warning", "Обріть файли")
            let download = window.open(`/archive/doc/download?docId=${data.join("docId=")}`, "Download"); download.close()
        }
    }

    Factory.setSingletone("FilesManager", FilesManager)

})(window.Factory);


