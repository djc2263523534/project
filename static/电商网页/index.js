window.onload = function () {
    const ul = document.querySelector('.banner-img ul');
    const img = ul.querySelectorAll('img');
    const ol = document.querySelector('.banner-img ol')
    var num = 0;
    time();
    var times;
    function time() {
        times = setInterval(() => {

            num++;
            if (num >= ul.children.length) {
                num = 0;
            }
            ul.style.left = -560 * num + 'px';
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[num].className = 'curent';
        }, 2000);
    }

    ul.addEventListener('mouseover', function () {
        clearInterval(times)
    })
    ul.addEventListener('mouseout', function () {
        clearInterval(times);
        time();
    })


    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].setAttribute('index', i)
        ol.children[i].addEventListener('click', function () {
            let index = this.getAttribute('index');
            ul.style.left = -560 * index + 'px';
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'curent';
            num = index;
        })
    }










}