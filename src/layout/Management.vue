<template>
  <div>
    <div style="height: 60px; line-height: 60px; border-bottom: 1px solid #ccc; background-color: white">
      <div style="display: flex">
        <div style="width: 200px; color: dodgerblue; font-weight: bold; padding-left: 30px; font-size: 20px">
          后台管理
        </div>
        <div style="flex: 1; display: flex">
          <div style="flex: 1"></div>
          <div style="width: 200px; text-align: right; padding-right: 40px">
            <el-dropdown>
              <div class="el-dropdown-link">
                <el-avatar :size="45" :src="user.avatar" style="margin-top: 8px"/>
                <span style="position: relative; margin-left: 10px; bottom: 15px; font-size: 15px">
                  <el-icon><ArrowDown/></el-icon>
                </span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>
                    <div>退出系统</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex">
      <div style="width: 200px; min-height: calc(100vh - 60px); border-right: 1px solid #ccc">
        <el-menu
            :default-active="'home'"
            class="el-menu-demo"
            style="border: none"
            router
        >
          <div>
            <div>
              <el-menu-item>
                <el-icon><Menu/></el-icon>
                <span>首页</span>
              </el-menu-item>
            </div>
            <div>
              <el-sub-menu>
                <template #title>
                  <el-icon><Setting/></el-icon>
                  <span>系统管理</span>
                </template>
                <div>
                  <el-menu-item>
                    <template #title>
                      <el-icon><User/></el-icon>
                      <span>用户管理</span>
                    </template>
                  </el-menu-item>
                </div>
              </el-sub-menu>
            </div>
          </div>
        </el-menu>
      </div>

      <div style="flex: 1; padding: 10px">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ArrowDown, Menu, Setting, User} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {computed} from "vue";
const store = useStore();
const user = computed(() => store.state.userData.obj);

</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>