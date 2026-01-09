<template>
    <canvas ref="backgroundCanvas" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { FillGradient } from 'pixi.js';

type ParticleDefinition = {
    graphics: PIXI.Graphics
    size: number
    speed: number
    wiggleIntensity: number
    wiggleOffset: number
    direction: number
};

const backgroundCanvas = ref<HTMLCanvasElement>();

onMounted(async () => {
    if (!backgroundCanvas.value) {
        throw new Error('Missing canvas ref after mount');
    }

    const app = new PIXI.Application();

    onUnmounted(() => {
        app.destroy();
    });

    await app.init({
        canvas: backgroundCanvas.value,
        width: 1920,
        height: 1080,
        backgroundAlpha: 0
    });

    const particleContainer = new PIXI.Container();
    app.stage.addChild(particleContainer);

    function createOrUpdateParticle(definition: Partial<ParticleDefinition>): ParticleDefinition {
        // Bias towards small particles
        if (Math.random() > 0.75) {
            definition.size = gsap.utils.random(15, 40);
        } else {
            definition.size = gsap.utils.random(2, 8);
        }
        if (definition.graphics == null) {
            definition.graphics = new PIXI.Graphics();
            definition.graphics.circle(0, 0, 40);
        }
        const fillInnerRadius = Math.random() > 0.75 ? gsap.utils.random(0.35, 0.45) : gsap.utils.random(0, 0.1);
        const fill = new FillGradient({
            type: 'radial',
            center: { x: 0.5, y: 0.5 },
            innerRadius: fillInnerRadius,
            outerCenter: { x: 0.5, y: 0.5 },
            outerRadius: 0.5,
            colorStops: [
                { offset: 0, color: { r: 255, g: 255, b: 255, a: 1 } },
                { offset: 1, color: { r: 255, g: 255, b: 255, a: 0 } }
            ],
            textureSpace: 'local'
        });
        definition.graphics.fill(fill);
        definition.graphics.scale = definition.size / 40;
        definition.graphics.alpha = gsap.utils.random(0.1, 0.9);
        definition.speed = (definition.size / 2) * gsap.utils.random(0.5, 1.5);
        definition.wiggleIntensity = gsap.utils.random(5, 50);
        definition.wiggleOffset = gsap.utils.random(0, 50);
        definition.direction = gsap.utils.random(0.5, 1.5);

        return definition as ParticleDefinition;
    }

    const particles: ParticleDefinition[] = [];
    for (let i = 0; i < 200; i++) {
        const definition = createOrUpdateParticle({ });
        definition.graphics.x = gsap.utils.random(app.canvas.width * -1, app.canvas.width);
        definition.graphics.y = gsap.utils.random(app.canvas.height * -1, app.canvas.height);
        particleContainer.addChild(definition.graphics);
        particles.push(definition);
    }

    let counter = 0;

    app.ticker.add(t => {
        for (const particle of particles) {
            if (particle.graphics.x >= app.canvas.width + particle.size || particle.graphics.y >= app.canvas.height + particle.size) {
                createOrUpdateParticle(particle);

                particle.graphics.x = gsap.utils.random(app.canvas.width * -1, app.canvas.width);
                particle.graphics.y = gsap.utils.random(app.canvas.height * -1, 0);
            }
            particle.graphics.x += (particle.speed * t.deltaTime);
            particle.graphics.y += (particle.speed * t.deltaTime * particle.direction) + Math.sin((counter + particle.wiggleOffset) / particle.wiggleIntensity);
        }

        counter += t.deltaTime;
    });
});
</script>

<style scoped lang="scss">
canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background: radial-gradient(circle at 50% 60%, #592EFF, #310080 95%);
}
</style>
