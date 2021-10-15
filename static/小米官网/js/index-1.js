window.addEventListener('load', function () {
    // 1.倒计时案例
    var hours = document.querySelector('.hours');
    var minute = document.querySelector('.minute');
    var seconds = document.querySelector('.seconds');
    var inputTime = +new Date('2022-4-20 24:00:00');  //返回的是当前的总毫秒数
    countDown();
    function countDown() {
        var nowTime = +new Date();  //返回的是用户输入时间的总毫秒数
        var times = (inputTime - nowTime) / 1000;  //times是剩余的秒
        var d = parseInt(times / 60 / 60 / 24);  //天
        var h = parseInt(times / 60 / 60 % 24);  //时
        h = h < 10 ? '0' + h : h;
        hours.innerHTML = h;
        var m = parseInt(times / 60 % 60);       //分
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;
        var s = parseInt(times % 60);     //秒
        s = s < 10 ? '0' + s : s;
        seconds.innerHTML = s;
    }
    setInterval(() => {
        countDown();
    }, 1000)
    //2.渲染数据
    var phone = document.querySelector('.phone-list')
    var phonelink = phone.querySelectorAll('ul li a');
    var phone1 = [
        {
            srcImage: "image/phone1.webp",
            title: "小米MIX FOLD",
            desc: '折叠大屏｜自研芯片',
            price: "9999元起",
        },
        {
            srcImage: "image/phone2.webp",
            title: "小米11 Ultra",
            desc: "1.12''GN2｜2K四微曲屏",
            price: "5999元起",
        },
        {
            srcImage: "image/phone3.webp",
            title: "小米MIX FOLD",
            desc: "1.12''GN2｜骁龙888",
            price: "4999元起",
        },
        {
            srcImage: "image/phone4.webp",
            title: "小米11 青春版",
            desc: '小米11 青春版 轻薄',
            price: "2299元起",
        },
        {
            srcImage: "image/phone5.webp",
            title: "黑鲨4 Pro",
            desc: '黑鲨4 Pro',
            price: "3999元起",
        },
        {
            srcImage: "image/phone6.webp",
            title: "黑鲨4 磁动力升降肩键",
            desc: '黑鲨4 Pro',
            price: "499元起",
        },
        {
            srcImage: "image/phone7.webp",
            title: "小米10S",
            desc: '骁龙870 | 对称式双扬立体声',
            price: "3999元起",
        },
        {
            srcImage: "image/phone8.webp",
            title: "Redmi K40 Pro 系列",
            desc: '骁龙888 / E4 旗舰直屏',
            price: "2799元起",
        }
    ]
    getData(phone1, phonelink); //渲染数据到页面
    // console.log(phonelink[0]);  //获取元素的索引号
    // 数据处理程序
    function getData(data, ele) {
        data.forEach((value, index) => {
            ele[index].innerHTML = `<img src="${value.srcImage}" alt="">
                                <h3>${value.title}</h3>
                                <span>${value.desc}</span>
                                <p>${value.price}</p>`
            // console.log(value.srcImage);
        })
    }

    //电视模块
    var TVlist = document.querySelector('.TV-list');
    var TVlink = TVlist.querySelectorAll('ul li a');
    // console.log(TVlink[0]);
    var TV1 = [
        {
            srcImage: "image/TV-1.webp",
            title: "小米全面屏电视65英寸 E65X",
            desc: '全面屏设计',
            price: "2999元 <del>3299元</del>",
        },
        {
            srcImage: "image/TV-2.webp",
            title: "全面屏电视E43K",
            desc: '全面屏设计，海量内容',
            price: "1349元 <del>1599元</del>",
        },
        {
            srcImage: "image/TV-3.webp",
            title: "小米MIX FOLD",
            desc: '大屏更享受',
            price: "3599元 <del>3999元</del>",
        },
        {
            srcImage: "image/TV-4.webp",
            title: "小米MIX FOLD",
            desc: '重磅新品福利特惠',
            price: "2999元 <del>3699元</del>",
        },
        {
            srcImage: "image/TV-5.webp",
            title: "小米MIX FOLD",
            desc: '一键操作，父母都爱用',
            price: "849元 <del>890元</del>",
        },
        {
            srcImage: "image/TV-6.webp",
            title: "小米MIX FOLD",
            desc: '新一代独立显卡',
            price: "6299元 <del>3299元</del>",
        },
        {
            srcImage: "image/TV-7.webp",
            title: "小米MIX FOLD",
            desc: '点火排烟，风随火动',
            price: "2298元",
        },
    ];
    var TV2 = [
        {
            srcImage: "image/TV-21.webp",
            title: "全面屏电视E43K",
            desc: '全面屏设计，海量内容',
            price: "1349元 <del>1599元</del>",
        },
        {
            srcImage: "image/TV-22.webp",
            title: "全面屏电视 55英寸E55X",
            desc: '潮流全面屏设计',
            price: "2299元 <del>2599元</del>",
        },
        {
            srcImage: "image/TV-23.webp",
            title: "小米电视4A 60英寸",
            desc: '人工智能语音系统,超高清画质',
            price: "3599元 <del>3999元</del>",
        },
        {
            srcImage: "image/TV-24.jpg",
            title: "小米电视4S 75英寸",
            desc: '4K HDR，人工智能语音',
            price: "2699元 <del>2799元</del>",
        },
        {
            srcImage: "image/TV-25.webp",
            title: "小米全面屏电视65英寸 E65X",
            desc: '全面屏设计',
            price: "2999元 <del>3299元</del>",
        },
        {
            srcImage: "image/TV-26.webp",
            title: "小米全面屏电视E32C",
            desc: '全面屏设计，人工智能系统',
            price: "949元 <del>1099元</del>",
        },
        {
            srcImage: "image/TV-27.webp",
            title: "Redmi智能电视A55",
            desc: '澎湃音效影院级体验',
            price: "2088元 <del>2199元</del>",
        },
    ];
    getData(TV1, TVlink);


    //3.数据更新
    var ul = document.querySelector('.tab').querySelector('ul');
    var span = ul.querySelectorAll('span')
    for (var i = 0; i < ul.children.length; i++) {
        ul.children[i].setAttribute('index', i)
        ul.children[i].addEventListener('mouseover', function () {
            for (var i = 0; i < span.length; i++) {
                span[i].className = '';
            }
            this.children[0].className = 'curent1';
            var index = this.getAttribute('index');
            index == 0 ? getData(TV1, TVlink) : getData(TV2, TVlink)
        })
    }
    //动画函数
    function animate(obj, target, callback) {
        //缓动动画
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        obj.times = setInterval(() => {
            if (obj.offsetLeft >= target) {
                clearInterval(obj.times);
                callback && callback();
            }
        }, 1000)
        obj.style.left = target + 'px'
        // obj.style.left = obj.offsetLeft + step + 'px'
    }
    //4.轮播图
    var bannerlist = document.querySelector('.banner-list');
    var ol = document.querySelector('.banner-img ol')
    // console.log(bannerlist.children[0].offsetWidth);
    const liWidth = bannerlist.children[0].offsetWidth;
    bannerlist.style.width = liWidth * (bannerlist.children.length + 1) + 'px';
    for (var i = 0; i < bannerlist.children.length; i++) {
        var li = document.createElement('li')
        ol.appendChild(li);
        li.setAttribute('index', i)
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'curent';
            var index = this.getAttribute('index');
            animate(bannerlist, -index * liWidth);
            num = index;
            cire = index;

        })
    }
    ol.children[0].className = 'curent';

    const prve = document.querySelector('.prve');
    const next = document.querySelector('.next');
    var li = bannerlist.children[0].cloneNode(true);
    bannerlist.appendChild(li)
    var num = 0;
    var cire = 0;
    let flat = true;
    next.addEventListener('click', function () {
        if (flat) {
            flat = false;
            num++;
            if (num == bannerlist.children.length - 1) {
                num = 0
            }
            animate(bannerlist, -num * liWidth, function () {
                flat = true;
            });
            cire++;
            if (cire == ol.children.length) {
                cire = 0
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[cire].className = 'curent';
        }
    })

    prve.addEventListener('click', function () {
        num--;
        if (num <= 0) {
            num = bannerlist.children.length - 2
        }
        animate(bannerlist, -num * liWidth);

        cire--;
        if (cire <= 0) {
            cire = ol.children.length - 1;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[cire].className = 'curent';
    })

    var time = setInterval(() => {
        next.click();
    }, 3000)
    bannerlist.addEventListener('mouseover', function () {
        clearInterval(time)
    })
    bannerlist.addEventListener('mouseout', function () {
        time = setInterval(() => {
            next.click();
        }, 3000)
    })

    //4.滑动秒杀
    const leftbtn = document.querySelector('.left-btn');
    const rightbtn = document.querySelector('.right-btn');
    var itemsUl = document.querySelector('.count-items');
    var index = 0
    rightbtn.addEventListener('click', function () {
        index++;
        if (index >= 2) {
            index = 1
        }
        var step = itemsUl.offsetLeft
        console.log(step);
        animate(itemsUl, -992 * index)

    })
    leftbtn.addEventListener('click', function () {
        index--;
        if (index <= 2) {
            index = 0
        }
        var step = itemsUl.offsetLeft
        console.log(step);
        animate(itemsUl, -992 * index)

    })

    //5.图片懒加载
    // const img = document.querySelectorAll('img')
    // console.log(img);
    // var arrImage = [];
    // for (var i = 0; i < img.length; i++) {

    // }



})
