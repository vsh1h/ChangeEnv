"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { analyticsService } from "@/services/analyticsService";
import type { AnalyticsSummary } from "@/types/api";

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await analyticsService.getSummary();
        setSummary(data);
      } catch {
        setError("Unable to load analytics. Ensure you are logged in as ADMIN.");
      }
    };

    void load();
  }, []);

  return (
    <AppShell>
      <div className="grid two">
        <section className="panel card">
          <h3>Total Credits</h3>
          <h2>{summary?.totalCredits ?? 0}</h2>
        </section>
        <section className="panel card">
          <h3>Total Actions</h3>
          <h2>{summary?.totalActions ?? 0}</h2>
        </section>
        <section className="panel card">
          <h3>Flagged Count</h3>
          <h2>{summary?.flaggedCount ?? 0}</h2>
        </section>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </AppShell>
  );
}
