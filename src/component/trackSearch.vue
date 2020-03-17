<template>
  <div class="track-search">
    <span class="last-updated">Last updated: 2020/02/24</span>
    <h1 class="page-title">SDVX譜面検索</h1>
    <track-search-form></track-search-form>
  </div>
</template>

<script>
import trackSearchForm from './trackSearchForm.vue';
export default {
  components: {
    'track-search-form': trackSearchForm
  }
};
</script>

<style scoped>
.track-search {
  position: relative;
  padding: 8px 4% 20px 4%;
  min-height: inherit;
  .last-updated {
    position: absolute;
    right: 12px;
    font-size: 10px;
    color: #888;
  }
  .page-title {
    text-align: center;
    padding: 32px 0;
    font-size: 24px;
    color: #555;
  }
}
</style>
