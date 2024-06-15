import './styles/common.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initBracketStore } from 'client-shared/store/BracketStore';
import { setUpErrorHandler } from './helpers/ErrorHandlerStore';
import BracketsPanel from './pages/brackets/BracketsPanel.vue';

(async () => {
    const app = createApp(BracketsPanel);
    app.use(createPinia());
    await initBracketStore();
    setUpErrorHandler(app);
    app.mount('#app');
})();
