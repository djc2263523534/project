const { json } = require("body-parser")

const list = (req, res) => {
    res.render('succ', {
        data: JSON.stringify({
            message: '请求成功'
        })
    })
}


module.exports = {
    list
}