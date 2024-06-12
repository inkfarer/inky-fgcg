import './styles/graphics-common.scss';

import { createApp } from 'vue';
import { installCommonHelpers } from './helpers/InstallCommonHelpers';
import { createPinia } from 'pinia';
import GameplayGraphic from './pages/gameplay/GameplayGraphic.vue';
import { initActiveMatchStore } from 'client-shared/store/ActiveMatchStore';

(async () => {
    const app = createApp(GameplayGraphic);
    installCommonHelpers(app);
    app.use(createPinia());
    await initActiveMatchStore();
    app.mount('#app');
})();
