import './styles/common.scss';

import { createApp } from 'vue';
import EntrantImportPanel from './pages/EntrantImport/EntrantImportPanel.vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { initTournamentDataStore } from 'client-shared/store/TournamentDataStore';

(async () => {
    const app = createApp(EntrantImportPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    installCommonHelpers(app, false);
    await initTournamentDataStore();
    app.mount('#app');
})();
