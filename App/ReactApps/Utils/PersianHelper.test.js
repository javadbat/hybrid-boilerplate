import { expect, test } from '@jest/globals';
import {faToEnDigits, enToFaDigits} from './PersianHelper';

test('farsi to en number',()=>{
    expect(faToEnDigits('۱۲۳')).toBe('123');
});
test('en to farsi number',()=>{
    expect(enToFaDigits('123')).toBe('۱۲۳');
});