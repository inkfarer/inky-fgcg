import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { initIntermissionStore } from 'client-shared/store/IntermissionStore';
import IntermissionPanel from './pages/Intermission/IntermissionPanel.vue';
import { initActiveMatchStore } from 'client-shared/store/ActiveMatchStore';

(async () => {
    const app = createApp(IntermissionPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    installCommonHelpers(app, false);
    await Promise.all([
        initIntermissionStore(),
        initActiveMatchStore()
    ]);
    app.mount('#app');
})();
