<template>
    <div class="d-flex pt-2 justify-content-around">
        <div @click="setNickname" class="row align-items-center">
            <img class="w-75  avatar border border-info" :src="this.url+'/images/avatars/'+avatar+'.jpg'" alt="">
            <a v-if="(this.nickname.length < 11)" class="pl-1 text-info"> {{ this.nickname }} </a>
            <a v-else class="pl-1 text-info"> {{ this.nickname.substring(0,10)+ '...'}} </a>
        </div>
        <div class="row align-items-center">
            <router-link class="text-info font-italic p-2 customButtons" to="#">
                <svg height="40" width="45" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M425.918,325.916c-32.008-32.008-71.46-53.858-114.447-63.969l-28.001,28.001l12.271,148.575c0.416,5.041-0.957,10.066-3.879,14.194l-27.999,39.563c-1.806,2.552-4.739,4.07-7.866,4.07c-3.127,0-6.06-1.518-7.866-4.07l-27.999-39.563c-2.921-4.128-4.295-9.154-3.879-14.194l12.271-148.576l-28.001-28.001c-42.987,10.111-82.439,31.96-114.447,63.969c-45.387,45.387-70.383,105.733-70.383,169.921c0,8.927,7.237,16.164,16.164,16.164h448.28c8.927,0,16.164-7.237,16.164-16.164C496.302,431.648,471.305,371.303,425.918,325.916z"/></g></g><g><g><path d="M383.757,40.025c-2.376-0.794-4.993,0.02-6.499,2.021l-41.997,55.796L258.091,2.168C256.985,0.796,255.319,0,253.558,0c-1.76,0-3.427,0.796-4.533,2.168l-77.169,95.674L134.78,47.334c-1.49-2.03-4.115-2.872-6.507-2.088c-2.392,0.784-4.011,3.016-4.011,5.534v87.038h263.472v-92.27C387.734,43.043,386.132,40.819,383.757,40.025z"/></g></g><g><g><path d="M124.261,170.147v32.318c0,7.166,5.809,12.975,12.976,12.975h237.522c7.166,0,12.975-5.809,12.975-12.975v-32.318H124.261z"/></g></g></svg>
            </router-link>
        </div>
    </div>
    <div class="d-flex text-light h-75 flex-column justify-content-center align-items-center p-5">
        <h1 class="ModeTitle">GAMEMODES</h1>
        <router-link @click="this.$emit('sfx', 'gameModeBtn')" to="/random" class="btn mt-2 w-75 customFont">RANDOM</router-link>
        <router-link @click="this.$emit('sfx', 'gameModeBtn')" to="/decadeSelection" class="btn mt-2 w-75 customFont">DECADE</router-link>
        <router-link @click="this.$emit('sfx', 'gameModeBtn')" to="/companies" class="btn mt-2 w-75 customFont">COMPANIES</router-link>
        <router-link @click="this.$emit('sfx', 'gameModeBtn')" to="/hardcore" class="btn mt-2 w-75 customFont">HARDCORE</router-link>
    </div>
    <div class="fixed-bottom pb-2 row justify-content-around">
        <div :class="soundIconClass" @click="HandleMusic"  class="customButtons">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path d="M78.816,18.838c0-1.145-1.332-1.638-2.383-1.309l-34.938,11c-0.702,0.221-1.407,0.795-1.562,1.465c-0.134,0.268-0.435,0.566-0.435,0.887v33.894c-1-1.817-3.354-2.937-6.25-2.937c-6.127,0-10.967,4.966-10.967,11.092c0,6.127,5.027,11.092,11.154,11.092c4.825,0,8.635-3.216,10.162-7.519c0.086-1.219-0.1-0.991-0.1-1.752V42.825l31-9.612v20.562c-1-1.817-3.354-2.937-6.25-2.937c-6.127,0-10.967,4.966-10.967,11.092c0,6.127,5.027,11.092,11.154,11.092c4.825,0,8.7-3.086,10.227-7.389c0-0.689-0.164-0.991-0.164-1.752V31.193C79.5,30.776,78.816,19.324,78.816,18.838z M43.5,38.762v-6.807l31-9.742v6.807L43.5,38.762z"/></g></svg>        
        </div>
        <div>
            <router-link to="/gearsettings" class="customButtons" @click="this.$emit('sfx', 'forward')">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/></svg>
            </router-link>
        </div>
    </div>
</template>

<style>
    .customButtons {
        fill: rgba(255, 0, 72, 0.689) ;
        color: rgba(255, 0, 72, 0.689) ;
        -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
        filter: drop-shadow( 3px 3px 2px #01139d);
    }
    .soundIconDisable {
        fill: #01139de2 ;
        -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
        filter: drop-shadow( 3px 3px 2px #ff0048f3);
    }

    .customFont {
        font-family: "TrumpTownPro";
        border: solid;
        font-size: 1.8rem;
        text-shadow: 3px 3px rgb(4, 41, 68);
        color: #198faa;
        box-shadow: 2px 2px #002f8c93;
    }

    .ModeTitle {
        font-size: 3.5rem;
        /* text-decoration: underline;
        text-decoration-style: dashed; */
        font-family: 'TrumpTownPro';
        color: rgba(255, 0, 72, 0.689) ;
        text-shadow: 2px 2px #01139b;
    }

    .avatar {
        border-radius: 50%;
        max-width: 10vw;
    }
    .avatarSelection {
        border-radius: 50%;
        max-width: 10vw;
    }
    /* If the screen size is smaller than 1200px, set the font-size to 80px */
@media (max-width: 1199.98px) {
    .row-responsive {
        flex-direction: column;
    }
    .avatarSelection {
        border-radius: 50%;
        max-width: 18vw;
    }
}
</style>

<script>
    import {API_URL} from '../main.js'

export default {
    name: 'ModeSelect',
    props:['music'],
    data() {
        return {
            url: API_URL,
            avatar: localStorage.getItem('avatar'),
            nickname: localStorage.getItem('nickname'),
            soundIconClass: 'customButtons'
        }
    },
    methods: {
        setNickname () {
            this.$router.push('/profile')
            this.$emit('sfx', 'setNicknameBtn')
        },
        HandleMusic () {
            if (this.music == true) {
                this.$emit('music', false)
            } else {
                this.$emit('music', true)
            }
        }
    },
    created () {
        this.music == false ? this.soundIconClass = 'soundIconDisable' : this.soundIconClass = 'customButtons'
    },
    watch: {
        music: function(val) {
            val == false ? this.soundIconClass = 'soundIconDisable' : this.soundIconClass = 'customButtons'
        }
    }
}
</script>