"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token, router]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <header className="marketing-topbar">
        <Link href="/" className="brand-lockup brand-lockup--compact">
          <span className="brand-mark" aria-hidden="true">
            ◌
          </span>
          <span className="brand-copy">
            <span className="brand-name">ChangeEnv</span>
            <span className="brand-tag">Green Credit Economy</span>
          </span>
        </Link>

        <nav className="marketing-links">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/actions">Challenges</Link>
          <Link href="/login" className="pill pill-accent">
            Sign in
          </Link>
          <Link href="/signup" className="pill pill-ghost">
            Join free
          </Link>
        </nav>
      </header>

      <main className="auth-split">
        <section className="auth-copy card">
          <p className="eyebrow">Sign In</p>
          <h1>Welcome back to ChangeEnv</h1>
          <p className="auth-intro">
            Access your wallet, log actions, and review your offset trail.
          </p>

          <form onSubmit={onSubmit} className="login-form">
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="user@changeenv.io"
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            {error ? <p className="error auth-error">{error}</p> : null}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="demo-section">
            <p className="demo-label">Try a demo account</p>
            <div className="demo-grid">
              <article>
                <span>User</span>
                <strong>user@changeenv.io</strong>
              </article>
              <article>
                <span>Organization</span>
                <strong>org@changeenv.io</strong>
              </article>
              <article>
                <span>Business</span>
                <strong>business@changeenv.io</strong>
              </article>
              <article>
                <span>Admin</span>
                <strong>admin@changeenv.io</strong>
              </article>
            </div>
          </div>

          <p className="auth-switch">
            New here? <Link href="/signup">Create an account</Link>
          </p>
        </section>

        <aside className="auth-visual card" aria-hidden="true">
          <div className="auth-visual-overlay" />
          <div className="auth-visual-copy">
            <span>Carbon offset trail</span>
            <strong>Transparent credit economy</strong>
          </div>
        </aside>
      </main>
    </div>
  );
}
