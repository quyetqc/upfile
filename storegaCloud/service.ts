import { Upfile } from "./repo"
import { Request, Response } from 'express'

export class UpFileService {
    constructor(private readonly upfilerepo: Upfile) { }
    async upFile(res: Response) {
        try {
            const result = await this.upfilerepo.upfile()
            res.send(result)
        }
        catch (err) {
            res.send("khong upfile duoc")
        }
    }
}