import './styles/graphics-common.scss';

import { createApp } from 'vue';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { createPinia } from 'pinia';
import IntermissionGraphic from './pages/intermission/IntermissionGraphic.vue';
import { initRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import { initIntermissionStore } from 'client-shared/store/IntermissionStore';

(async () => {
    const app = createApp(IntermissionGraphic);
    installCommonHelpers(app);
    app.use(createPinia());
    await Promise.all([
        initIntermissionStore(),
        initRuntimeConfigStore()
    ]);
    app.mount('#app');
})();
