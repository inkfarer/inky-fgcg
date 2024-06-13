import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initEntrantStore } from 'client-shared/store/EntrantStore';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { initNextMatchStore } from 'client-shared/store/NextMatchStore';
import NextMatchPanel from './pages/NextMatch/NextMatchPanel.vue';

(async () => {
    const app = createApp(NextMatchPanel);
    app.use(createPinia());
    setUpErrorHandler(app);
    await initEntrantStore();
    await initNextMatchStore();
    app.mount('#app');
})();
