import express from "express"
import bodyParser from 'body-parser'
import { UpFileController } from "./storegaCloud/controller"
import { UpFileService } from "./storegaCloud/service"
import { DoFile } from "./storegaCloud/repo"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const upFileRepo = new DoFile();
const upFileService = new UpFileService(upFileRepo);

app.use('/cloud', new UpFileController(upFileService).createRouter())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
