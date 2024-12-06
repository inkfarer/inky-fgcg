import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { initRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import SettingsPanel from './pages/Settings/SettingsPanel.vue';

(async () => {
    const app = createApp(SettingsPanel);
    app.use(createPinia());
    await initRuntimeConfigStore();
    setUpErrorHandler(app);
    app.mount('#app');
})();
