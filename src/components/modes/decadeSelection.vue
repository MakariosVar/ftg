<template>
    <div id="DecadeSelection">
        <h2>Select Decade</h2>
        <router-link @click="click(90)" to="#" class="btn mt-2 w-50 customFont">{{  dec90 }}</router-link>
        <router-link @click="click('00')" to="#" class="btn mt-2 w-50 customFont">{{  dec00 }}</router-link>
        <router-link @click="click(10)" to="#" class="btn mt-2 w-50 customFont">{{  dec10 }}</router-link>
        <router-link @click="click(20)" to="#" class="btn mt-2 w-50 customFont">{{  dec20 }}</router-link>
        <div @click="back" class="text-center pt-2 customButtons">
            <svg xmlns="http://www.w3.org/2000/svg" width="40%" height="40%" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
        </div>
    </div>
</template>

<style> 
#DecadeSelection {
    font-family: "TrumpTownPro";
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>

<script>
    export default {
        name: 'selectDecade',
        data () {
            return {
                dec90: "90's",
                dec00: "00's",
                dec10: "10's",
                dec20: "20's",
            }
        },
        methods: {
            click (e) {
                this.$emit('sfx', 'gameModeBtn')
                if (e == 20) {
                    this.dec20 = 'Coming Soon'
                } else {
                    this.$router.push({ name: 'DecadeMode', params: { id: e } })
                }
            },
            back() {
                this.$emit('sfx', 'back')
                this.$router.push('/modeselect')
            }

        }
    }
</script>