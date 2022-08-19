import { DoFile } from "./repo"
import { Request, Response } from 'express'

export class UpFileService {
    constructor(private readonly upfilerepo: DoFile) { }
    async upFile(file: any, res: Response) {
        try {
            const result = await this.upfilerepo.upfile(file)
            res.send(result)
        }
        catch (err) {
            res.send("khong upfile duoc")
        }
    }
    async multiDown(res: Response) {
        try {
            const result = await this.upfilerepo.multiDownFile()
            res.send(result)
        }
        catch (err) {
            res.send("khong down duoc file")
        }
    }
    async down(res: Response) {
        try {
            const result = await this.upfilerepo.singeDownFile()
            res.send(result)
        }
        catch (err) {
            res.send("khong down duoc file")
        }
    }
}
