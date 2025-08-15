import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initEntrantStore } from 'client-shared/store/EntrantStore';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import ActiveMatchPanel from './pages/ActiveMatch/ActiveMatchPanel.vue';
import { initActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { initRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

(async () => {
    const app = createApp(ActiveMatchPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    installCommonHelpers(app, false);
    await Promise.all([
        initEntrantStore(),
        initActiveMatchStore(),
        initRuntimeConfigStore()
    ]);
    app.mount('#app');
})();
