import { App } from 'vue';
import { isBlank } from '@iplsplatoon/vue-components';
import { addDots } from 'client-shared/helpers/StringHelper';

export function installCommonHelpers(app: App): void {
    if (!window.obsstudio) {
        document.getElementById('app')!.style.backgroundColor = '#333';
    }

    app.config.globalProperties.$helpers = {
        addDots,
        isBlank
    };
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $helpers: {
            addDots: typeof addDots
            isBlank: typeof isBlank
        }
    }
}
