<template>
  <div class="track-search">
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
  padding: 20px 4%;
  min-height: inherit;
  .page-title {
    text-align: center;
    padding: 8px 0 16px 0;;
    font-size: 24px;
    color: #555;
  }
}
</style>
