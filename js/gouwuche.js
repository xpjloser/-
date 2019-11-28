$(function() {
    // 全选功能
    $(".checkbox_all").change(function() {
        $(".checkbox_dianjia,.checkbox_item").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".change,.change_one,.danxuan").addClass("xuanzhong");
        } else {
            $(".change,.change_one,.danxuan").removeClass("xuanzhong");
        }
    });
    // 选择框按钮   checkbox0=checkbox_dianjia  
    $(".checkbox_dianjia").change(function() {
        $(this).parents(".dianpu").siblings("xpj_chanpin").find(".checkbox_item").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {

            $(this).parents(".change_one").addClass("xuanzhong");
        } else {
            $(this).parents(".change_one").removeClass("xuanzhong");
        }
        if ($(".checkbox_dianjia:checked").length === $(".checkbox_dianjia").length) {
            $(".checkbox_all").prop("checked", true);
        } else {
            $(".checkbox_all").prop("checked", false);
        }
        if ($(".checkbox_all").prop("checked")) {
            $(".change").addClass("xuanzhong");
        } else {
            $(".change").removeClass("xuanzhong");
        }
        // 点击商家前面按钮下面商品选择与取消
        if ($(this).prop("checked")) {
            $(this).parents(".dianpu").siblings(".xpj_chanpin").find(".danxuan").addClass("xuanzhong");
        } else {
            $(this).parents(".dianpu").siblings(".xpj_chanpin").find(".danxuan").removeClass("xuanzhong");
        }
    });
    // 点击商品前按钮，选择最大的全选按钮与店家按钮
    $(".checkbox_item").change(function() {
        if ($(this).parents(".xpj_box").find(".checkbox_item:checked").length === 2) {
            $(this).parent().parent().siblings(".dianpu").find(".checkbox_dianjia").prop("checked", true);
        } else {
            $(this).parent().parent().siblings(".dianpu").find(".checkbox_dianjia").prop("checked", false);
        }

        if ($(this).prop("checked")) {
            $(this).parent().addClass("xuanzhong");
        } else {
            $(this).parent().removeClass("xuanzhong");
        }
        if ($(this).parents(".xpj_chanpin").siblings(".dianpu").find(".checkbox_dianjia").prop("checked")) {

            $(this).parents(".xpj_chanpin").siblings(".dianpu").find(".change_one").addClass("xuanzhong");
        } else {
            $(this).parents(".xpj_chanpin").siblings(".dianpu").find(".change_one").removeClass("xuanzhong");
        }
        // 点击所有小商品按钮选择全选按钮
        if ($(".checkbox_item:checked").length === $(".checkbox_item").length) {
            $(this).parents(".xpj_box").siblings(".tab").find(".checkbox_all").prop("checked", true);
            $(this).parents(".xpj_box").siblings(".tab").find(".change").addClass("xuanzhong")
        } else {
            $(this).parents(".xpj_box").siblings(".tab").find(".checkbox_all").prop("checked", false);
            $(this).parents(".xpj_box").siblings(".tab").find(".change").removeClass("xuanzhong")
        }
    });

    // 商品后面的删除按钮
    $(".del").click(function() {
        // 删除的是当前的商品 
        $(this).parents(".xpj_chanpin").remove();
        getSum();
    });
    // 删除选中的商品
    $(".xpj_shanchu").click(function() {
        // 删除的是小的复选框选中的商品
        $(".checkbox_item:checked,.checkbox_dianjia:checked").parents(".xpj_chanpin,.xpj_box").remove();
        getSum();
    });
    // 商品后面删除按钮
    var divs = document.querySelectorAll(".xpj_chanpin");
    var flag = false;
    var startX = 0;
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('touchstart', function(e) {
            startX = e.targetTouches[0].pageX;
        });
    }
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('touchmove', function(e) {

            var moveX = e.targetTouches[0].pageX - startX;

            if (moveX < 0) {
                this.style.transition = "all 0.5s";
                this.style.transform = "translateX(-80px)";
                flag = true;
            }
            if (flag) {
                if (moveX > 0) {
                    this.style.transition = "all 0.5s";
                    this.style.transform = "translateX(0)";
                }
            }
            e.preventDefault();
        });
    }
    // 上边的删除按钮
    var tab = document.querySelector('.tab');
    var count = document.querySelector(".heji")
    var btn1 = document.querySelector(".xpj_shengcheng");
    var btn2 = document.querySelector(".xpj_jiesuan");
    var btn3 = document.querySelector(".xpj_shanchu");
    var startY = 0;
    var flags = false;
    tab.addEventListener('touchstart', function(e) {
        startY = e.targetTouches[0].pageX;
    });
    tab.addEventListener('touchmove', function(e) {

        var moveY = e.targetTouches[0].pageX - startY;

        if (moveY < 0) {
            this.style.transition = "all 0.5s";
            this.style.transform = "translateX(-150px)";
            count.className = "heji display";
            btn1.className = 'xpj_shengcheng display';
            btn2.className = 'xpj_jiesuan display';
            btn3.style.display = "block";
            flags = true;
        }
        if (flags) {
            if (moveY > 0) {
                this.style.transition = "all 0.5s";
                this.style.transform = "translateX(0)";
                count.className = "heji";
                btn1.className = 'xpj_shengcheng';
                btn2.className = 'xpj_jiesuan';
                btn3.style.display = "none";
                flags = true;
            }
        }
        e.preventDefault();
    });
    // 可以禁止用户随意拖动页面
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
    // 加
    $(".xpj_jia").click(function() {
        var n = $(this).siblings(".shuliang").val();
        n++;
        $(this).siblings(".shuliang").val(n);

        var p = $(this).parents(".xpj_num").siblings(".center").children("span").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        var price = (p * n);
        // 小计模块 

        $(this).parents(".xpj_box").siblings(".tab").children(".heji").children("b").html(price);

        getSum();
    });
    // 减
    $(".xpj_jian").click(function() {
        var n = $(this).siblings(".shuliang").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".shuliang").val(n);

        var p = $(this).parents(".xpj_num").siblings(".center").children("span").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        var price = (p * n);
        // 小计模块 
        $(this).parents(".xpj_box").siblings(".tab").children(".heji").children("b").html(price);

        getSum();
    });
    // 直接修改输入框值，总价发生改变
    $(".shuliang").change(function() {
        var n = $(this).val();
        var p = $(this).parent().siblings(".center").children("span").html();
        console.log(p);
        p = p.substr(1);
        $(this).parents(".xpj_box").siblings(".tab").find(".heji").find("b").html(p * n);
        getSum();
    });

    // 计算总量模块

    getSum();

    function getSum() {
        var count = 0; // 计算总件数
        var money = 0; // 总价
        // $(".shuliang").each(function(i, ele) {
        //     count += parseInt($(ele).val());
        // });
        // $(".xpj_jiesuan i").text(count);

        // console.log(count);
        var d = $(".xpj_box").children(".xpj_chanpin").children(".xpj_num").children(".shuliang").val();
        console.log(d);
        // d++;

        var q = $(".xpj_box").find(".xpj_chanpin").find(".xpj_num").find(".shuliang").val();
        // console.log(q);
        var danjia = $(".xpj_box").find(".xpj_chanpin").find(".center").find("span").html();
        danjia = danjia.substr(1);

        if ($(".change").hasClass("xuanzhong")) {

            $(".shuliang").each(function(i, ele) {
                count += parseInt($(ele).val());
            });
            $(".xpj_jiesuan i").text(count);
            console.log(count);

            $(".shuliang").each(function(i, ele) {
                money += parseInt($(ele).val() * danjia);
            });
            console.log(money);

            $(".heji b").text(money);
        }
        // if ($(".danxuan").hasClass("xuanzhong")) {
        //     $(".shuliang").each(function(i, ele) {
        //         money = d * danjia;
        //     });
        //     console.log(money);

        //     $(".shuliang").each(function(i, ele) {
        //         count += parseInt($(ele).val());
        //     });
        //     $(".xpj_jiesuan i").text(count);
        //     $(".heji b").text(money);
        // }

    }
});