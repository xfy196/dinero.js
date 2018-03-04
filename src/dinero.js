import { Defaults, Globals } from './settings'
import Assert from './assert'

const Dinero = options => {
  const { amount, currency } = Object.assign(
    {},
    {
      amount: Defaults.defaultAmount,
      currency: Defaults.defaultCurrency
    },
    options
  )

  /**
   * Uses ES5 function notation so `this` can be passed through call, apply and bind
   * @ignore
   */
  const create = function(options) {
    const obj = Object.assign(
      {},
      Object.assign({}, { amount, currency }, options),
      Object.assign({}, { locale: this.locale }, options)
    )
    return Object.assign(
      Dinero({ amount: obj.amount, currency: obj.currency }),
      {
        locale: obj.locale
      }
    )
  }

  return {
    /**
     * Returns the amount.
     * @return {Number}
     */
    getAmount() {
      return amount
    },
    /**
     * Returns the currency.
     * @return {String}
     */
    getCurrency() {
      return currency
    },
    /**
     * Returns the locale.
     * @return {String}
     */
    getLocale() {
      return this.locale || Dinero.globalLocale
    },
    /**
     * Returns a new Dinero object with an embedded locale.
     * @param {String} newLocale - The new locale as a BCP 47 language tag
     * @return {Dinero}
     */
    setLocale(newLocale) {
      return create.call(this, { locale: newLocale })
    },
    /**
     * Returns a new Dinero object that represents the sum of this and an other Dinero object.
     * @param {Dinero} addend - The Dinero object to add.
     * @return {Dinero}
     *
     */
    add(addend) {
      return create.call(this, {
        amount: this.getAmount() + addend.getAmount()
      })
    },
    /**
     * Returns a new Dinero object that represents the difference of this and an other Dinero object.
     * @param  {Dinero} subtrahend - The Dinero object to subtract.
     * @return {Dinero}
     */
    subtract(subtrahend) {
      return create.call(this, {
        amount: this.getAmount() - subtrahend.getAmount()
      })
    },
    /**
     * Returns a new Dinero object that represents the multiplied value by the given factor.
     * @param  {Number} multiplier - The factor to multiply by.
     * @return {Dinero}
     */
    multiply(multiplier) {
      return create.call(this, { amount: this.getAmount() * multiplier })
    },
    /**
     * Returns a new Dinero object that represents the divided value by the given factor.
     * @param  {Number} divisor - The factor to divide by.
     * @return {Dinero}
     */
    divide(divisor) {
      return create.call(this, { amount: this.getAmount() / divisor })
    },
    /**
     * Returns a new Dinero object that represents a percentage of this.
     * @param  {Number} percentage - The percentage to extract.
     * @return {Dinero}
     */
    percentage(percentage) {
      Assert.isPercentage(percentage)
      return this.multiply(percentage / 100)
    },
    /**
     * Checks whether the value represented by this object equals to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    equalsTo(comparator) {
      return this.hasSameAmount(comparator) && this.hasSameCurrency(comparator)
    },
    /**
     * Checks whether the value represented by this object is less than the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    lessThan(comparator) {
      return this.getAmount() < comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is less than or equal to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    lessThanOrEqual(comparator) {
      return this.getAmount() <= comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is greater than the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    greaterThan(comparator) {
      return this.getAmount() > comparator.getAmount()
    },
    /**
     * Checks whether the value represented by this object is greater than or equal to the other.
     * @param  {Dinero} comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    greaterThanOrEqual(comparator) {
      return this.getAmount() >= comparator.getAmount()
    },
    /**
     * Checks if the value represented by this object is zero.
     * @return {Boolean}
     */
    isZero() {
      return this.getAmount() === 0
    },
    /**
     * Checks if the value represented by this object is positive.
     * @return {Boolean}
     */
    isPositive() {
      return this.getAmount() >= 0
    },
    /**
     * Checks if the value represented by this object is negative.
     * @return {Boolean}
     */
    isNegative() {
      return this.getAmount() < 0
    },
    /**
     * Checks if this has cents.
     * @return {Boolean}
     */
    hasCents() {
      return !Number.isInteger(this.toUnit())
    },
    /**
     * Checks whether the currency represented by this object equals to the other.
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    hasSameCurrency(comparator) {
      return this.getCurrency() === comparator.getCurrency()
    },
    /**
     * Checks whether the amount represented by this object equals to the other.
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     * @return {Boolean}
     */
    hasSameAmount(comparator) {
      return this.getAmount() === comparator.getAmount()
    },
    /**
     * Returns this object formatted as a string.
     * @todo Better formatting options
     * @return {String}
     */
    toFormat(options) {
      options = Object.assign(
        {
          locale: Dinero.globalLocale,
          display: Dinero.globalDisplay,
          grouping: Dinero.globalGrouping,
          decimalPlaces: Dinero.globalDecimalPlaces
        },
        options
      )
      return this.toUnit().toLocaleString(options.locale, {
        style: 'currency',
        currencyDisplay: options.display,
        useGrouping: options.grouping,
        minimumFractionDigits: options.decimalPlaces,
        currency: this.getCurrency()
      })
    },
    /**
     * Returns the amount represented by this object in units.
     * @return {Number}
     */
    toUnit() {
      return this.getAmount() / 100
    },
    /**
     * Return the object's data as an object literal
     * @return {Object}
     */
    toObject() {
      return {
        amount,
        currency
      }
    }
  }
}

export default Object.assign(Dinero, Globals)
