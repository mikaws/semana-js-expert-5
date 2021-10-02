import {
    jest,
    describe,
    test,
    expect
} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper'

describe('#FileHelper', () => {
    describe('#getFilesStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 2055,
                mode: 33204,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 43735451,
                size: 116718,
                blocks: 232,
                atimeMs: 1632186081944.3684,
                mtimeMs: 1632186081024.4312,
                ctimeMs: 1632186081156.422,
                birthtimeMs: 1632186081024.4312,
                atime: '2021-09-21T01:01:21.944Z',
                mtime: '2021-09-21T01:01:21.024Z',
                ctime: '2021-09-21T01:01:21.156Z',
                birthtime: '2021-09-21T01:01:21.024Z'
              }

            const mockUser = 'james'
            process.env.USER = mockUser
            const filename = 'file.png'
            jest.spyOn(fs.promises, fs.promises.readdir.name)
              .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
              .mockResolvedValue(statMock)
            
            const result = await FileHelper.getFilesStatus('/tmp')

            const expectedResult = [{
                size: '117 kB',
                lastModified: statMock.birthtime,
                owner: mockUser,
                file: filename
            }]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})