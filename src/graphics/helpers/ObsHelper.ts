import { ObsEvent } from '../types/obs';
import { onMounted, onUnmounted } from 'vue';

export function bindEntranceToFunction(fn: () => void): void {
    if (window.obsstudio !== undefined) {
        const sourceActiveListener = (e: ObsEvent) => {
            if (e.detail.active) {
                fn();
            }
        };

        onMounted(() => {
            window.addEventListener('obsSourceActiveChanged', sourceActiveListener);
        });

        onUnmounted(() => {
            window.removeEventListener('obsSourceActiveChanged', sourceActiveListener);
        });
    }
    // Not in OBS Source
    else {
        document.body.ondblclick = () => {
            fn();
        };
    }
}
