<template>
    <div v-if="!this.onGame" class="d-flex justify-content-center pt-5">
        <div @click="setNickname" class="d-flex flex-column align-items-center">
            <img class="avatar border border-info" :src="this.url+'/images/avatars/'+avatar+'.jpg'" alt="">
            <a v-if="(this.nickname.length < 11)" class="pl-1 text-info"> {{ this.nickname }} </a>
            <a v-else class="pl-1 text-info"> {{ this.nickname.substring(0,10)+ '...'}} </a>
            <img style="max-height: 4vh" :src="require('../assets/flags/'+nation+'.svg')" alt="wait...">    
        </div>
    </div>
    <div class="d-flex flex-column justify-content-start mt-4 h-50 align-items-center">
        <h3 class="text-center text-gear  text3d" >{{themeText}}</h3>
        <div v-if="!darkThemeOn" class="customButtons" @click="setTheme">
            <svg height="50" width="50" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-351 153 256 256" xml:space="preserve"><g id="Layer_1_1_"></g><g id="_x31_"><path d="M-235.1,389.1c11.5,0,23.2-1.8,34.1-5.8c-42.3-14.5-72.9-54.3-72.9-101.2c0-47.4,30.6-87.4,72.9-101.2c-10.4-3.5-22-5.8-34.1-5.8c-59,0-107,48-107,107C-342.1,341.6-294,389.1-235.1,389.1z"/><polygon points="-177.8,257.2 -162.7,249.1 -147.7,257.2 -150.6,240.4 -138.4,228.9 -155.2,226 -162.7,211 -170.3,226 -187.1,228.9 -174.9,240.4 	"/><polygon points="-129.2,314.5 -118.8,309.2 -108.4,314.5 -110.1,302.8 -102,294.8 -113.5,293.1 -118.8,282.6 -124,293.1 -135.6,294.8 -127.5,302.8 	"/><polygon points="-200.4,343.4 -202.7,355 -191.7,349.7 -181.3,355 -183,343.4 -174.3,334.7 -186.4,332.9 -191.7,322 -197.4,332.9 -209,334.7 	"/></g></svg>
        </div>
        <div v-else class="customButtons" @click="setTheme">
            <svg width="50" height="50" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>sun-solid</title><g id="Layer_2" data-name="Layer 2"><g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"/></g><g id="Q3_icons" data-name="Q3 icons"><g><path d="M24,10a2,2,0,0,0,2-2V4a2,2,0,0,0-4,0V8A2,2,0,0,0,24,10Z"/><path d="M24,38a2,2,0,0,0-2,2v4a2,2,0,0,0,4,0V40A2,2,0,0,0,24,38Z"/><path d="M36.7,14.1l2.9-2.8a2.3,2.3,0,0,0,0-2.9,2.3,2.3,0,0,0-2.9,0l-2.8,2.9a2,2,0,1,0,2.8,2.8Z"/><path d="M11.3,33.9,8.4,36.7a2.3,2.3,0,0,0,0,2.9,2.3,2.3,0,0,0,2.9,0l2.8-2.9a2,2,0,1,0-2.8-2.8Z"/><path d="M44,22H40a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z"/><path d="M10,24a2,2,0,0,0-2-2H4a2,2,0,0,0,0,4H8A2,2,0,0,0,10,24Z"/><path d="M36.7,33.9a2,2,0,1,0-2.8,2.8l2.8,2.9a2.1,2.1,0,1,0,2.9-2.9Z"/><path d="M11.3,14.1a2,2,0,0,0,2.8-2.8L11.3,8.4a2.3,2.3,0,0,0-2.9,0,2.3,2.3,0,0,0,0,2.9Z"/><path d="M24,14A10,10,0,1,0,34,24,10,10,0,0,0,24,14Z"/></g></g></g></svg>
        </div>
        <div class="text-center w-75">
            <h3 class="text-center text-gear mt-4 text3d" >Music Volume</h3>            
            <aesth-vue-range-input
                @input="setVolume($event)"
                step="0.01"
                class="bg-transparent w-75"
                :max="1"
                trackColor="#01139d"
                :value="this.musicVolume"
                :buffered="{
                    width: this.musicVolume*100+'%',
                    color: '#ff0048b0',
                }"
            />
            <p class="h2 text-gear text3d">
                {{ this.outputVolume }}
            </p>
        </div>
        <div v-if="!onGame" class="text-center text-gear text3d w-75">
            <h3  class="text-center text-gear mt-4 text3d" >SFX Volume</h3>
            <aesth-vue-range-input
                @input="setSfxVolume($event)"
                step="0.01"
                class="bg-transparent w-75"
                :max="1"
                trackColor="#01139d"
                :value="this.sfxVolume"
                :buffered="{
                    width: this.sfxVolume*100+'%',
                    color: '#ff0048b0',
                }"
            />
            <p class="h2 text-gear text3d">
                {{ this.outputSfxVolume }}
            </p>
        </div>
    </div>
    <div style="color:black" class="fixed-bottom pb-2 row justify-content-around">
        <div class="customButtons d-flex justify-content-center align-items-center">
            <svg  :class="soundIconClass" @click="HandleMusic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path d="M78.816,18.838c0-1.145-1.332-1.638-2.383-1.309l-34.938,11c-0.702,0.221-1.407,0.795-1.562,1.465c-0.134,0.268-0.435,0.566-0.435,0.887v33.894c-1-1.817-3.354-2.937-6.25-2.937c-6.127,0-10.967,4.966-10.967,11.092c0,6.127,5.027,11.092,11.154,11.092c4.825,0,8.635-3.216,10.162-7.519c0.086-1.219-0.1-0.991-0.1-1.752V42.825l31-9.612v20.562c-1-1.817-3.354-2.937-6.25-2.937c-6.127,0-10.967,4.966-10.967,11.092c0,6.127,5.027,11.092,11.154,11.092c4.825,0,8.7-3.086,10.227-7.389c0-0.689-0.164-0.991-0.164-1.752V31.193C79.5,30.776,78.816,19.324,78.816,18.838z M43.5,38.762v-6.807l31-9.742v6.807L43.5,38.762z"/></g></svg>        
            <svg v-if="!sfxMuted" @click="HandleSfx" :class="sfxIconClass" height="40" width="40" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M391,256c0-35.5-21.7-65.9-52.5-78.7l-16.4,39.4c15.4,6.4,26.2,21.6,26.2,39.4c0,17.7-10.8,32.9-26.2,39.4l16.4,39.4C369.3,321.9,391,291.5,391,256z M371.3,98.5l-16.4,39.4c46.3,19.3,78.8,64.9,78.8,118.1c0,53.3-32.5,98.8-78.8,118.1l16.4,39.4c61.7-25.7,105-86.5,105-157.5C476.3,185,433,124.2,371.3,98.5z M49.7,149.3v213.3H135L284.3,512V0L135,149.3H49.7z"/></svg>
            <svg v-else @click="HandleSfx" :class="sfxIconClass" height="40" width="40" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M159.8,320l64-64l-64-64l85.3-85.3l64,64V0L159.8,149.3H74.4v213.3h85.3L309.1,512V341.3l-64,64L159.8,320z M405.1,192l-32-32l-64,64l-64-64l-32,32l64,64l-64,64l32,32l64-64l64,64l32-32l-64-64L405.1,192z"/></svg>        
        </div>
        <div>
            <router-link class="p-2 svg3d" to="/modeSelect" @click="this.$emit('sfx', 'back')">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 272.408 272.407" xml:space="preserve"><g><g><path d="M272.408,100.988c0-10.772-9.651-19.532-21.506-19.532H21.506C9.649,81.456,0,90.216,0,100.988v70.431c0,10.771,9.649,19.532,21.506,19.532h229.396c11.854,0,21.506-8.761,21.506-19.532V100.988z M258.071,171.419c0,2.814-3.286,5.194-7.169,5.194H21.506c-3.885,0-7.169-2.38-7.169-5.194v-70.431c0-2.814,3.284-5.195,7.169-5.195h229.396c3.883,0,7.169,2.38,7.169,5.195V171.419z"/><polygon points="32.441,139.65 57.391,139.65 57.391,130.729 32.441,130.729 32.441,119.822 59.624,119.822 59.624,110.729 21.949,110.729 21.949,162.09 60.875,162.09 60.875,152.854 32.441,152.854 		"/><polygon points="109.576,110.729 97.168,110.729 87.752,127.455 78.596,110.729 65.775,110.729 81.487,135.921 64.973,162.09 77.445,162.09 87.762,144.574 97.516,162.09 110.549,162.09 93.862,135.501 		"/><rect x="115.97" y="110.729" width="10.662" height="51.365"/><polygon points="132.381,119.822 147.825,119.822 147.825,162.09 158.625,162.09 158.625,119.822 173.994,119.822 173.994,110.729 132.381,110.729 		"/><path d="M225.611,106.078c-1.983-1.984-4.093-2.987-6.268-2.987c-3.439,0-6.902,2.611-6.902,8.45v5.703h-16.489c-6.543,0-11.863,5.323-11.863,11.866v14.186c0,6.543,5.32,11.864,11.863,11.864h16.489v5.703c0,5.838,3.467,8.447,6.902,8.447c2.175,0,4.279-1.004,6.268-2.991l21.716-21.721c2.25-2.245,3.481-5.223,3.481-8.396s-1.231-6.151-3.481-8.396L225.611,106.078zM240.579,137.84l-18.58,18.589v-10.823h-26.047c-1.278,0-2.306-1.036-2.306-2.311v-14.181c0-1.276,1.036-2.308,2.306-2.308h26.047v-10.821l18.58,18.586c0.593,0.593,0.681,1.279,0.681,1.639C241.259,136.561,241.171,137.242,240.579,137.84z"/></g></g></svg>
            </router-link>
        </div>
    </div>

