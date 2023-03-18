<template>
  <div class="background"></div>

  <div class="form-box">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" status-icon>
      <h2 style="text-align: center; color: white">注 册</h2>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" :prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name" placeholder="请设置昵称" :prefix-icon="EditPen"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" show-password placeholder="请输入密码" :prefix-icon="Lock"
                  autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item prop="confirm">
        <el-input v-model="form.confirm" show-password placeholder="请确认密码" :prefix-icon="Lock"
                  autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" :prefix-icon="Message"></el-input>
      </el-form-item>
      <div style="margin-bottom: 0.83em">
        <el-button style="width: 100%" type="primary" @click="register">注 册</el-button>
      </div>
      <div style="text-align: right">
        <el-button type="primary" link @click="router.push('/login')">已有账号？前往登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {User, Lock, EditPen, Message} from '@element-plus/icons-vue'
import router from "@/router";
import request from "@/utils/request";
import {ElMessage} from "element-plus";

const form = reactive({})
const ruleFormRef = ref()
const time = ref(0)
const interval = ref(-1)

const confirmPassword = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请确认密码'))
  }
  if (form.password != value) {
    callback(new Error('两次输入密码不一致'))
  }
  callback()
}

const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
const checkEmail = (rule, value, callback) => {
  if (!reg.test(value)) {  // test可以校验你的输入值
    return callback(new Error('邮箱格式不合法'));
  }
  callback()
}

const rules = reactive({
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
  ],
  name: [
    {max: 10, message: '昵称长度不能大于10', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 8, message: '长度需在3~8之间', trigger: 'blur'},
  ],
  confirm: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {validator: confirmPassword, trigger: 'blur'},
    {min: 3, max: 8, message: '长度需在3~8之间', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请验证邮箱', trigger: 'blur'},
    {validator: checkEmail, trigger: 'blur'},
  ],
  emailCode: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
  ]
})

const register = () => {
  ruleFormRef.value.validate(valid => {
    // 当valid == true 就可以调用接口了
    if (valid) {
      request.post("/register", form).then(res => {
        if (res.code == '200') {
          ElMessage.success('注册成功')
          router.push('/login')
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}

</script>

<style scoped>
.form-box {
  width: 400px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 0 10px -2px rgba(0, 0, 0, .5);
  background: rgba(255, 255, 255, 0.1);
  padding: 50px;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
  background-image: url("public/background1.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;

  min-width: 900px;
  min-height: 1000px;

  justify-content: center;
  align-items: center;
}

</style>