const cache = new Map<string, Promise<string | null>>();

/**
 * build 時讀 GitHub repo 的 About（description）。
 * 任何失敗（離線、限流、repo 不存在）都回 null，由呼叫端退回 frontmatter，build 不能因此失敗。
 */
export function repoAbout(repoUrl: string): Promise<string | null> {
  let pending = cache.get(repoUrl);
  if (!pending) {
    pending = fetchAbout(repoUrl);
    cache.set(repoUrl, pending);
  }
  return pending;
}

async function fetchAbout(repoUrl: string): Promise<string | null> {
  const repo = new URL(repoUrl).pathname.replace(/^\/|\/$/g, '');
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const { description } = (await res.json()) as { description?: unknown };
    return typeof description === 'string' && description.trim() ? description.trim() : null;
  } catch {
    return null;
  }
}
