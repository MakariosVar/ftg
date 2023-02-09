<template>
    <div v-if="false">
</div>
</template>

<script>

    export default {
        name: 'AudiosComponent',
        data () {
            return {
                SFX: {},
                soundtrack: new Audio(require('./../assets/song.mp3')),
                audioMainBtn: new Audio(require('./../assets/sfx/MainBtn.mp3')),
                audioBackBtn: new Audio(require('./../assets/sfx/BackBtn.mp3')),
                audioPoints: new Audio(require('./../assets/sfx/Changetheme.mp3')),
                audioForwardBtn: new Audio(require('./../assets/sfx/ForwardBtn.mp3')),
                audioThemeBtn: new Audio(require('./../assets/sfx/Changetheme.mp3')),
                audioPauseResumeBtn: new Audio(require('./../assets/sfx/PauseBtn.mp3')),
                audioGameModeBtn: new Audio(require('./../assets/sfx/GamemodeBtn.mp3')),
                audioNicknameBtn: new Audio(require('./../assets/sfx/TypenameProfile.mp3')),
                audioGameOver: new Audio(require('./../assets/sfx/GameoverPage.mp3')),
                audioAnswerBtn: new Audio(require('./../assets/sfx/answerBtn.mp3')),
                winAudio: new Audio(require('./../assets/sfx/Win.mp3')),
                loseAudio: new Audio(require('./../assets/sfx/Lose.mp3')),
                clock20SecAudio: new Audio(require('./../assets/sfx/Clock-20sec.mp3'))
            }
        },
        props: [
            'sfxInput',
            'sfxVolume',
            'sfxMuted',
            'musicVolume'
        ],
        methods: {
            handleMusic (start) {
                console.debug('HANDLE MUSIC :' + start)
                // alert('HANDLE MUSIC :' + start)
                if (start) {
                    this.soundtrack.volume = this.musicVolume
                    this.soundtrack.play();
                } else {
                    this.soundtrack.pause();
                }
                this.soundtrack.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
                this.$emit('done', true)
            },
            playAudio (sound) {
                if (!this.sfxMuted) {
                    sound.currentTime=0;
                    sound.volume = this.sfxVolume
                    sound.play();
                    setInterval(function(){
                        if(sound.currentTime>2){
                            sound.pause();
                        }
                    }.bind(this),1000);
                }
                this.$emit('done', true)
            },
            handleClock (sound, start) {
                console.debug('HANDLE CLOCK :' + start)
                // alert('HANDLE CLOCK :' + start)
                if (!this.sfxMuted && start) {
                    // sound.currentTime=0;
                    sound.volume = this.sfxVolume
                    sound.play();
                } else {
                    this.clock20SecAudio.pause();
                }
                this.clock20SecAudio.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
                this.$emit('done', true)
            }
        },
        watch: {
            sfxInput: function(sfx) {
                // sfx != '' ? alert( 'INPUT === '+ sfx) : null
                let sound = sfx
                switch(sound) {
                    case 'startMusic':
                        this.handleMusic(true);
                        break;
                    case 'stopMusic':
                        this.handleMusic(false);
                        break;
                    case 'mainButton':
                        this.playAudio(this.audioMainBtn)
                        break;
                    case 'gameModeBtn':
                        this.playAudio(this.audioGameModeBtn)
                        break;
                    case 'setNicknameBtn':
                        this.playAudio(this.audioNicknameBtn)
                        break;
                    case 'pauseResumeBtn':
                        this.playAudio(this.audioPauseResumeBtn)
                        break;
                    case 'win':
                        this.playAudio(this.winAudio)
                        this.playAudio(this.audioAnswerBtn)
                        break;
                    case 'lose':    
                        this.playAudio(this.loseAudio)
                        this.playAudio(this.audioAnswerBtn)
                        break;
                    case 'gameOver':    
                        this.playAudio(this.audioGameOver)
                        break;
                    case 'themeButton':
                        this.playAudio(this.audioThemeBtn)
                        break;
                    case 'forward':
                        this.playAudio(this.audioForwardBtn);
                        break;
                        case 'back':
                        this.playAudio(this.audioBackBtn);
                        break;
                    case 'points':
                        this.playAudio(this.audioPoints);
                        break;
                    case 'clock-stop':
                        this.handleClock(this.clock20SecAudio, false);
                        break;
                    case 'clock-20':
                        this.handleClock(this.clock20SecAudio, true) ;
                        break;
                    case 'pause-round':
                        this.handleClock(this.clock20SecAudio, false);
                        this.handleMusic(false)
                        break;
                    case 'resume-round':
                        this.handleClock(this.clock20SecAudio, true);
                        this.handleMusic(true)
                        break;
                    default:
                        // code block
                }
                sound = ''
            }
        }
    }
</script>