"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/actions", label: "Actions" },
  { href: "/wallet", label: "Wallet" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/analytics", label: "Analytics" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const onLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <Link href="/dashboard" className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            ◌
          </span>
          <span className="brand-copy">
            <span className="brand-name">ChangeEnv</span>
            <span className="brand-tag">Green Credit Economy</span>
          </span>
        </Link>

        <nav className="app-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="app-userbar">
          <div className="user-meta">
            <span className="user-name">{user?.name ?? "Guest"}</span>
            <span className="role-pill">{user?.role ?? "Member"}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">{children}</main>
    </div>
  );
}
