import { Dinero } from '../types';
import { minimum as min } from '../utils';
import { Dependencies } from './types';

export function minimum<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'compare'>) {
  const minFn = min(calculator);

  return function _minimum(dineroObjects: readonly TDinero[]) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = minFn(
      dineroObjects.map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
    );

    return factory({
      amount,
      currency,
      scale,
    });
  };
}
