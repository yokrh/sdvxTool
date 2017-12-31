<template>
  <nav class="app-header">
    <el-menu :default-active="activeIndex1" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">
          <span class="icon-search"></span>Search
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/weekly">
          <span class="icon-weekly"></span>Weekly
        </router-link>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">Others</template>
        <el-menu-item index="3-1">
          <router-link to="/quiz">
            <span class="icon-quiz"></span>Quiz
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-2">
          <router-link to="/links">
            <span class="icon-link"></span>Links
          </router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </nav>
</template>

<script>
import Vue from 'Vue'
import Menu from '../../node_modules/element-ui/lib/menu'
import Submenu from '../../node_modules/element-ui/lib/submenu'
import MenuItem from '../../node_modules/element-ui/lib/menu-item'
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
</script>

<style scoped>
.app-header {
  margin-bottom: 1px;
  .icon-search {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-search.png");
  }
  .icon-twitter {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-twitter.png");
  }
  .icon-weekly {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-weekly.png");
  }
  .icon-quiz {
    display: inline-block;
    width: 36px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-quiz.png");
  }
  .icon-link {
    display: inline-block;
    width: 36px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-link.png");
  }
  .el-submenu .el-menu-item {
    min-width: 0;
    margin-left: 4px;
  }
  .el-menu--horizontal .el-menu-item, .el-menu--horizontal .el-submenu {
    width: 33%;
    padding: 0;
    text-align: center;
    > div, > a {
      display: block;
    }
  }
}
</style>
