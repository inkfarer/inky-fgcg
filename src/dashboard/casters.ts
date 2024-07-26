import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { initCasterStore } from 'client-shared/store/CasterStore';
import CastersPanel from './pages/Casters/CastersPanel.vue';

(async () => {
    const app = createApp(CastersPanel);
    app.use(createPinia());
    await initCasterStore();
    setUpErrorHandler(app);
    app.mount('#app');
})();
