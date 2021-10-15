$(function () {
    //1.商品模块 
    $(".shop-car").on("mouseenter", function () {
        $(".shop-con").stop().slideDown();
        console.log($(".shop-car a"));
        $(".shop-car a").addClass('hover');
    })
    $(".shop-car").on("mouseleave", function () {
        $(".shop-con").stop().slideUp()
        $(".shop-car a").removeClass('hover');
    })

    //2.生成随机数
    function getRandom(min, max) {
        max = Math.floor(max);
        min = Math.ceil(min);
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    //3.搜索框模块
    const arr = ['手机', '电脑', '电视', '家电', '净水器', '小米11', '空调', '个护'];
    const input = document.querySelector('#search-inpt');
    setInterval(() => {
        input.placeholder = arr[getRandom(0, arr.length - 1)]
    }, 2000)

    //4.二级导航
    $(".site-nav li").on("mouseenter", function () {
        $(this).children(".site-phone").stop().slideDown()
    })
    $(".site-nav li").on("mouseleave", function () {
        $(this).children(".site-phone").stop().slideUp()
    })

    //5.轮播图模块
    const ulWidth = $(".banner-list li").width() * ($(".banner-list li").length + 1)
    $(".banner-list").width(ulWidth)  //计算banner-list 的长度
    //动画函数
    // function animate(obj, target, callback) {
    //     obj.times = setInterval(() => {
    //         if (obj.offer().left >= target) {
    //             clearInterval(obj.times)
    //         }
    //         callback && callback();
    //     }, 300)
    //     obj.fadeOut(300).css("left", target);
    // }
    //小圆点
    // for (var i = 0; i < $(".banner-list li").length; i++) {
    //     var li = $("<li></li>");
    //     $(".banner-img ol").prepend(li);
    //     li.click(function () {
    //         var index = $(this).index()
    //         // console.log(index); 
    //         $(".banner-img ol li").eq(index).addClass("curent").siblings().removeClass("curent");

    //         $(".banner-list").stop().animate({
    //             "left": -1226 * index,
    //         })
    //         num = index;
    //         cire = index;
    //     })
    // }
    // $(".banner-img ol li")[0].className = 'curent'

    // // 左右侧按钮
    // var li = $('<li><a href="#"><img src="image/banner1.jpg" alt=""></a></li>')
    // $(".banner-list").append(li);
    // var num = 0
    // var cire = 0;
    // $(".prve").click(function () {
    //     num--;
    //     if (num == 0) {
    //         num = $(".banner-list li").length - 1
    //     }
    //     $(".banner-list").animate({
    //         "left": 1226 * num,
    //     })
    //     cire--;
    //     if (cire == 0) {
    //         cire = $(".banner-img ol li").length;
    //     }
    //     $(".banner-img ol li").eq(cire).addClass("curent").siblings().removeClass("curent")
    // })

    // $(".next").click(function () {
    //     num++;
    //     if (num == $(".banner-list li").length - 1) {
    //         num = 0
    //     }
    //     $(".banner-list").animate({
    //         "left": -1226 * num,
    //     })
    //     cire++;
    //     if (cire == $(".banner-img ol li").length) {
    //         cire = 0;
    //     }
    //     $(".banner-img ol li").eq(cire).addClass("curent").siblings().removeClass("curent")
    // })


    // var times = setInterval(() => {
    //     $(".next").click();
    // }, 3000)
    // $(".banner-img").hover(function () {
    //     clearInterval(times)
    // }, function () {
    //     times = setInterval(() => {
    //         $(".next").click();
    //     }, 3000)
    // })







})