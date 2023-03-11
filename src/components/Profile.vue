<template>
        <div v-if="(!this.selectingAvatar && !this.selectingNation)" class="h-100 d-flex flex-column justify-content-between align-items-center p-5">
            <h3><u><i>Nickname</i></u></h3>
            <div class="row">
                <div class="form__group field w-100 text-center">
                    <input :maxlength="25" type="input" v-model="nicknameInput" :class="nicknameInput === '' ? 'form__field__empty' : 'form__field__ok'" class="text-center" :placeholder="nicknameInput" name="name" id="name" />
                    <label for="name" class="form__label">Name</label>
                </div>
            </div>
            <div class=" d-flex flex-column  align-items-center">
                <h5><u><i>Avatar</i></u></h5>
                <div>
                    <img @click="this.selectAvatar()" class="w-100 h-100 avatarComponent border border-info" :src="this.url+'/images/avatars/'+avatar+'.jpg'" alt="">
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <h5><u>Country</u></h5>
                    <img v-if="nation != null" @click="(this.selectingNation = true)" style="max-height: 5vh" :src="require('../assets/flags/'+nation+'.svg')" alt="wait...">    
                </div>
            </div>
            <div class="row">
                <a @click.prevent="dontSave()" class="btn btn-secondary text-white mr-1">Back</a>
                <a @click.prevent="save()" class="btn btn-success text-white ml-1">Save</a>
            </div>
        </div>
        <div v-if="this.selectingNation" class="text-center container">
            <h3 class="pt-5">Choose your Nation</h3>
            <div class="row p-2" style="overflow-y: scroll; height:77vh;">
                <div v-for="(country, index) in countries" :key="index" class="col-2 p-2">
                    <img @click="chooseNation(country)" :src="require('../assets/flags/'+country+'.svg')" alt="">
                </div>
            </div>
        </div>
        <div v-if="this.selectingAvatar" class="">
            <div @click="back()" class="text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
            </div>
            <h2 class="text-center "><u><i>SelectAvatar</i></u></h2>
            <div class="row w-100 justify-content-center">
                <div v-for="i in 16" :key="i">
                    <div @click="this.selectAvatarEnd(i)" class="col">
                        <img  class="w-100 h-100 avatarSelection border m-1 border-info" :src="this.url+'/images/avatars/'+i+'.jpg'" alt="">
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
    import {API_URL} from '../main.js'
    import {COUNTRIES} from '../main.js'
    
    export default {
        name: 'ProfileComponent',
        data() {
            return {
                url: API_URL,
                countries: COUNTRIES,
                avatar: localStorage.getItem('avatar'),
                nickname: localStorage.getItem('nickname'),
                selectingAvatar: false,
                selectingNation: false,
                nation: localStorage.getItem('nation'),
                nicknameInput: this.nickname == null ?  '' :  this.nickname
            }
        },
        created () {
            if (this.avatar == null) {
                this.avatar = '1';
            }
            if (this.nation == null) {
                this.nation = 'ac';
            }
            if ( this.nickname == null) {
                this.nickname = '';
                this.nicknameInput = this.nickname;
            }
        },
        methods: {
            selectAvatar () {
                this.selectingAvatar = true;
            },
            back() {
                this.selectingAvatar = false;
            },
            dontSave () {
                this.$router.back();
            },  
            selectAvatarEnd (i) {
                this.avatar = i;
                this.selectingAvatar = false;
            },
            save () {
                if (this.nicknameInput) {
                    this.$emit('sfx', 'setNicknameBtn')
                    localStorage.setItem('nickname', this.nicknameInput);
                    localStorage.setItem('avatar', this.avatar);
                    localStorage.setItem('nation', this.nation);
                    this.$router.push('/modeselect');
                } 
            },
            chooseNation (code) {
                this.nation = code
                this.selectingNation = false
            }
        },
    }
</script>


<style>
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
}
.avatarComponent {
        border-radius: 50%;
        max-width: 20vw;
    }
.form__field__empty {
    font-family: inherit;
    width: 100%;
    border: 0;
    outline: 0;
    border-bottom: 2px solid red;
    font-size: 1.3rem;
    color: #000;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s; 

}

.form__field__ok {
    font-family: inherit;
    width: 100%;
    border: 0;
    outline: 0;
    border-bottom: 2px solid #262626;
    font-size: 1.3rem;
    color: #000;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s; 
}


.form__label {
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #191919;
}


</style>
