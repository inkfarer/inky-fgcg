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
                <fitted-content align="center">
                    <span class="caster-name">{{ caster.name }}</span> <span v-show="!isBlank(caster.pronouns)" class="pronouns">{{ caster.pronouns }}</span>
                </fitted-content>
                <div
                    v-if="caster.socials.length > 0"
                    class="caster-social-wrapper"
                >
                    <font-awesome-icon
                        v-if="caster.socials[0].type !== 'none'"
                        :icon="['fab', caster.socials[0].type]"
                        class="caster-social-icon"
                    />
                    <fitted-content align="center">
                        <span class="caster-social">{{ caster.socials[0].username }}</span>
                    </fitted-content>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useCasterStore } from 'client-shared/store/CasterStore';
import { isBlank } from '@iplsplatoon/vue-components';
import FittedContent from 'components/FittedContent.vue';
import gsap from 'gsap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBluesky } from '@fortawesome/free-brands-svg-icons/faBluesky';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faTwitch } from '@fortawesome/free-brands-svg-icons/faTwitch';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBluesky, faTwitter, faTwitch);

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
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    grid-template-rows: 1fr;
    justify-items: center;
}

.caster {
    background-color: constants.$accent-1a;
    border-radius: 12px;
    color: constants.$text-color-2;
    width: 400px;
    padding: 0 16px;
    position: relative;
    filter: constants.$drop-shadow;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;

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

.caster-name {
    font-size: 45px;
    height: 45px;
    font-weight: 500;
}

.caster-social-wrapper {
    margin-top: -12px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.85;
}

.caster-social-icon {
    font-size: 24px;
    margin-right: 4px;
    transform: translateY(2px);
}

.caster-social {
    font-size: 28px;
    height: 32px;
}

.pronouns {
    background-color: white;
    border-radius: 4px;
    font-size: 22px;
    padding: 2px 4px;
    color: #222;
    line-height: 24px;
    display: inline-block;
    transform: translateY(-5px);
    margin-left: 4px;
}
</style>
