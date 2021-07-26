const {
    usersModules, findUsers, findList, del
} = require('../modules/Users')
const { hash } = require('../utils/tools')


//1.注册用户
const singnUp = async function (req, res, next) {
    const { usersName, passWord } = req.body
    res.header('content-type', 'application/json;charset=utf-8')

    //密码加密
    const bcryptPassword = await hash(passWord)

    // 用户名判断用户是否存在  不存在返回null
    let findResult = await findUsers(usersName)

    if (findResult) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名已存在'
            })
        })
    } else {
        // 数据库没有这个用户
        let result = await usersModules({
            usersName,
            passWord: bcryptPassword
        })

        res.render('succ', {
            data: JSON.stringify({
                message: '注册成功'
            })
        })
    }
}



//3.获取用户列表
const list = async (req, res) => {
    res.header('content-type', 'application/json;charset=utf-8')
    let result = await findList()
    res.render('succ', {
        data: JSON.stringify(result)
    })
}

//4.删除用户
const deleteId = async (req, res) => {
    res.header('content-type', 'application/json;charset=utf-8')

    const { id } = req.body
    console.log(req.body);

    let result = await del(id)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '删除成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '删除失败'
            })

        })
    }

}



exports.singnUp = singnUp
exports.list = list
exports.deleteId = deleteId