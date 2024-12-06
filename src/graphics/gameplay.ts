import './styles/graphics-common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import GameplayGraphic from './pages/gameplay/GameplayGraphic.vue';
import { initActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { initAssetStore } from 'client-shared/store/AssetStore';
import { initRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

(async () => {
    const app = createApp(GameplayGraphic);
    installCommonHelpers(app);
    app.use(createPinia());
    await Promise.all([
        initActiveMatchStore(),
        initAssetStore(),
        initRuntimeConfigStore()
    ]);
    app.mount('#app');
})();
