(function (Factory) {

    class FilesManager {
        download(data) {
            console.log(data)
            let download = window.open("/test", "Download"); download.close()
        }
    }

    Factory.setSingletone("FilesManager", FilesManager)

})(window.Factory);


