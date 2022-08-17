import { Upfile } from "./repo"
import { Request, Response } from 'express'

export class UpFileService {
    constructor(private readonly upfilerepo: Upfile) { }
    async upFile(file: any, res: Response) {
        try {
            const result = await this.upfilerepo.upfile(file)
            res.send(result)
        }
        catch (err) {
            res.send("khong upfile duoc")
        }
    }
    async downFile(res: Response) {
        try {
            const result = await this.upfilerepo.downFile()
            res.send(result)
        }
        catch (err) {
            res.send("khong down duoc file")
        }
    }
}