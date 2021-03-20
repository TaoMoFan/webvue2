<template>
<div class="form-group" style="width:100%; text-align:center">
    <h3 class="sign-title">登 录</h3>
            <el-form :model="loginForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-col :span="4" :offset="10">
                    <el-input
                            size="mini"
                            v-model="loginForm.username"
                            autocomplete="off"
                            placeholder="用户名"
                            prefix-icon="el-icon-user-solid"
                    ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item prop="password">
                    <el-col :span="4" :offset="10">
                    <el-input
                    size="mini"
                            type="password"
                            v-model="loginForm.password"
                            autocomplete="off"
                            placeholder="密码"
                            prefix-icon="el-icon-lock"
                    ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm" id="login-btn">登 录</el-button>
                    <el-button type="primary" @click="checkForm" id="login-btn">注 册</el-button>
                </el-form-item>
        </el-form>
</div>
</template>

<script>
export default {
    name: 'log',
    data: function () {
        return {
          loginForm: {
              username: '',
              password: ''
          },
          userToken: '',
          rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                 }
        }
    },
    methods: {
        submitForm () {
             let v = this
             console.log(this.loginForm)
             this.$axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8080' + '/user/login',
                    data: {
                        'username': v.loginForm.username,
                        'password': v.loginForm.password
                    }
             }).then(function (res) {
                    console.log(res.data)
                    // v.userToken = 'Bearer ' + res.data.token
                    // 将用户token保存到vuex中
                    // v.changeLogin({ Authorization: v.userToken })
                    if (res.data == '1') {
                        v.$router.push('/message')
                        v.$message('登录成功')
                    } else {
                       v.$message('密码或用户名错误')
                    }
                }).catch(function (err) {
                    console.log('err', err)
                    v.$message('密码或用户名错误')
                })
            }
        }
    }
</script>

<style scoped>
.form-group {
    .el-input {
      width: 1200px;
    }
}
</style>
