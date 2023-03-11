<template>
  <div class="text-center h-100 d-flex flex-column justify-content-center align-items-center">
    <div>
      <img class="logoStart" :src="require('../assets/logo.png')" alt="">
      <br>
      <span class="Label ModeTitle">Game The Find</span>
    </div>
    <router-link style="color: black;" to="/modeselect" @click="start()">
    <div :class="startBtnClass" class="rounded-circle p-5" >
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg> 
    </div>
    </router-link>
    <div class="fixed-bottom pb-5">
      <a href="#" class="btn btn-outline-primary btn-sm" @click="this.$emit('reset', true); this.reset = true;">reset</a>
      <h5 v-if="reset" class="text-center text-success">reseted</h5>
    </div>
  </div>
</template>

<style scoped>
.logoStart {
  height: 25vh;
}

.Label {
  font-family: "TrumpTownPro";
  font-size: 2rem;
}
.darkThemeStartButton{
  border-style: solid;
  border-width: 3px;
}
.arcadeThemeStartButton{
  background-color: rgba(0, 0, 0, 0.15);
  border-style: solid;
  border-width: 5px;
  color: rgba(255, 0, 72, 0.689) ;
  text-shadow: 20px 20px #01139b;
  -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 8, 157, 1));
  filter: drop-shadow( 3px 3px 2px #01139d);
}
</style>
<script>
export default {
  name: 'Start-game',
  props: ['darkThemeOn'],
  data () {
    return {
      startBtnClass: 'arcadeThemeStartButton',
      themeText: 'Dark Theme',
      themeTextClass: 'btn-sm btn-outline-dark',
      reset: false,
    }
  },
  methods : {
    start() {
      this.$emit('sfx', 'mainButton')
      this.$emit('music', true)
      var nickname = localStorage.getItem('nickname');
      if( nickname == null) {
        this.$router.push('/profile')
      }
    },
    themeChange () {
      if (this.darkThemeOn == true) {
        this.startBtnClass  = 'arcadeThemeStartButton';
        this.themeText = 'Dark Theme'
        this.themeTextClass = 'btn-sm btn-outline-dark'
      } else {
        this.startBtnClass = 'darkThemeStartButton'
        this.themeText = 'Light Theme'
        this.themeTextClass = 'btn-sm btn-outline-light text-light'
      }
      this.$emit('darkTheme', true)
    },
  },
}
</script>