export default{
  data() {
    return {
      levels: [15, 16, 17, 18, 19, 20],
      difficulties: ['NOV', 'ADV', 'EXH', 'MXM', 'INF', 'GRV', 'HVN'],
      selectedLevel: 18,
      selectedDifficulties: ['NOV', 'ADV', 'EXH', 'MXM', 'INF', 'GRV', 'HVN'],
      inputTrackName : '',
      allTracks: [],
      tracks: []
    };
  },
  mounted() {
    this.fetchTracks();
  },
  methods: {
    // 指定したlevelの全trackを取得
    fetchTracks() {
      this.allTracks = [];
      const url = 'data/' + this.selectedLevel + '.json';
      const self = this;
      fetch(url).then(function(res) {
        return res.json();
      }).then(function(json){
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
        self.allTracks = tracks;
        self.filterTracks();
      });
    },
    // 全trackの中から指定したname, level, difficultyのtrackを抽出
    filterTracks() {
      this.tracks = [];
      if (this.inputTrackName) {
        this.tracks = this.allTracks;
        // name
        this.tracks = this.tracks.filter((track) => track.name.toLowerCase().includes(this.inputTrackName.toLowerCase()));
        if (this.selectedLevel) {
          // level
          this.tracks = this.tracks.filter((track) => track.level == this.selectedLevel);
        }
        if (this.selectedDifficulties.length > 0) {
          const self = this;
          // difficulty
          this.tracks = this.tracks.filter(function(track){
            return self.selectedDifficulties.some((selectedDifficulty) => track.difficulty == selectedDifficulty);
          });
        }
      }
    }
  }
};
