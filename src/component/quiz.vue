<template>
  <dl class="quiz">
    <dt class="title">クイズ</dt>
    <dd class="quiz" v-for="quiz in quizs">
      <a :href="'http://www.sdvx.in' + quiz.answerPath + '.htm'" target="_blank">
        <div class="image-container">
          <img :src="quiz.imageSrc" alt="" />
        </div>
      </a>
    </dd>
    <dd class="upload">
      <input type="file" name="image" accept="image/*" @change="addQuiz">
    </dd>
  </dl>
</template>

<script>
import AWS from 'aws-sdk';
export default{
  data() {
    return {
      quizs: []
    };
  },
  mounted() {
    this.fetchQuizs();
  },
  methods: {
    // クイズ追加
    addQuiz(e) {
      console.log("DEBUG : addQuiz() !");
      // 入力ファイル取得
      const file = e.target.files[0];

      // 入力ファイルのデータ（base64）取得、S3アップロード、成功後にリストに追加
      const self = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const filename = 'quiz_'+ Date.now() + '_' + file.name;
        const filetype = file.type;

        // AWS設定
        const REGION = 'ap-northeast-1';
        const IDENTITY_POOL_ID = 'ap-northeast-1:f2418ccb-5acb-4223-ae10-49191f31c2a6';
        const BUCKET = 'sdvx-quiz';
        AWS.config.update({
          region: REGION,
          credentials: new AWS.CognitoIdentityCredentials({IdentityPoolId: IDENTITY_POOL_ID})
        });
        const s3 = new AWS.S3({params: {Bucket: BUCKET}});

        // S3にアップロード
        s3.putObject({Key: filename, ContentType: filetype, Body: file, ACL: 'public-read'}, function(err, data) {
          if (err) { alert('保存失敗 : ' + err); }
          if (data !== null) { 
            alert('保存成功!');
            // リストに追加
            const imageSrc = reader.result;
            const answerPath = '';
            const quiz = {imageSrc, answerPath};
            self.quizs.push(quiz);
          }
        });
      }

    },
    // クイズ取得
    fetchQuizs() {
      console.log("DEBUG : fetchQuiz() !");
      const self = this;
    }
  }
};
</script>

<style scoped>
</style>
