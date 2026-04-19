// Strategy pattern contract for carbon credit calculation.
export abstract class BaseStrategy {
  abstract calculate(quantity: number): number;
}
