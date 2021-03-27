import { Dinero } from '../types';
import { equal } from '../utils';
import { Dependencies } from './types';

export function hasSubUnits<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: Dependencies<TAmount, TDinero, 'compare' | 'modulo' | 'power' | 'zero'>) {
  const equalFn = equal(calculator);

  return function _hasSubUnits(dineroObject: TDinero) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return !equalFn(
      calculator.modulo(amount, calculator.power(currency.base, scale)),
      calculator.zero()
    );
  };
}
