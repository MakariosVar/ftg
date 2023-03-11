<template>
  <div :class="BackGroundClass" style="height: 95vh; width: 95vw;">
    <RouterView 
      @music="Music"
      @setVolume="setVolume"
      @setSfxVolume="setSfxVolume"
      @reset="reset"
      @darkTheme="darkTheme"
      @sfxMute="sfxMute"
      @onGame="CheckIfRoundsRuns"
      :darkThemeOn="this.darkThemeOn"
      :musicVolume="this.musicVolume"
      :music="MUSIC"
      :PAUSED="PAUSED"
      :sfxVolume="sfxVolume"
      :sfxMuted="sfxMuted"
      @sfx="sfx"
      >
    </RouterView>
    <AudiosComponent
      :sfxInput="this.sfxInput"
      :sfxVolume="sfxVolume"
      :sfxMuted="sfxMuted"
      :musicVolume="musicVolume"
      @done="resetSfx"
    />
  </div>
</template>

<style>
  @font-face {
    font-family: "OldSport01CollegeNcv";
    src: local("OldSport01CollegeNcv"),   url(./assets/fonts/OldSport01CollegeNcv-aeGm.ttf) format("truetype");
    }

@font-face {
  font-family: "TrumpTownPro";
  src: local("TrumpTownPro"),   url(./assets/fonts/TrumpTownPro.otf) format("truetype");
}

@font-face {
  font-family: "MythicalGarden-Fat";
  src: local("MythicalGarden-Fat"),   url(./assets/fonts/mythicalGarden/MythicalGarden-Fat.otf) format("truetype");
}

@font-face {
  font-family: "CfDots521Regular";
  src: local("CfDots521Regular"),   url(./assets/fonts/CfDots521Regular-0169.ttf) format("truetype");
}

@font-face {
  font-family: "NCAAUCLABruins2017Standard";
  src: local("NCAAUCLABruins2017Standard"),   url(./assets/fonts/NCAAUCLABruins2017Standard.otf) format("truetype");
}
</style>
<script>
import AudiosComponent from './components/AudiosComponent.vue'
import {GOOGLE_PLAY_CLIENT_ID} from './main.js'

const gapi = window.gapi

export default {
  components: {
    AudiosComponent
  },
  data () {
    return {
      BackGroundClass: '',
      MUSIC: '',
      musicVolume: 0.5,
      sfxVolume: 1,
      sfxMuted: false,
      PAUSED: false,
      darkThemeOn: false,
      sfxInput: '',
      onGame: false
    }
  },
  created() {
    console.log(GOOGLE_PLAY_CLIENT_ID)
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: GOOGLE_PLAY_CLIENT_ID,
      }).then(function() {
          let auth2 = gapi.auth2.getAuthInstance();
          this.signIn(auth2);
        });
    });
  },
  methods: {
    signIn(auth2) {
      auth2.getAuthInstance().signIn()
        .then((user) => {
          const userId = user.getBasicProfile().getId();
          const userName = user.getBasicProfile().getName();
          console.log(userId)
          alert(userId)
          alert(userName)
          console.log(userName)
        })
    },
    handleBackButton() {
      alert('Dont Leave, Please');
      // Prevent the default behavior (i.e., closing the application)
      return false;
    },
    sfxMute (e) {
      if (e == true){
        this.sfxMuted = false;
      } else {
        this.sfxMuted = true;
      }
    },
    resetSfx () {
      this.sfxInput = ''
    },
    sfx (event){
      this.sfxInput = event;
    },
    onDeviceReady () {
      document.addEventListener("pause", this.onPause, false);
      document.addEventListener("resume", this.onResume, false);
      document.addEventListener("menubutton", this.onMenuKeyDown, false);
    },
    darkTheme () {
      this.darkThemeOn == true ? this.darkThemeOn = false : this.darkThemeOn = true;
      this.darkThemeOn == true ? this.BackGroundClass = 'DarkTheme' : this.BackGroundClass = '';
    },
    onPause () {
      this.PAUSED = true;
      this.sfxInput = 'pause-round';
      return false;
    },
    CheckIfRoundsRuns (e) {
      this.OnGame = e;
    },
    onResume () {
      this.PAUSED = false;
      if (this.MUSIC == true && this.OnGame) {
        this.sfxInput = 'resume-round'
      }
      else if (this.MUSIC == true) {
        this.Music(true);
      }
    },
    onMenuKeyDown () {
      this.onPause();
    },
    Music (e) {
      if (e == true && !this.PAUSED){
        // alert('music start')
        this.MUSIC = true;
        this.sfxInput = 'startMusic'
      } else {
        // alert('music stoped')
        this.MUSIC = false;
        this.sfxInput = 'stopMusic'
      }
    },
    setSfxVolume (e) {
      this.sfxVolume = e;
    },
    setVolume (e) {
      this.musicVolume = e;
    },
    reset() {
      localStorage.clear();
    }
  },
  mounted () {
    document.addEventListener('backbutton', this.handleBackButton, false);
    document.addEventListener(
      'pause', 
      this.onDeviceReady()
    );
  },
  

}
</script>

<style>
.DarkTheme {
  background: linear-gradient(217deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 70.71%),
  linear-gradient(127deg, rgba(141, 16, 16, 0.726), rgba(0, 0, 0, 0) 90.71%),
  linear-gradient(90deg, rgba(35, 10, 66, 0.8), rgb(57, 4, 149) 50.71%);
}
</style>