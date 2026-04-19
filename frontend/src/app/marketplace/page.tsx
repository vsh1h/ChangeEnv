"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { marketplaceService } from "@/services/marketplaceService";
import type { MarketplaceOrder } from "@/types/api";

export default function MarketplacePage() {
  const [orders, setOrders] = useState<MarketplaceOrder[]>([]);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const data = await marketplaceService.listOrders();
      setOrders(data);
      setError("");
    } catch {
      setError("Marketplace endpoint not available yet in backend.");
      setOrders([]);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  const onExecute = async (orderId: string) => {
    try {
      await marketplaceService.executeOrder(orderId);
      await loadOrders();
    } catch {
      setError("Failed to execute order.");
    }
  };

  return (
    <AppShell>
      <section className="panel card">
        <h3>Marketplace Orders</h3>
        {error ? <p className="error">{error}</p> : null}
        <div className="list">
          {orders.map((order) => (
            <article key={order.id} className="item">
              <strong>Order #{order.id.slice(0, 8)}</strong>
              <p className="meta">
                Amount: {order.amount} | State: {order.state}
              </p>
              {order.state === "CREATED" ? (
                <button onClick={() => onExecute(order.id)}>Execute Purchase</button>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
