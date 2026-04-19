"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { walletService } from "@/services/walletService";
import type { Transaction, Wallet } from "@/types/api";

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [walletData, txData] = await Promise.all([
          walletService.getWallet(),
          walletService.getTransactions(),
        ]);
        setWallet(walletData);
        setTransactions(txData);
      } catch {
        setError("Wallet endpoint not available yet in backend.");
      }
    };

    void load();
  }, []);

  return (
    <AppShell>
      <div className="grid two">
        <section className="panel card">
          <h3>Wallet Balance</h3>
          <p className="muted">Current credits</p>
          <h2>{wallet?.balance ?? 0}</h2>
          {error ? <p className="error">{error}</p> : null}
        </section>

        <section className="panel card">
          <h3>Transactions</h3>
          <div className="list">
            {transactions.map((tx) => (
              <article key={tx.id} className="item">
                <strong>{tx.type}</strong>
                <p className="meta">
                  Amount: {tx.amount} | {new Date(tx.timestamp).toLocaleString()}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
