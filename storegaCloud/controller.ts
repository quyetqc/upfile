import { UpFileService } from "./service"
import express from 'express'
import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export class UpFileController {
    constructor(private readonly upFileService: UpFileService) { }
    createRouter() {
        const authorRouter = express.Router()
        authorRouter.post('/upfile', upload.array('photos', 10), (req, res) => {
            this.upFileService.upFile(req.files, res);
        })
        authorRouter.get('/multidown', (req, res) => {
            this.upFileService.multiDown(res);
        })
        authorRouter.get('/down', (req, res) => {
            this.upFileService.singleDown(res);
        })
        return authorRouter;
    }
}
