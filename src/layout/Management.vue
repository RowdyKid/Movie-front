<template>
  <div>
    <div style="height: 60px; line-height: 60px; border-bottom: 1px solid #ccc; background-color: white">
      <div style="display: flex">
        <div style="width: 200px; color: dodgerblue; font-weight: bold; padding-left: 30px; font-size: 20px">
          电影推荐系统
        </div>
        <div style="flex: 1; display: flex">
          <div style="flex: 1"></div>
          <div style="width: 200px; text-align: right; padding-right: 40px">
            <el-dropdown>
              <div class="el-dropdown-link">
                <el-avatar :size="45" src="" style="margin-top: 8px"/>
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
            :default-active="'welcome'"
            :default-openeds="['1']"
            class="el-menu-demo"
            style="border: none"
            router
        >
          <div>
            <div>
              <el-menu-item :index="'welcome'">
                <el-icon><Menu/></el-icon>
                <span>首页</span>
              </el-menu-item>
            </div>
            <div>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><Setting/></el-icon>
                  <span>系统管理</span>
                </template>
                <div>
                  <el-menu-item :index="'user'">
                    <template #title>
                      <el-icon><User/></el-icon>
                      <span>个人中心</span>
                    </template>
                  </el-menu-item>
                  <el-menu-item :index="'movie'">
                    <template #title>
                      <el-icon><Film/></el-icon>
                      <span>电影管理</span>
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

import {ArrowDown, Film, Menu, Setting, User} from "@element-plus/icons-vue";
import {RouterView} from 'vue-router'

</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>