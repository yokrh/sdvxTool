<template>
  <div>
    <form class="track-quiz-form" @submit.prevent>
      <dl class="levels">
        <dt class="title">LEVEL</dt>
        <dd class="level" v-for="level in levels">
          <label><input type="radio" name="level" :value="level" v-model="selectedLevel" @change="fetchTracks">{{level}}</label>
        </dd>
      </dl>
      <dl class="difficulties">
        <dt class="title">難易度</dt>
        <dd class="difficulty" v-for="difficulty in difficulties">
          <label><input type="checkbox" name="hard" :value="difficulty" v-model="selectedDifficulties"  @change="filterTracks">{{difficulty}}</label>
        </dd>
      </dl>
      <input class="track-name-input" type="text" placeholder="楽曲を選択" v-model="inputTrackName" @keyup="filterTracks" @change="filterTracks" />
    </form>

    <ul class="tracks" v-if="tracks.length > 0">
      <li class="track" v-for="track in tracks.slice(0, 10)" @click="onSelectTrack(track)">
        {{track.name + ' [' + track.difficulty + ']'}}
      </li>
    </ul>
  </div>
</template>

<script>
import trackMixin from './mixin/trackMixin.js';
export default {
  mixins: [
    trackMixin
  ],
  props: ['value'],  // for v-model
  methods: {
    onSelectTrack(track) {
      this.tracks = [];
      this.inputTrackName = `${track.name} [${track.difficulty}]`;

      const quizAnswerUrl = `http://www.sdvx.in${track.path}.htm`;
      this.$emit('input', quizAnswerUrl);  // for v-model
    }
  }
};
</script>

<style scoped>
  .track-quiz-form {
    .levels {
      padding: 8px 2%;
      .title {
        padding: 8px 0;
        font-size: 12px;
      }
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
      padding: 4px 2%;
      .title {
        padding: 8px 0;
        font-size: 12px;
      }
      .difficulty {
        display: inline-block;
        padding-left: 3%;
        width: 22%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .track-name-input {
      margin-top: 16px;
      padding: 4px 3%;
      width: 100%;
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      color: #666;
      border: 1px solid #aaa;
      border-radius: 2px;
      box-sizing: border-box;
    }
  }
  .tracks {
    padding-bottom: 16px;
    .track {
      padding: 8px 4%;
      font-size: 12px;
      color: #1a0dab;
      &:first-child {
        padding-top: 16px;
      }
    }
  }
</style>
