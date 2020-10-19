(function (Factory) {

    class FilesManager {
        download(data) {
            let download = window.open("/test", "download"); download.close()
        }
    }

    Factory.setSingletone("FilesManager", FilesManager)

})(window.Factory);


