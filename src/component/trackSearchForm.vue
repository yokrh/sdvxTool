<template>
  <div>
    <form class="track-search-form" @submit.prevent="onSubmit">
      <dl class="levels">
        <dt class="title">LEVEL</dt>
        <dd class="level" v-for="level in levels">
          <label><input type="radio" name="level" :value="level" v-model="selectedLevel" @change="updateTracks(level)">{{level}}</label>
        </dd>
      </dl>
      <dl class="difficulties">
        <dt class="title">難易度</dt>
        <dd class="difficulty" v-for="difficulty in difficulties">
          <label><input type="checkbox" name="hard" :value="difficulty" v-model="selectedDifficulties"  @change="filterTracks">{{difficulty}}</label>
        </dd>
      </dl>
      <input class="artist-name-input" type="text" placeholder="アーティスト" v-model="inputArtistName" @keyup="filterTracks" @change="filterTracks" />
      <input class="track-name-input" type="text" placeholder="曲名" v-model="inputTrackName" @keyup="filterTracks" @change="filterTracks" />
    </form>

    <ul class="tracks">
      <template v-if="tracks.length > 0">
        <li class="track" v-for="track in tracks">
          <a :href="'http://www.sdvx.in' + track.path + '.htm'" target="_blank">{{track.name + ' [' + track.difficulty + ']'}}</a>
        </li>
      </template>
      <template v-else-if="selectedLevel">
        <li class="track">
          <a :href="'http://www.sdvx.in/sort/sort_' + selectedLevel + '.htm'" target="_blank">Level {{selectedLevel}} トップ</a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import trackMixin from './mixin/trackMixin.js';
export default {
  mixins: [
    trackMixin
  ],
  methods: {
    // 検索時処理
    onSubmit() {
      window.scrollTo(0, 500);
      document.activeElement.blur();
    }
  }
};
</script>

<style scoped>
  .track-search-form {
    .levels, .difficulties {
      padding: 4px 2%;
      background-color: #fcf8ff;
      margin-bottom: 8px;
      .title {
        padding: 8px 4px;
        font-size: 12px;
        font-weight: bold;
        color: #555;
      }
    }
    .levels {
      .level {
        display: inline-block;
        padding-left: 8%;
        width: 25.3%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .difficulties {
      .difficulty {
        display: inline-block;
        padding-left: 3%;
        width: 22%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .track-name-input, .artist-name-input {
      margin-top: 8px;
      padding: 4px 3%;
      width: 94%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      border: none;
      border-bottom: 1px solid #bebebe;
    }
  }
  .tracks {
    padding-top: 16px;
    .track {
      padding: 8px 4%;
      font-size: 12px;
      &:first-child {
        padding-top: 16px;
      }
    }
  }
</style>