</template>
<style>
.text3d {
    color: #ff0048b0 ;
    text-shadow: 2px 2px 2px #01139d;   
}

.svg3d {
    fill: rgba(255, 0, 72, 0.689) ;
    -webkit-filter: drop-shadow( 3px 3px 2px rgba(1, 19, 157, 1));
    filter: drop-shadow( 3px 3px 2px rgb(1, 19, 157));    
}

.text-gear {
    font-size: 1.5rem;
    font-family: 'OldSport01CollegeNcv';
}

</style>

<script>
import {API_URL} from '../main.js'
import AesthVueRangeInput from "aesth-vue-range-input";
export default {
    components: {
        AesthVueRangeInput
    },
    props: [
        'music',
        'musicVolume',
        'darkThemeOn',
        'onGame',
        'sfxVolume',
        'sfxMuted'
    ],
    name: 'GearSettings',
    data () {
        return {
            outputVolume: '',
            outputSfxVolume: '',
            url: API_URL,
            nation: localStorage.getItem('nation'),
            avatar: localStorage.getItem('avatar'),
            nickname: localStorage.getItem('nickname'),
            theme: '',
            themeText: ''
        }
    },
    watch: {
        music: function(val) {
            val == false ? this.soundIconClass = 'soundIconDisable' : this.soundIconClass = 'customButtons'
        },
        sfxMuted: function(val) {
            val != false ? this.sfxIconClass = 'soundIconDisable' : this.sfxIconClass = 'customButtons'
        }

    },
    methods: {
        setNickname () {
            this.$router.push('/nickname')
            this.$emit('sfx', 'setNicknameBtn')
        },
        setTheme () {
            this.$emit('sfx', 'themeButton')
            if (this.theme == 'dark') {
                this.themeText = 'Dark Theme'
                this.theme = 'light'
            } else {
                this.themeText = 'Light Theme'
                this.theme = 'dark'
            }
            this.$emit('darkTheme', true)
        },
        HandleMusic () {
            if (this.music == true) {
                this.$emit('music', false)
            } else {
                this.$emit('music', true)
            }
        },
        HandleSfx () {
            if (this.sfxMuted == false) {
                this.$emit('sfxMute', false)
            } else {
                this.$emit('sfxMute', true)
            }
        },
        setVolume (e) {
            let Input = e.target.value
            this.$emit('setVolume', Input)
            this.outputVolume = Math.round(Input * 100)
        },
        setSfxVolume (e) {
            let Input = e.target.value
            this.$emit('setSfxVolume', Input)
            this.outputSfxVolume = Math.round(Input * 100)
        },
    },
    created () {
        this.music == false ? this.soundIconClass = 'soundIconDisable' : this.soundIconClass = 'customButtons'
        this.sfxMuted != false ? this.sfxIconClass = 'soundIconDisable' : this.sfxIconClass = 'customButtons'
        this.outputVolume = Math.round(this.musicVolume * 100)
        this.outputSfxVolume = Math.round(this.sfxVolume * 100)
        this.darkThemeOn ? this.theme = 'dark' : this.theme = 'light'
        if (this.darkThemeOn) {
            this.themeText = 'Light Theme'
        } else {
            this.themeText = 'Dark Theme'
        }
    }
}
</script>