<template>
    <transition
        @enter="castersEnter"
        @leave="castersLeave"
        @beforeEnter="beforeCastersEnter"
    >
        <div
            v-if="casterStore.casters.visible"
            class="caster-display-wrapper"
        >
            <div
                v-for="caster in casterStore.casters.items"
                :key="caster.id"
                class="caster"
            >
                <fitted-content>
                    <span class="caster-name">{{ caster.name }}</span> <span v-show="!isBlank(caster.pronouns)" class="pronouns">{{ caster.pronouns }}</span>
                </fitted-content>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useCasterStore } from 'client-shared/store/CasterStore';
import { isBlank } from '@iplsplatoon/vue-components';
import FittedContent from 'components/FittedContent.vue';
import gsap from 'gsap';

const casterStore = useCasterStore();

function castersEnter(element: HTMLElement, done: gsap.Callback) {
    gsap.to(element.querySelectorAll('.caster'), { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1, onComplete: done });
}
function castersLeave(element: HTMLElement, done: gsap.Callback) {
    gsap.to(element.querySelectorAll('.caster'), { opacity: 0, scale: 1.1, duration: 0.5, ease: 'power2.in', stagger: -0.1, onComplete: done });
}
function beforeCastersEnter(element: HTMLElement) {
    gsap.set(element.querySelectorAll('.caster'), { opacity: 0, scale: 0.9 });
}
</script>

<style lang="scss" scoped>
@use '../../styles/constants';

.caster-display-wrapper {
    position: absolute;
    bottom: 400px;
    left: 150px;
    width: calc(100% - 300px);
    display: flex;
    justify-content: space-around;
}

.caster {
    background-color: constants.$accent-1a;
    border-radius: 12px;
    color: constants.$text-color-2;
    width: 400px;
    padding: 0 16px;
    font-size: 38px;
    position: relative;
    filter: constants.$drop-shadow;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.05;
        mix-blend-mode: soft-light;
        border-radius: 16px;
        background:
            linear-gradient(to bottom, #fff 0%, transparent 24px, transparent calc(100% - 24px), #fff 100%),
            linear-gradient(to right, #fff 0%, transparent 24px, transparent calc(100% - 24px), #fff 100%);
    }
}

.pronouns {
    background-color: white;
    border-radius: 4px;
    font-size: 26px;
    padding: 0 4px;
    color: #222;
    line-height: 32px;
    display: inline-block;
    transform: translateY(-3px);
}
</style>
