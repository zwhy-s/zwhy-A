$(function () {
    // 登录和注册的切换
    $('.reg_link').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show();
    })
    $('.login_link').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show()
    })
    //表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 密码表单验证
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证确认密码
        re_pwd: function (value) {
            //获取第一次输入值value
            var pwd = $('#pwd_ipt').val();
            // console.log(pwd);
            // console.log(value);
            //判断两次是否一致
            if (pwd !== value) {
                return '两次密码不一致！请重新输入'
            }
        }
    })
    var layer = layui.layer
    var form = layui.form
    // 发起登录用户的Ajax请求
    $('.login_btn').on('click', function (e) {
        e.preventDefault();
        var data = {
            username: $(".layui-form-item [name = user]").val(),
            password: $(".layui-form-item [name = password]").val()
        }
        console.log(data);
        $.post('/api/login', data, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('登陆失败！')
            }
            layer.msg('登陆成功！')
            localStorage.setItem('token', res.token);
            location.href = 'index.html'
        })
    })
    // 发起注册用户的Ajax请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // console.log('ok');
        var data = {
            username: $("#form_reg [name = user]").val(),
            password: $("#form_reg [name = password]").val()
        }
        // console.log(data);
        $.post('/api/reguser',data,function(res){
            // console.log(res);
            if (res.status!== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('.login_link').click()
        })
    })
})