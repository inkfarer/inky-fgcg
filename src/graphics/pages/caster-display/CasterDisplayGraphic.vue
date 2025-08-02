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
                class="caster-shadow"
            >
                <div class="caster">
                    <fitted-content
                        align="center"
                        class="caster-name-wrapper"
                    >
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
    const casterElems = element.querySelectorAll('.caster-shadow');
    gsap.to(casterElems, { scaleX: 1, duration: 0.5, ease: 'power4.out', stagger: 0.1, onComplete: done });
    gsap.to(casterElems, { opacity: 1, duration: 0.25, ease: 'none', stagger: 0.1, onComplete: done });
}
function castersLeave(element: HTMLElement, done: gsap.Callback) {
    const casterElems = element.querySelectorAll('.caster-shadow');
    gsap.to(casterElems, { opacity: 0, duration: 0.25, delay: 0.25, ease: 'none', stagger: 0.1 });
    gsap.to(casterElems, { scaleX: 0.75, duration: 0.5, ease: 'power4.in', stagger: 0.1, onComplete: done });
}
function beforeCastersEnter(element: HTMLElement) {
    gsap.set(element.querySelectorAll('.caster-shadow'), { opacity: 0, scaleX: 1.25 });
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
}

.caster-shadow {
    filter:
        drop-shadow(8px 0 0 constants.$accent-2)
        drop-shadow(-8px 0 0 constants.$accent-2);
}

.caster {
    @include constants.skew-mask-x-inverse(11px);

    background-color: constants.$accent-1a;
    color: constants.$text-color-2;
    max-width: 400px;
    margin: 0 16px;
    padding: 0 20px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.caster-name-wrapper {
    margin-top: -4px;
}

.caster-name {
    font-size: 38px;
    font-weight: 500;
}

.caster-social-wrapper {
    margin-top: -6px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.85;
}

.caster-social-icon {
    font-size: 20px;
    margin-right: 4px;
    transform: translateY(2px);
}

.caster-social {
    font-size: 24px;
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
