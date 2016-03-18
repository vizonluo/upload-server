const path = require('path')
const fs = require('fs')

const app = require('koa')()
const router = require('koa-router')()
const koaBody = require('koa-body')({
    multipart:true,
    formidable:{
        uploadDir: path.join(__dirname, 'tmp')
    }
})
const render = require('koa-ejs')

render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true,
})

router.get('/', function *(next) {
    yield this.render('index')
})

router.post('/upload', koaBody,
    function *(next) {
        const bodyData = this.request.body
        const fileInfo = bodyData.files.file
        this.body = JSON.stringify(bodyData)
        fs.rename(fileInfo.path, path.join(__dirname, 'upload', fileInfo.name), () => {})
    }
)

app
    .use(router.routes())

app.listen(8123)
