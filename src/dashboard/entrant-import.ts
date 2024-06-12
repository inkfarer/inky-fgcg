import './styles/common.scss';

import { createApp } from 'vue';
import EntrantImportPanel from './pages/EntrantImport/EntrantImportPanel.vue';
import { createPinia } from 'pinia';
import { initEntrantStore } from 'client-shared/store/EntrantStore';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';

(async () => {
    const app = createApp(EntrantImportPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    await initEntrantStore();
    app.mount('#app');
})();
