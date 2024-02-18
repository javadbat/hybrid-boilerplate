import { expect, test } from '@jest/globals';
import {NumberSeparator} from './number-helper';

test('separate number',()=>{
    expect(NumberSeparator(12345)).toBe('12,345');
});