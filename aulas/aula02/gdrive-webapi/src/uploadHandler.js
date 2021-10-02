import Busboy from 'busboy'
import fs from 'fs'
import { pipeline } from 'stream/promises'
import { logger } from './logger'

export default class UploadHandler {
    constructor({ io, socketId, downloadsFolder }) {
        this.io = io
        this.sockedId = socketId
        this.downloadsFolder = downloadsFolder
    }

    handleFileBytes() {
        
    }

    async onFile(fieldname, file, filename){
        const saveTo = `${this.downloadsFolder}/${filename}`
        await pipeline(
            //1th step: catch a readble stream!
            file,
            //2th step: filter, convert, transform data!
            this.handleFileBytes.apply(this, [ filename ]),
            //3th step: is the output of the process, a writable stream!
            fs.createWriteStream(saveTo)
        )

        logger.info(`File [${filename}] finished`)
    }

    registerEvents(headers, onFinish){
        const busboy = new Busboy({ headers })
        busboy.on("file", this.onFile.bind(this))
        busboy.on("finish", onFinish)
        
        return busboy
    }
}