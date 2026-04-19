import { BaseStrategy } from "./BaseStrategy.js";

export class TransportStrategy extends BaseStrategy {
  calculate(quantity: number) {
    return quantity * 0.2;
  }
}
