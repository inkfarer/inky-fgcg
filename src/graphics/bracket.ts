import './styles/graphics-common.scss';
import '@tourneyview/renderer/css/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { initBracketStore } from 'client-shared/store/BracketStore';
import BracketGraphic from './pages/bracket/BracketGraphic.vue';

(async () => {
    const app = createApp(BracketGraphic);
    installCommonHelpers(app);
    app.use(createPinia());
    await initBracketStore();
    app.mount('#app');
})();
