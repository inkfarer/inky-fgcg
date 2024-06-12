export function addDots(value: string, maxLength?: number): string;
export function addDots(value: string | undefined | null, maxLength?: number): string | undefined | null;
export function addDots(value: string | undefined | null, maxLength = 48): string | undefined | null {
    const rolloff = '...';

    if (!value) return value;
    if (value.length > maxLength) {
        return value.substring(0, maxLength - rolloff.length) + rolloff;
    }

    return value;
}

export function isBlank(value: unknown): boolean {
    return typeof value !== 'string' || value.trim() === '';
}
