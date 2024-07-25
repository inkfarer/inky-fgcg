<template>
    <div class="clock-wrapper">
        <div class="clock">
            <span class="time font-numeric">{{ time }}</span>
        </div>
        <div class="zone">{{ utcOffset }}</div>
        <div
            v-for="(line, i) in location"
            :class="`location-line_${i}`"
            class="location"
        >
            {{ line }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateTime } from 'luxon';
import { onUnmounted, ref } from 'vue';
import { Configschema } from 'types/schemas';

export default defineComponent({
    name: 'Clock',

    setup() {
        const zone = (nodecg.bundleConfig as Configschema)?.event?.timezone ?? 'Etc/GMT';
        const time = ref('--:--');
        const location = (nodecg.bundleConfig as Configschema).event?.location ?? [];

        function getCurrentTime(): DateTime {
            return DateTime.now().setZone(zone);
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
        const utcOffset = now.offset === 0
            ? 'UTC'
            : now.offset > 0
                ? `UTC+${now.offset / 60}`
                : `UTC${now.offset / 60}`;

        onUnmounted(() => {
            clearInterval(timeChangeInterval);
        });

        return {
            time,
            utcOffset,
            location
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
        margin-bottom: 2px;
        opacity: 0.75;
    }

    .location {
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        margin-top: -4px;
    }
}
</style>
