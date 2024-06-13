import './styles/common.scss';

import { createApp } from 'vue';
import EntrantImportPanel from './pages/EntrantImport/EntrantImportPanel.vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';

(async () => {
    const app = createApp(EntrantImportPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    installCommonHelpers(app, false);
    app.mount('#app');
})();
