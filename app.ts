import express from "express"
import { UpFileController } from "./storegaCloud/controller"
import { UpFileService } from "./storegaCloud/service"
import { Upfile } from "./storegaCloud/repo"
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const upFileRepo = new Upfile();
const upFileService = new UpFileService(upFileRepo);

app.use('/cloud', new UpFileController(upFileService).createRouter())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})