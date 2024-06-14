import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { initIntermissionStore } from 'client-shared/store/IntermissionStore';
import IntermissionPanel from './pages/Intermission/IntermissionPanel.vue';

(async () => {
    const app = createApp(IntermissionPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    installCommonHelpers(app, false);
    await initIntermissionStore();
    app.mount('#app');
})();
