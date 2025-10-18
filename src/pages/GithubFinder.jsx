import React, { useEffect, useState, useRef } from "react";
import RepoList from "./RepoList";

/**
 * GithubFinder (lint-friendly, no .env)
 *
 * If you want to use a GitHub token (optional), add a script in your index.html:
 *   <script>window.__GITHUB_TOKEN = "ghp_xxx";</script>
 *
 * Warning: do NOT commit or publish the token. This approach is for local/dev convenience only.
 */
export default function GithubFinder() {
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState(null); // username to fetch (on submit)
  const [user, setUser] = useState(null); // user profile object
  const [repos, setRepos] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState(null);

  // Keep controllers in refs so we can abort previous requests
  const profileControllerRef = useRef(null);
  const reposControllerRef = useRef(null);

  // helper to get headers (with optional token from window.__GITHUB_TOKEN)
  const getHeaders = () => {
    const headers = { Accept: "application/vnd.github+json" };
    // use window.__GITHUB_TOKEN if provided; avoids using `process` in browser
    const token = typeof window !== "undefined" ? window.__GITHUB_TOKEN : undefined;
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  };

  // fetch profile when `username` changes
  useEffect(() => {
    if (!username) return;

    // abort previous profile request
    if (profileControllerRef.current) {
      profileControllerRef.current.abort();
    }
    const controller = new AbortController();
    profileControllerRef.current = controller;

    async function fetchProfile() {
      setLoadingProfile(true);
      setError(null);
      setUser(null);
      setRepos([]); // clear repos while fetching
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
          signal: controller.signal,
          headers: getHeaders(),
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error("GitHub user not found (404)");
          if (res.status === 403) throw new Error("Rate limit or access forbidden (403)");
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err && err.name === "AbortError") return;
        setError(err && err.message ? err.message : "Failed to fetch profile");
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();

    return () => {
      controller.abort();
    };
  }, [username]);

  // fetch repos when user loads successfully
  useEffect(() => {
    if (!user || !user.login) return;

    // abort previous repos request
    if (reposControllerRef.current) {
      reposControllerRef.current.abort();
    }
    const controller = new AbortController();
    reposControllerRef.current = controller;

    async function fetchRepos() {
      setLoadingRepos(true);
      setError(null);
      try {
        // fetch first 100 repos sorted by updated
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(user.login)}/repos?per_page=100&sort=updated`,
          { signal: controller.signal, headers: getHeaders() }
        );

        if (!res.ok) {
          if (res.status === 404) throw new Error("Repos not found (404)");
          if (res.status === 403) throw new Error("Rate limit or access forbidden (403)");
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setRepos(data);
      } catch (err) {
        if (err && err.name === "AbortError") return;
        setError(err && err.message ? err.message : "Failed to fetch repos");
      } finally {
        setLoadingRepos(false);
      }
    }

    fetchRepos();

    return () => {
      controller.abort();
    };
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a GitHub username");
      return;
    }
    setUsername(trimmed);
  }

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h2>GitHub User Finder</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          aria-label="GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter GitHub username (e.g. gaearon)"
          style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "8px 12px", borderRadius: 6 }}>
          Search
        </button>
      </form>

      {error && (
        <div style={{ color: "crimson", marginBottom: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {loadingProfile && <div>Loading profile…</div>}

      {!loadingProfile && user && (
        <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            style={{ width: 120, height: 120, borderRadius: 8, objectFit: "cover" }}
          />
          <div>
            <h3 style={{ margin: 0 }}>{user.name || user.login}</h3>
            <p style={{ margin: "6px 0" }}>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                @{user.login}
              </a>
            </p>
            {user.bio && <p style={{ margin: "6px 0", color: "#444" }}>{user.bio}</p>}
            <p style={{ margin: "6px 0", color: "#666" }}>
              <strong>Followers:</strong> {user.followers} • <strong>Following:</strong> {user.following} •{" "}
              <strong>Public repos:</strong> {user.public_repos}
            </p>
            {user.location && (
              <p style={{ margin: "6px 0", color: "#666" }}>
                <strong>Location:</strong> {user.location}
              </p>
            )}
          </div>
        </div>
      )}

      {user && (
        <>
          <h4 style={{ marginTop: 8 }}>Repositories</h4>
          {loadingRepos ? (
            <div>Loading repos…</div>
          ) : (
            <RepoList repos={repos} />
          )}
        </>
      )}

      {!user && !loadingProfile && (
        <div style={{ color: "#555" }}>
          Try searching for usernames like <code>gaearon</code>, <code>torvalds</code> or <code>octocat</code>.
        </div>
      )}

      <div style={{ marginTop: 18, fontSize: 13, color: "#666" }}>
        Note: unauthenticated requests are rate-limited (60/hr). To increase limits set <code>window.__GITHUB_TOKEN</code>{" "}
        in your index.html with a personal access token (local use only).
      </div>
    </div>
  );
}
