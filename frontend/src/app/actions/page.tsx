"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { ecoService } from "@/services/ecoService";

const actionOptions = [
  { type: "transport", label: "Transport", hint: "0.192 kg CO₂ / km" },
  { type: "energy", label: "Energy", hint: "0.42 kg CO₂ / kWh" },
  { type: "treePlanting", label: "Tree Planting", hint: "21 kg CO₂ / tree / yr" },
  { type: "waste", label: "Waste reduction", hint: "1.8 kg CO₂ / kg" },
];

export default function ActionsPage() {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState("transport");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const category = useMemo(
    () => actionOptions.find((option) => option.type === selectedType) ?? actionOptions[0],
    [selectedType]
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!user?.id) {
      setError("User not loaded.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await ecoService.createAction(user.id, selectedType, quantity);
      setDescription("");
      setQuantity(10);
      setSuccess("Eco action submitted successfully.");
    } catch {
      setError("Failed to create eco action.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <section className="actions-page-head">
        <div>
          <p className="eyebrow">New eco-action</p>
          <h1>Log a verifiable action</h1>
          <p>
            Pick a category, describe what you did, and enter the quantity. The carbon
            engine converts your entry into Green Credits.
          </p>
        </div>
      </section>

      <section className="action-types">
        {actionOptions.map((option) => (
          <button
            key={option.type}
            type="button"
            className={option.type === selectedType ? "type-card active" : "type-card"}
            onClick={() => setSelectedType(option.type)}
          >
            <span className="type-icon">◌</span>
            <strong>{option.label}</strong>
            <p>{option.hint}</p>
          </button>
        ))}
      </section>

      <section className="actions-form card">
        <form onSubmit={onSubmit} className="action-log-form">
          <label>
            <span>Category</span>
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              {actionOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="e.g. Cycled 10 km to work instead of driving"
              rows={4}
            />
          </label>

          <label>
            <span>{selectedType === "treePlanting" ? "Trees planted" : "km avoided (by car)"}</span>
            <input
              type="number"
              min={1}
              step="0.01"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </label>

          {error ? <p className="error">{error}</p> : null}
          {success ? <p className="success">{success}</p> : null}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit & earn credits"}
          </button>
        </form>
      </section>

      <div className="actions-footer">
        <Link href="/dashboard">Back to dashboard</Link>
        <span>Current category: {category.label}</span>
      </div>
    </AppShell>
  );
}
