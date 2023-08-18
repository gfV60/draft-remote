import { describe, it } from 'vitest';
import doDraft from '../scripts/draft';

describe('something truthy and falsy', () => {
    it('true to be true', () => {
        doDraft();
    });

    it('false to be false', () => {
        expect(false).toBe(false);
    });
});