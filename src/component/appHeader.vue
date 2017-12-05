<template>
  <nav class="app-header">
    <ul class="tabs">
      <li class="tab">
        <router-link to="/">
          <span class="icon-search"></span>Search
        </router-link>
      </li>
      <li class="tab">
        <router-link to="/weekly">
          <span class="icon-weekly"></span>Weekly
        </router-link>
      </li>
      <li class="tab">
        <router-link to="/links">
          <span class="icon-link"></span>Links
          </router-link>
      </li>
    </ul>
  </nav>
</template>

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
  .icon-link {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 16px auto;
    background-position: 4px 2px;
    background-repeat: no-repeat;
    vertical-align: middle;
    background-image: inline("../image/icon-link.png");
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
  .tabs {
    border-bottom: 2px solid #dedede;
    .tab {
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      width: 33.3%;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      border: 1px solid #efefef;
    }
  }
}
</style>
