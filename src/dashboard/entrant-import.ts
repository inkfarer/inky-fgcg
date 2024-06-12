import './styles/common.scss';

import { createApp } from 'vue';
import EntrantImportPanel from './pages/EntrantImport/EntrantImportPanel.vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';

(async () => {
    const app = createApp(EntrantImportPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    app.mount('#app');
})();
