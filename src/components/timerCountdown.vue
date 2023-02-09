<template>
    <div class="text-danger" id="timer">
        <vue-countdown v-if="this.counting && !this.paused && !this.selectionInProgress" 
            @end="onCountdownEnd" 
            @abort="onAbort" 
            @progress="progressData"  
            :time="this.timer" 
            >
        </vue-countdown>
        <chartTimer :key="count" :timerCount="timerCount" :count="count"></chartTimer>
    </div>
</template>
<style scoped>
#timer{
    font-family: "OldSport01CollegeNcv";
    font-size: 2.2rem;
    max-height: 3vh;
}
</style>
<script>
import chartTimer from './chartTimer/chartTimer.vue'

    export default {
        name: 'timerCountdown',
        expose: ['setUp', 'reset'],
        props: ['timerCount', 'paused', 'selectionInProgress'],
        components: {
            chartTimer
        },
        data() {
            return {
                timer: 0,
                counting: false,
                count: 0,
            }
        },
        methods: {
            onAbort () {
            },
            startCount () {
                this.counting = true;
            },
            progressData (data) {
                this.count = data.totalSeconds
                this.$emit('counter', data.totalSeconds)
            },
            onCountdownEnd () {
                this.counting = false;
                this.$emit('counter', 0)
            },
            setUp() {
                this.timer = this.timerCount * 1000
                this.counting = true;
            },
        },
        created () {
            this.count = this.timerCount
            this.counting = true;
            this.setUp();
        }
    }
</script>