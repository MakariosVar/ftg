<template>
    <div v-if="this.loading">
        <LoadingScreen />
    </div>
    <div v-else>
        <div v-if="(!this.gameOver) && !(this.paused)" class="bg-game">    
            <div class="d-flex justify-content-around">
                <div class="row col-3 align-items-center ">
                    <img class="rounded-circle avatarInGame" :src="this.url+'/images/avatars/'+avatar+'.jpg'" alt="">
                </div>
                <div class="col-1 d-flex justify-content-center align-items-center">
                    <a @click="pauseButton" class="p-2 pt-3 pauseButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10vw" height="10vh" class="bi bi-pause-fill" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>
                    </a>
                </div>
                <div class="d-flex flex-row-reverse flex-reverse align-items-center pt-2">
                    <div class="pl-1 customButtons" v-bind:class="heart1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="7vw" height="7vh" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                </div>
                <div class="pl-1 customButtons" v-bind:class="heart2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="7vw" height="7vh" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                </div>
                <div class="pl-1 customButtons" v-bind:class="heart3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="7vw" height="7vh" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                </div>
            </div>
        </div>
        <div class="text-center">
            <h3 style="color: rgb(134, 5, 46);">
                {{  this.score }} 
                <span class="h6 pointsText">PTS</span>
                <span v-if="pointsEarned > 0" class="text-success btnText" style="font-size:0.98rem"> + {{  pointsEarned }}</span> 
            </h3>
            </div>
            <div class="container  d-flex justify-content-center pt-2">
                <div class="card bg-transparent" style="max-width: 100vw; border: none;">
                    <div class="row justify-content-center " style="background-color: black;">
                        <div id="row">
                            <img :src="this.imagePath" class="rounded" style="height: 40vh; width: 90vw;" alt="wait...">
                        </div>
                    </div>
                    <div>
                        <div class="row ">
                            <div @click="select(this.game1, 1)" class="col mt-3 h-100 w-100">
                                <a v-bind:class="buttons.button1.classText"  style=" white-space:normal;  width: 50%; height: 12vh;" class="w-100 btnText btn  d-flex justify-content-center align-items-center">{{ this.game1.name }}</a>
                            </div>
                            <div @click="select(this.game2, 2)" class="col mt-3 h-100 w-100">
                            <a v-bind:class="buttons.button2.classText"  style=" white-space:normal;  width: 50%; height: 12vh;" class="w-100 btnText btn  d-flex justify-content-center align-items-center">{{ this.game2.name }}</a>
                        </div>
                    </div>
                    <div class="text-center">
                        <timerCountdown v-if="!(this.selectionInProgress) && !(this.paused)" :timerCount="this.countDown" @counter="CheckTime" :paused="paused" :selectionInProgress="selectionInProgress"></timerCountdown>
                    </div>
                    <div class="row ">
                        <div @click="select(this.game3, 3)" class="col mt-3 h-100 w-100">
                            <a v-bind:class="buttons.button3.classText"  style=" white-space:normal;  width: 50%; height: 12vh;" class="w-100 btnText btn  d-flex justify-content-center align-items-center">{{ this.game3.name }}</a>
                        </div>
                        <div @click="select(this.game4, 4)" class="col mt-3 h-100 w-100">
                            <a v-bind:class="buttons.button4.classText"  style=" white-space:normal;  width: 50%; height: 12vh;" class="w-100 btnText btn  d-flex justify-content-center align-items-center">{{ this.game4.name }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- PAUSE SCREEN -->
    <div v-if="this.paused" class="d-flex flex-column justify-content-center align-items-center  h-100 w-100 text-danger">
        <div class="rounded-circle flex-column d-flex justify-content-center align-items-center p-5 bg-onPause">
            <h1 class="text-center text3d">Paused</h1>
            <h4 class="text-center text3d bg-onPause-seconds">Seconds left: <span class="h1">{{ pausedSecond }}</span></h4>
            <h4 class="text-center text3d bg-onPause-seconds">Points: <span class="h1">{{ score }}</span></h4>
            <a @click="resume" class="btn btn-d pauseButton pause-btn-lg text-light">Resume</a>
        </div>
        <gear 
        :music="music"
        :musicVolume="musicVolume"
        :darkThemeOn="darkThemeOn"
        :onGame="true"
        :sfxMuted="sfxMuted"
        @sfxMute="sfxMute"
        @darkTheme="darkTheme"
        @music="handleMusic"
        @sfx="sfx"
        @setVolume="setVolume">
    </gear>
</div>
<!-- AFTER SELECTION -->
<!-- GAME OVER -->
<div v-if="this.gameOver" class="d-flex  text-center text-danger flex-column justify-content-center py-5 sticky-top w-100 h-100 position-absolute">
    <div class="d-flex fixed-top justify-content-around align-items-center pt-2">
        <div>
            <img class="w-75 h-75 avatar border border-info" :src="this.url+'/images/avatars/'+avatar+'.jpg'" alt="">
            <a class="pl-1 text-info "> {{ this.nickname }} </a>
        </div>
        <div>
            <router-link class="text-info font-italic p-2" to="#"><u>leaderboards</u></router-link>
        </div>
    </div>
    <h1 class="display-3 gameOverText" >GAME OVER</h1>
    <h2 class="gameOverText" > <u>{{ this.score }} </u> POINTS</h2>
    <div class="d-flex justify-content-around w-100 pt-5">
        <div class="text-center">
            <a @click="next()" class="d-flex flex-column customButtons">
                <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.82-4.924a7 7 0 1 0-1.852 1.266l-.975-1.755A5 5 0 1 1 17 12h-3l2.82 5.076z"/></g></svg>
            </a>
            <span class="gameOverText" style="font-size: 1.5rem;">
                Retry  
            </span>
        </div>
        <div class="text-center">
            <a @click="BackToMainMenu" class="d-flex flex-column customButtons">
                <svg height="60" width="60" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g><polygon points="176,368 137.6,432 374.4,432 336,368 	"/><path d="M480,80H32C14.328,80,0,94.326,0,112v288c0,17.672,14.328,32,32,32h68.561l57.322-96h196.234l57.322,96H480c17.674,0,32-14.328,32-32V112C512,94.326,497.674,80,480,80z M96,272c-17.672,0-32-14.328-32-32c0-17.674,14.328-32,32-32c17.674,0,32,14.326,32,32C128,257.672,113.674,272,96,272z M336,272H176v-64h160V272z M416,272c-17.672,0-32-14.328-32-32c0-17.674,14.328-32,32-32c17.674,0,32,14.326,32,32C448,257.672,433.674,272,416,272z"/></g></svg>
            </a>
            <span class="gameOverText" style="font-size: 1.5rem;">
                Modes
            </span>
        </div>
    </div>
    <div class="border border-secondary mt-5 p-2 mr-5 ml-5" style="color:black;">
        <h5>Last Game</h5>
        <div class="container">
            <div class="row">
                <div class="col d-flex align-items-center">
                    <img :src="this.imagePath" class="rounded" style="height: 20vh; width: 32vw;" alt="wait...">
                </div>
                <div class="col">
                    <p class="font-italic"><b>{{ selectedGame.name }}</b></p>
                    <p class="font-italic">Releashed at: <br> <b>{{ this.releashDate('gameOver') }}</b></p>
                    <p class="font-italic">By : <br><b>{{ this.selectedGame.companies[0][0].name }}</b></p>
                </div>
            </div>
        </div>
    </div>
</div>
<div v-else>
    <!-- WIN -->
    <div v-if="this.win" id="win" @click="next" class="d-flex  text-center flex-column justify-content-center sticky-top w-100 h-100 position-absolute">
        <div class="bg-win d-flex flex-column justify-content-center">
            <h1>WIN</h1>
            <span class="text-danger">Tap to continue</span>
            </div>
        </div>
        <!-- LOSE -->
        <div v-if="this.lose" id="lose" @click="next" class="d-flex fixed-top h-100 text-center flex-column justify-content-center position-absolute">
            <div class="bg-lose d-flex flex-column justify-content-center align-items-center">
                <h1 class="text-light ">LOSE</h1>
                <span>Tap to continue</span>
            </div>
        </div>
    </div>
</div>
</template>
<style>
.avatarInGame {
    width: 10vw;
}
@media (max-width : 320px)  {
    .avatarInGame {
        width: 100vw;
    }
}
.pause-btn-lg {
    padding: 10px 16px;
    font-size: 2rem;
    line-height: 3rem;
    border-radius: 20px;
    background-color: rgba(255, 0, 72, 0.69);
    text-shadow: 2px 2px 2px rgba(1, 19, 157, 1);  
    box-shadow: 0px 8px 15px rgba(1, 19, 157, 1);
}
.pauseButton {
    fill: #01139d ;
    -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
    filter: drop-shadow( 3px 3px 2px #ff0048b0);
}

.btnText {
    font-family: 'TrumpTownPro';
    font-size: 1.0rem;
}
.bg-onPause{
    background-color: rgba(0, 0, 0, 0.1);
    font-family: 'CfDots521Regular';
    font-size: 5rem;
}

.bg-onPause-seconds {
    font-family: 'OldSport01CollegeNcv';
}

.winLoseText {
    font-family: 'TrumpTownPro';
    font-size: 3.2rem;
}

.gameOverText { 
    font-family: 'TrumpTownPro';
    font-size: 3.2rem;
    color: rgba(255, 0, 72, 0.689) ;
    text-shadow: 2px 2px #01139b;
}

.darkModeBtn {
    color:red
}

.pointsText {
    font-family: "CfDots521Regular";
    font-size: 1.2rem;
    font-weight: 900;
    color: rgb(134, 5, 46);
}
.bg-lose {
    font-family: "CfDots521Regular";
    background-color: rgba(172, 12, 12, 0.9);
    position: fixed;
    width: 100%;
    padding-top: 5%;
    text-align: center;
    top: 30%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, 0);
}
.bg-win {
    font-family: "CfDots521Regular";
    /* color:rgb(0, 0, 0); */
    background-color: rgba(0, 255, 17, 0.9);
    position: fixed;
    width: 100%;
    padding-top: 5%;
    text-align: center;
    top: 30%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, 0);
}
</style>

