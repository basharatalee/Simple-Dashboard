import React from "react";

/**
 * Small presentational component for repo list
 *
 * props:
 *  - repos: array (from GitHub API)
 */
export default function RepoList({ repos = [] }) {
  if (!repos || repos.length === 0) {
    return <div style={{ color: "#666" }}>No repositories found.</div>;
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {repos.map((r) => (
        <a
          key={r.id}
          href={r.html_url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            border: "1px solid #eee",
            padding: 10,
            borderRadius: 8,
            textDecoration: "none",
            color: "inherit",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 600 }}>{r.name}</div>
              <div style={{ fontSize: 13, color: "#666" }}>{r.description}</div>
            </div>
            <div style={{ textAlign: "right", minWidth: 80 }}>
              <div style={{ fontSize: 12, color: "#333" }}>{r.language || "-"}</div>
              <div style={{ fontSize: 12, color: "#666" }}>★ {r.stargazers_count}</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
