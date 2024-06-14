import './styles/graphics-common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { initAssetStore } from 'client-shared/store/AssetStore';
import { initNextMatchStore } from 'client-shared/store/NextMatchStore';
import BottomBarGraphic from './pages/bottom-bar/BottomBarGraphic.vue';
import { initIntermissionStore } from 'client-shared/store/IntermissionStore';

(async () => {
    const app = createApp(BottomBarGraphic);
    installCommonHelpers(app);
    app.use(createPinia());
    await initNextMatchStore();
    await initAssetStore();
    await initIntermissionStore();
    app.mount('#app');
})();
