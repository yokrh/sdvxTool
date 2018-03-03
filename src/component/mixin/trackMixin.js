export default{
  data() {
    return {
      levels: [15, 16, 17, 18, 19, 20],
      difficulties: ['NOV', 'ADV', 'EXH', 'MXM', 'INF', 'GRV', 'HVN'],
      selectedLevel: 18,
      selectedDifficulties: ['NOV', 'ADV', 'EXH', 'MXM', 'INF', 'GRV', 'HVN'],
      inputTrackName : '',
      inputArtistName : '',
      officialTrackData: {},  // trackのtitleとartist紐付け用データ
      allTracks: [],  // trackデータ
      tracks: []  // 表示するtrackデータ
    };
  },
  mounted() {
    this.updateTracks(this.selectedLevel);
    this.fetchOfficialTrackData()
    .then((res) => {
      this.officialTrackData = res;
    });
  },
  methods: {
    // trackを更新
    updateTracks(selectedLevel) {
      this.fetchTracks(selectedLevel)
      .then((res) => {
        this.allTracks = res;
        this.filterTracks();
      })
    },
    // 指定したlevelの全trackを取得
    fetchTracks(selectedLevel) {
      return new Promise((resolve) => {
        const self = this;
        const url = 'data/' + selectedLevel + '.json';
        fetch(url).then(res => res.json())
        .then((json) => {
          let tracks = [];
          for (const key in json) {
            const track = json[key];
            tracks.push(
              {
                "id": track.id,
                "name": track.name,
                "level": track.level,
                "difficulty": track.difficulty,
                "ver": track.ver,
                "path":track.path
              }
            );
          }
          resolve(tracks);
        });
      });
    },
    // trackのtitleとartist紐付け用データを取得
    fetchOfficialTrackData() {
      return new Promise((resolve) => {
        const url = 'data/officialTrackData.json';
        fetch(url).then(res => res.json())
        .then((json) => {
          resolve(json);
        });
      });
    },
    // 全trackの中から指定したname, level, difficultyのtrackを表示用に抽出
    filterTracks() {
      if (!this.inputTrackName && !this.inputArtistName) {
        this.tracks = [];
        return
      }

      this.tracks = this.allTracks;
      // name
      if (this.inputTrackName) {
        this.tracks = this.tracks.filter((track) => track.name.toLowerCase().includes(this.inputTrackName.toLowerCase()));
      }
      // level
      if (this.selectedLevel) {
        this.tracks = this.tracks.filter((track) => track.level == this.selectedLevel);
      }
      // difficulty
      if (this.selectedDifficulties.length > 0) {
        const self = this;
        this.tracks = this.tracks.filter((track) => {
          return self.selectedDifficulties.some((selectedDifficulty) => track.difficulty == selectedDifficulty);
        });
      }
      // artist
      if (this.inputArtistName) {
        this.tracks = this.tracks.filter((track) => {
          let name = track.name;
          // 譜面サイトと公式サイトの差異を吸収
          if (name === "Lachryma《Re:Queen'M》") name = 'Lachryma《Re:Queen’M》';
          if (name === "gigadelic (かめりあ's ''The TERA'' RMX)") name = "gigadelic (かめりあ's \"The TERA\" RMX)";
          if (name === "Electric ''Sister'' Bitch") name = "Electric \"Sister\" Bitch";
          if (name === 'ケムマキ underground') name = 'ケムマキunderground';
          if (name === 'GAMBOL(dfk SLC rmx)') name = 'GAMBOL (dfk SLC rmx)';
          if (name === '上海紅茶館～ Chinese Tea Orchid Remix ') name = '上海紅茶館 ～ Chinese Tea Orchid Remix';
          if (name === 'Lost Wing at.0') name = 'Lost wing at.0';
          if (name === '恋する☆宇宙戦争っ!! あばばばみっくす') name = '恋する☆宇宙戦争っ！！ あばばばみっくす';
          // 公式データにそもそもないもの（2018/03/03）
          if (name === 'I') return '黒魔'.includes(this.inputArtistName);
          if (name === 'Last Resort') return false;
          if (name === 'Metamorphobia') return false;
          if (name === 'Help me, CODYYYYYY!!') return false;
          if (name === 'Chloé') return false;
          if (name === '恋はどう？モロ◎波動OK☆方程式!!') return false;

          const officialTrackData = this.officialTrackData[name];
          if (!officialTrackData) {
            // console.log('no official track data with : ', name);
            return false;
          }

          let artist = officialTrackData.artist;
          if (!artist) {
            // console.log('no artist with : ', name);
            return false;
          }

          return artist.toLowerCase().includes(this.inputArtistName.toLowerCase());
        });
      }
    }
  }
};
