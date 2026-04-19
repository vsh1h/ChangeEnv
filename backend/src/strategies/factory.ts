import { TransportStrategy } from "./TransportStrategy.js";

// Strategy factory selects the calculator implementation by action type.
export function getStrategy(type: string) {
  if (type === "transport") return new TransportStrategy();
  throw new Error("Invalid type");
}
