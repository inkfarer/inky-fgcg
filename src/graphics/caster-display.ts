import './styles/graphics-common.scss';

import { createApp } from 'vue';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import { createPinia } from 'pinia';
import CasterDisplayGraphic from './pages/caster-display/CasterDisplayGraphic.vue';
import { initCasterStore } from 'client-shared/store/CasterStore';

(async () => {
    const app = createApp(CasterDisplayGraphic);
    installCommonHelpers(app);
    app.use(createPinia());
    await initCasterStore();
    app.mount('#app');
})();
