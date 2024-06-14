<template>
    <div class="clock-wrapper">
        <div class="clock">
            <span class="time font-numeric">{{ time }}</span>
        </div>
        <div class="zone">{{ utcOffset }}</div>
        <div class="location">Tallinn, Estonia</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateTime } from 'luxon';
import { onUnmounted, ref } from 'vue';

export default defineComponent({
    name: 'Clock',

    setup() {
        const CENTRAL_ZONE = 'Europe/Tallinn';
        const time = ref('--:--');

        function getCurrentTime(): DateTime {
            return DateTime.now().setZone(CENTRAL_ZONE);
        }

        function setTime(now: DateTime): void {
            time.value = now.toFormat('HH:mm');
        }

        let timeChangeInterval: number | undefined = undefined;
        timeChangeInterval = window.setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        const now = getCurrentTime();
        setTime(now);
        const utcOffset = `UTC+${Math.abs(now.offset / 60)}`;

        onUnmounted(() => {
            clearInterval(timeChangeInterval);
        });

        return {
            time,
            utcOffset
        };
    }
});
</script>

<style lang="scss">
.clock-wrapper {
    text-align: center;
    min-width: 140px;

    .clock {
        margin-top: -2px;
    }

    .time {
        font-size: 44px;
        font-weight: 700;
    }

    .zone {
        font-weight: 400;
        font-size: 20px;
        line-height: 20px;
        margin-top: -8px;
        opacity: 0.75;
    }

    .location {
        font-weight: 400;
        font-size: 20px;
        margin-top: -4px;
    }
}
</style>
