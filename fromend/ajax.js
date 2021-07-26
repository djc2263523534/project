
$(function () {
    //1.获取用户数据
    ajaxList();
    function ajaxList() {
        $.ajax({
            // async: false,
            url: 'http://127.0.0.1:3000/api',
            success(res) {
                let html = ""
                $.each(res.data, (index, value) => {
                    html += `
                    <tr>
                        <td><span>${value.usersName}</span></td>
                        <td><a href="javascript:;" data-id=${value._id}>删除</a></td>
                    </tr>
                `
                })
                $('.list').html(html)
                request()
            }
        })

    }
    //2.提交用户注册信息
    $('form').submit(function (e) {
        console.log($('form').serialize());
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:3000/api',
            method: 'post',
            data: $('form').serialize(),           //usersName=admin13&passWord=sssxxss
            success(res) {
                ajaxList()
                console.log(res);

            },
            error(res) {
                console.log(res);
            }
        })
    });

    //3.删除用户
    const request = () => {
        $(".list tr td").on("click", " a", function (e) {
            e.preventDefault();
            let id = $(this).attr('data-id')
            $.ajax({
                type: "delete",
                url: "http://127.0.0.1:3000/api/del",
                data: {
                    id: id
                },
                success: function (response) {
                    ajaxList()
                    console.log(response);
                }
            });
        });
    }









})