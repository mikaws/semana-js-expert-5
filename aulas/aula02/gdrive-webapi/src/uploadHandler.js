import Busboy from 'busboy'
export default class UploadHandler {
    constructor({ io, socketId, downloadsFolder }) {
        this.io = io
        this.sockedId = socketId
        this.downloadsFolder = downloadsFolder
    }

    handleFileBytes() {
        
    }
    onFile(fieldname, file, filename){
        
    }

    registerEvents(headers, onFinish){
        const busboy = new Busboy({ headers })
        busboy.on("file", this.onFile.bind(this))
        busboy.on("finish", onFinish)
        
        return busboy
    }
}