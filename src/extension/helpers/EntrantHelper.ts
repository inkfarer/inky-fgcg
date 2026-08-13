import { Entrant, Entrants } from 'types/schemas';
import cloneDeep from 'lodash/cloneDeep';

export function getEntrant(entrants: Entrants, entrantId: string): Entrant {
    const result = entrants.find(entrant => entrant.id === entrantId);
    if (result == null) {
        throw new Error(`Could not find entrant with ID "${entrantId}"`);
    }
    return cloneDeep(result);
}
