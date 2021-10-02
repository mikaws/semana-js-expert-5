import {
    jest,
    describe,
    test,
    expect
} from '@jest/globals'
import fs from 'fs'
import { resolve } from 'path'
import { pipeline } from 'stream'
import UploadHandler from '../../src/uploadHandler'
import TestUtil from '../_util/testUtil'
import Routes from './../../src/routes'

describe('#UploadHandler test suite', () => {
    const ioObj = {
        to: (id) => ioObj,
        emit: (event, message) => {}
    }

    describe('#registerEvents', () => {
        test('should call onFile and onFinish functions on Busboy instance', () =>{
            const uploadHandler = new UploadHandler({
                io: ioObj,
                socketId: '01'
            })
            jest.spyOn(uploadHandler, uploadHandler.onFile.name)
                .mockResolvedValue()
            
            const headers = {
                'content-type': 'multipart/form-data; boundary='
            }
            const onFinish = jest.fn()
            const busboyInstance = uploadHandler.registerEvents(headers, onFinish)
    
            const fileStream = TestUtil.generateReadableStream([ 'chunk', 'of', 'data'])
            busboyInstance.emit('file', 'fieldname', fileStream, 'filename.txt')
    
            busboyInstance.listeners("finish")[0].call()
            expect(uploadHandler.onFile).toHaveBeenCalled()
    
            expect(onFinish).toHaveBeenCalled()
        })
    })

    describe('#onFile', () => {
        test('given a stream file it should save it on disk', async () => {
            const chunks = ['hey', 'dude']
            const downloadsFolder = '/tmp'
            const handler = new UploadHandler({
                io: ioObj,
                socketId: '01',
                downloadsFolder
            })

            const onData = jest.fn()

            jest.spyOn(fs, fs.createWriteStream.name)
                .mockImplementation(() => TestUtil.generateWritableStream(onData))
            
            const onTransform = jest.fn()
            jest.spyOn(handler, handler.handleFileBytes.name)
                .mockImplementation(() => TestUtil.generateTransformStream(onTransform))
            
            const params = {
                fieldname: 'video',
                file: TestUtil.generateReadableStream(chunks),
                filename: 'mockFile.mov'
            }

            await handler.onFile(...Object.values(params))

            expect(onData.mock.calls.join()).toEqual(chunks.join())
            expect(onTransform.mock.calls.join()).toEqual(chunks.join())
            
            const expectedFilename = resolve(handler.downloadsFolder, params.filename)
            expect(fs.createWriteStream).toHaveBeenCalledWith(expectedFilename)
        })
    })
    
    describe('#handleFileBytes', () => {
        test('should call emit function and it is a transform stream', async () => {
            jest.spyOn(ioObj, ioObj.to.name)
            jest.spyOn(ioObj, ioObj.emit.name)

            const handler = new UploadHandler({
                io: ioObj,
                socketId: '01'
            })

            const messages = ['hello']
            const source = TestUtil.generateReadableStream(messages)
            const onWrite = jest.fn()
            const target = TestUtil.generateWritableStream(onWrite)

            await pipeline(
                source,
                handler.handleFileBytes("filename.txt"),
                target
            )
            
            expect(ioObj.to).toHaveBeenCalledTimes(messages.length)
            expect(ioObj.emit).toHaveBeenCalledTimes(messages.length)

            // if the handleFileBytes be a transform stream, our pipeline
            // will continue the process, passing the data ahead
            // and call our function on target in each chunk
            expect(onWrite).toBeCalledTimes(messages.length)
            expect(onWrite.mock.calls.join()).toEqual(messages.join())
        })
    })
})