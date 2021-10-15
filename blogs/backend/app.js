const express = require('express');
const app = express()
const path = require('path')
const cors = require('cors')
var bodyParser = require('body-parser')
const indexRouter = require('./routes/index')

//post 请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//ejs模板
// 注册ejs模板为html页。以.ejs为后缀的模板页，现在的后缀名可以是.html
app.engine('.html', require('ejs').__express);
// 设置视图模板的默认后缀名为.html, 避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'ejs');
// 设置模板文件文件夹
app.set('views', __dirname + '/views');

//静态资源服务
app.use('static', express.static(path.join(__dirname, './public')))

//允许跨域
app.use(cors())

//挂载路由
app.use('/api', indexRouter)


app.listen(3000, () => {
    console.log('服务器启动');
})