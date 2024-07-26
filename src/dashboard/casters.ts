import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import { initCasterStore } from 'client-shared/store/CasterStore';
import CastersPanel from './pages/Casters/CastersPanel.vue';
import { IplExpandingSpaceGroup } from '@iplsplatoon/vue-components';

(async () => {
    const app = createApp(CastersPanel);
    // Registered globally so it can be used by vuedraggable
    app.component('IplExpandingSpaceGroup', IplExpandingSpaceGroup);
    app.use(createPinia());
    await initCasterStore();
    setUpErrorHandler(app);
    app.mount('#app');
})();