<script>
import  axios from 'axios'
import {API_URL} from '../../main.js'
import timerCountdown from '../timerCountdown.vue';
import LoadingScreen from '../LoadingScreen.vue';
import gear from '../Gear.vue';
export default {
    props:['music', 'darkThemeOn', 'musicVolume','sfxMuted', 'PAUSED'],
    components: {
        timerCountdown,
        gear,
        LoadingScreen
    },
    data() {
        return {
            loading:true,
            roundSeconds: 20,
            countDown: 0,
            paused: false,
            secondsLeft: 0,
            pausedSecond: 0,
            game1: '',
            game2: '',
            game3: '',
            game4: '',
            selected: '',
            selectedGame: {},
            imagePath: '',
            url: API_URL,
            avatar: localStorage.getItem('avatar'),
            nickname: localStorage.getItem('nickname'),
            score: 0,
            lives: 3,
            win: false,
            lose: false,
            gameOver: false,
            selectionInProgress: false,
            answerGiven: 0,
            oldGames: [],
            selectedButton: 0,
            heart3: '',
            heart2: '',
            heart1: '',
            pointsEarned: 0,
            btnUi: '',
            buttons:{
                button1:{
                    value : 1,
                    classText : ''
                },
                button2:{
                    value : 2,
                    classText : ''
                },
                button3:{
                    value : 3,
                    classText : ''
                },
                button4:{
                    value : 4,
                    classText : ''
                },
            },
        }
    },
    name: 'RandomMode',
    methods:{
        BackToMainMenu () {
            this.$router.push('/modeselect')
            this.$emit('sfx', 'back')
        },
        pauseButton () {
            this.$emit('sfx', 'pauseResumeBtn')
            this.paused = true
            this.pausedSecond = this.secondsLeft;
        },
        resume () {
            this.$emit('sfx', 'pauseResumeBtn')
            this.paused = false;
            this.countDown = this.pausedSecond;
            this.selectionInProgress = false;
        },
        
        APPResume () {
            this.secondsLeft != 0 ? this.pausedSecond = this.secondsLeft : this.pausedSecond = 20
            if (this.music == true && !this.paused) {
                this.$emit('sfx', 'resume-round')
            } else  if (!this.music && !this.paused) {
                this.$emit('sfx', 'clock-20')
            }
        },

        CheckTime (e) {
            if (e == 0 && !this.win && !this.lose && !(this.paused || this.selectionInProgress)) {
                let game = {}
                game.id = 0
                this.select(game)
            } else {
                this.secondsLeft = e;
            }
        },

        getData(){
        
            axios.get(API_URL+'/api/companies').then( (response) => {
                if ( this.oldGames.length == 0 ||  !(this.oldGames.includes(response.data.selected))) {
                    this.selected = response.data.selected
                    this.imagePath = API_URL+'/storage/'+response.data.image
                    response.data.companies.forEach((element) => {
                        if (element.id == this.selected) {
                            this.selectedGame = element
                        }
                    })
                    this.game1 = response.data.companies[0]
                    this.game2 = response.data.companies[1]
                    this.game3 = response.data.companies[2]
                    this.game4 = response.data.companies[3]
                    this.oldGames.push(this.selected)
                } else {
                    this.getData();
                }
                this.loading = false;
            }).catch(function (error) {
                console.log(error)
            })
        },
        setUiTheme () {
            if (this.darkThemeOn) {
                this.btnUi = 'bg-info rounded'
            } else {
                this.btnUi = 'btn-outline-dark'
            }            
            Object.values(this.buttons).forEach(button => {
                button.classText = this.btnUi
            })
        },
        releashDate (input) {
            let date = new Date(this.selectedGame.release_date * 1000)
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            if (input == 'gameOver') {
                let day = date.getDate();
                let month =  months[date.getMonth()];
                let year = date.getFullYear();
                return day+' '+month+' '+year
            }
        },
        buttonColor (index) {
            if (this.answerGiven && this.lose && index == this.selectedButton) {
                Object.values(this.buttons).forEach(button => {
                    if( button.value == index){
                        button.classText = 'bg-danger'
                    }
                })
            }
            if (this.answerGiven && this.win && index == this.selectedButton) {
                Object.values(this.buttons).forEach(button => {
                    if( button.value == index){
                        button.classText = 'bg-success'
                    } else {
                        button.classText = 'bg-danger'
                    }
                })
            }
        },
        select (game, selectedButton) {
            if (!this.selectionInProgress) {    
                this.selectionInProgress = true
                this.answerGiven = game.id
                this.selectedButton = selectedButton
                // WIN
                if (game.id == this.selected) {
                    this.win = true;
                    this.pointsEarned = (100 * this.secondsLeft);
                    this.$emit('sfx', 'win')
                    // LOSE
                } else {
                    if (this.lives != 1 ){
                        this.$emit('sfx', 'lose')
                        this.heart3 = 'text-dark'
                        if (this.lives == 2 ){
                            this.heart2 = 'text-dark'
                        }
                        this.lives = this.lives - 1;
                        this.lose = true;
                        const indexOfLast = this.oldGames.indexOf(this.selected);
                        if (indexOfLast > -1) { 
                            this.oldGames.splice(indexOfLast, 1); 
                        }
                    } else {
                        this.gameOver = true;
                        this.$emit('sfx', 'gameOver')
                    }
                }
                this.buttonColor(selectedButton)
            }
        },
        handleScore () {
            const earned = this.pointsEarned;
            const numIterations = earned / 10;

            let i = 0;
            const loop = () => {
            if (i < numIterations) {
                this.pointsEarned -= 10;
                this.score += 10;
                i++;
                setTimeout(loop, 4);
            }
            };
            loop();
        },
        next () {
            this.handleScore();
            this.loading = true;
            this.setUiTheme();
            this.selectionInProgress = false;
            this.paused = false;
            this.countDown = this.roundSeconds
            if (this.gameOver) {
                this.oldGames = []
                this.heart2 = ''
                this.heart3 = ''
                this.score = 0;
                this.lives = 3;
                this.gameOver = false;
            }
            this.lose = false;
            this.win = false;
            this.getData();
        },
        darkTheme(e) {
            this.$emit('darkTheme', e)
        },
        sfxMute (e) {
            this.$emit('sfxMute', e)
        },
        handleMusic(e) {
            this.$emit('music', e)
        },
        sfx (e) {
            this.$emit('sfx', e)
        },
        setVolume(e) {
            this.$emit('setVolume', e)
        },
    },
    watch: {
        PAUSED: function (e) {
            e ? this.paused = e : null
        },
        darkThemeOn: function () {
            this.setUiTheme()
        },
        selectionInProgress: function (e) {
            e ? this.$emit('onGame', false) : this.$emit('onGame', true)
            e == false && this.paused == false ? this.$emit('sfx', 'clock-20') : this.$emit('sfx', 'clock-stop');
        },
        paused: function (e) {
            e ? this.$emit('onGame', false) : this.$emit('onGame', true)
            e == false && this.selectionInProgress == false ? this.$emit('sfx', 'clock-20') : this.$emit('sfx', 'clock-stop');
        }
    }, 
    created () {
        document.addEventListener("resume", this.APPResume, false);
        this.$emit('sfx', 'clock-20')
        this.countDown = this.roundSeconds
        this.setUiTheme();
        this.getData();
    }
}
</script>