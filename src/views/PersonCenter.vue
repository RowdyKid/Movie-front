<template>

  <!--  主页面-->
  <el-main>
    <div class="font" style="display: flex; margin-left: 100px; min-height: 75vh; margin-right: 150px">
      <div style="width: 260px; background-color: #222; margin: 10px 10px 10px 20px; border-radius: 10px">
        <div style="text-align: center; padding-top: 25px">
          <el-icon color="#ffd04b"><ArrowLeftBold /></el-icon>
          <el-button style="padding-left: 5px; margin-bottom: 12px; color: #ffd04b; font-size: 16px" link @click="router.push('/home')">返回主页</el-button>
        </div>
        <ul style="margin-top: -5px">
          <li @click="changePagePath('myInfo' )" :class="pagePath === 'myInfo' ? 'menu-active' : ''"><el-icon class="menu-icon"><UserFilled /></el-icon> 个人资料</li>
          <li @click="changePagePath('accountSettings')" :class="pagePath === 'accountSettings' ? 'menu-active' : ''"><el-icon class="menu-icon"><Tools /></el-icon> 账号设置</li>
          <li><el-icon class="menu-icon"><QuestionFilled /></el-icon> 热门问题</li>
          <li><el-icon class="menu-icon"><PhoneFilled /></el-icon> 联系我们</li>
          <li @click="logout"><el-icon class="menu-icon"><RefreshLeft /></el-icon> 退出系统</li>
        </ul>
      </div>
      <div style=" flex: 1; margin: 10px 10px 10px 10px; background-color: #222; border-radius: 10px; width: calc(100vw - 350px)">
        <MyInfo v-if="pagePath === 'myInfo'"/>
        <AccountSettings v-if="pagePath === 'accountSettings'"/>
      </div>
    </div>

  </el-main>
</template>

<script setup>
import { UserFilled,Tools,QuestionFilled,PhoneFilled,RefreshLeft,ArrowLeftBold } from '@element-plus/icons-vue'
import MyInfo from "@/components/MyInfo.vue";
import AccountSettings from "@/components/AccountSettings.vue";
import router from "@/router";
import {inject} from "vue";
import {useRoute} from "vue-router";

const reload = inject('reload') // inject和父页面的provide成对出现(App.vue)
const route = useRoute()

const pagePath = route.query.page // 引用url参数：page

const changePagePath = (pagePath) => {
  router.push({query: {page: pagePath}}) // page参数更改(不能触发高亮和页面更改)
  route.query.page = pagePath // 可以更改但需再触发reload
  reload()
}

const logout = () => {
  localStorage.removeItem("user")
  router.push('/login')
}
</script>

<style scoped>

.font {
  color: white;
}

li {
  text-align: center;
  margin: 30px;
  cursor: pointer;
  font-size: 16px;
}

.menu-icon {
  font-size: 16px;
  margin-right: 5px;
  top: 2px;
}
</style>