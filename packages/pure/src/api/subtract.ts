import {
  unsafeSubtract as coreUnsafeSubtract,
  safeSubtract as coreSafeSubtract,
} from '@dinero.js/core';
import {
  subtract,
  add,
  compare,
  multiply,
  power,
  halfEven,
  zero,
} from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';

/**
 * Unsafely subtract the passed pure Dinero objects.
 *
 * @param minuend The pure Dinero object to subtract from.
 * @param subtrahend The pure Dinero object to subtract.
 *
 * @returns A new pure Dinero object.
 */
export const unsafeSubtract = buildMethod(coreUnsafeSubtract, { subtract });

/**
 * Subtract the passed pure Dinero objects.
 *
 * @param minuend The pure Dinero object to subtract from.
 * @param subtrahend The pure Dinero object to subtract.
 *
 * @returns A new pure Dinero object.
 */
export const safeSubtract = buildMethod(coreSafeSubtract, {
  subtract,
  add,
  compare,
  multiply,
  power,
  round: halfEven,
  zero,
});
