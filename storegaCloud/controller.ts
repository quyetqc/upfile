import { UpFileService } from "./service"
import express from 'express'

export class UpFileController {
    constructor(private readonly upFileService: UpFileService) { }
    createRouter() {
        const authorRouter = express.Router()
        authorRouter.post('/upfile', (req, res) => {
            this.upFileService.upFile(res);
        })
        return authorRouter;
    }
}
