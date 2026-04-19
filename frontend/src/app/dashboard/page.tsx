"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { ecoService } from "@/services/ecoService";
import { walletService } from "@/services/walletService";
import type { EcoAction, Transaction, Wallet } from "@/types/api";

const formatCredits = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);

const actionTypeLabel: Record<string, string> = {
  transport: "Transport",
  energy: "Energy",
  treePlanting: "Tree Planting",
  waste: "Waste",
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [actions, setActions] = useState<EcoAction[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [walletData, transactionData, actionData] = await Promise.all([
          walletService.getWallet(),
          walletService.getTransactions(),
          ecoService.listActions(),
        ]);

        setWallet(walletData);
        setTransactions(transactionData);
        setActions(actionData);
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const totalOffset = actions.reduce((sum, action) => {
    if (action.status !== "APPROVED") {
      return sum;
    }

    return sum + action.carbonImpact;
  }, 0);

  const lifetimeEarned = transactions.reduce((sum, transaction) => {
    if (transaction.type === "SPEND") {
      return sum - transaction.amount;
    }

    return sum + transaction.amount;
  }, 0);

  return (
    <AppShell>
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Member dashboard</p>
          <h1>Hi {user?.name ?? "there"}, keep the streak growing.</h1>
        </div>

        <div className="dashboard-actions">
          <Link href="/actions" className="primary-button primary-button--small">
            Log action
          </Link>
          <Link href="/analytics" className="secondary-button secondary-button--small">
            AI tips
          </Link>
        </div>
      </section>

      {error ? <p className="error dashboard-error">{error}</p> : null}

      <section className="stat-grid">
        <article className="stat-card card">
          <span className="stat-label">Wallet balance</span>
          <strong>{formatCredits(wallet?.balance ?? 0)}</strong>
          <p>green credits</p>
          <Link href="/wallet">View transactions →</Link>
        </article>

        <article className="stat-card card">
          <span className="stat-label">CO₂ offset</span>
          <strong>{formatCredits(totalOffset)}</strong>
          <p>kg CO₂e logged</p>
        </article>

        <article className="stat-card card">
          <span className="stat-label">Lifetime earned</span>
          <strong>{formatCredits(lifetimeEarned)}</strong>
          <p>credits across all actions</p>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-panel card dashboard-panel--wide">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Recent eco-actions</p>
              <h2>Approved and pending activity</h2>
            </div>
            <Link href="/actions">Log another</Link>
          </div>

          {loading ? <p className="muted">Loading recent actions...</p> : null}

          <div className="action-feed">
            {actions.map((action) => (
              <article key={action.id} className="action-row">
                <div>
                  <span className={`action-chip ${action.type}`}>
                    {actionTypeLabel[action.type] ?? action.type}
                  </span>
                  <strong>{actionTypeLabel[action.type] ?? action.type}</strong>
                  <p>
                    qty {formatCredits(action.quantity)} · {formatCredits(action.carbonImpact)} kg
                    CO₂e
                  </p>
                </div>
                <span className="action-credits">
                  {action.status === "APPROVED"
                    ? `+${formatCredits(action.carbonImpact)}`
                    : action.status}
                </span>
              </article>
            ))}

            {actions.length === 0 && !loading ? (
              <p className="muted">No eco-actions yet. Log your first one from the Actions page.</p>
            ) : null}
          </div>
        </article>

        <aside className="dashboard-panel card dashboard-panel--side">
          <p className="eyebrow">Next steps</p>
          <h2>Move from logging to offsetting.</h2>
          <ul className="next-list">
            <li>
              <Link href="/marketplace">Join a sustainability challenge →</Link>
            </li>
            <li>
              <Link href="/marketplace">List unused credits for sale →</Link>
            </li>
            <li>
              <Link href="/analytics">Get AI-personalised tips →</Link>
            </li>
          </ul>
        </aside>
      </section>
    </AppShell>
  );
}
