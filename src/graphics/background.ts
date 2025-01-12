import './styles/graphics-common.scss';

import { createApp } from 'vue';
import { installCommonHelpers } from 'client-shared/helpers/InstallCommonHelpers';
import BackgroundGraphic from './pages/background/BackgroundGraphic.vue';

(async () => {
    const app = createApp(BackgroundGraphic);
    installCommonHelpers(app);
    app.mount('#app');
})();
