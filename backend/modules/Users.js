const { Users } = require('../utils/db')



const usersModules = ({ usersName, passWord }) => {
    //1.创建一个users 类
    const users = new Users({
        usersName,
        passWord
    })
    return users.save()

}

//2.查询数据库
const findUsers = (usersName) => {
    return Users.findOne({ usersName })
}


//3.查询用户所有数据
const findList = () => {
    return Users.find()
}


//4.删除用户
const del = (id) => {
    return Users.deleteOne({ _id: id })
}


module.exports = {
    usersModules,
    findUsers,
    findList,
    del
}

