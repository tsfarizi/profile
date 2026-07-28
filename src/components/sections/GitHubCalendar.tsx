import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { profile } from '../../data/profile';

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  updated_at: string;
  language: string | null;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

const WEEKS = 20;
const DAYS = 7;
const GITHUB_USERNAME = profile.username;

const levelColors = {
  light: ['bg-parchment-dark/50', 'bg-sage/20', 'bg-sage/40', 'bg-sage/70', 'bg-sage'],
  dark: ['bg-d-surface-3/50', 'bg-gold/15', 'bg-gold/30', 'bg-gold/50', 'bg-gold'],
};

const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function buildGrid(events: GitHubEvent[], repos: GitHubRepo[]): { grid: number[][]; total: number } {
  const now = new Date();
  const startDate = getStartOfWeek(now);
  startDate.setDate(startDate.getDate() - (WEEKS - 1) * 7);

  const dateMap = new Map<string, number>();

  for (const event of events) {
    const date = event.created_at.split('T')[0];
    dateMap.set(date, (dateMap.get(date) || 0) + 1);
  }

  for (const repo of repos) {
    const date = repo.updated_at.split('T')[0];
    dateMap.set(date, (dateMap.get(date) || 0) + 0.5);
  }

  const grid: number[][] = [];
  let total = 0;

  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + w * 7 + d);
      const dateStr = formatDate(date);

      if (date > now) {
        week.push(-1);
        continue;
      }

      const count = dateMap.get(dateStr) || 0;
      const level = getLevel(count);
      week.push(level);

      if (level === 1) total += 1;
      else if (level === 2) total += 3;
      else if (level === 3) total += 6;
      else if (level === 4) total += 10;
    }
    grid.push(week);
  }

  return { grid, total };
}

export default function GitHubCalendar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = isDark ? levelColors.dark : levelColors.light;

  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [eventsRes, reposRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal }),
        ]);

        if (eventsRes.ok) setEvents(await eventsRes.json());
        if (reposRes.ok) setRepos(await reposRes.json());
        if (userRes.ok) setUser(await userRes.json());
      } catch {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  const { grid, total } = useMemo(() => buildGrid(events, repos), [events, repos]);

  const stats = user
    ? { repos: user.public_repos, followers: user.followers, following: user.following, gists: user.public_gists, stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0) }
    : { repos: profile.stats.repositories, followers: profile.stats.followers, following: profile.stats.following, gists: 0, stars: profile.stats.stars };

  return (
    <section id="github" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-surface' : 'bg-parchment-dark'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>
            Activity
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-gold/0 to-gold" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold flex-shrink-0" aria-hidden="true">
              <path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-gold/0 to-gold" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-2xl border p-6 ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className={`font-body text-sm ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
              {loading ? (
                <span className="inline-block h-4 w-48 animate-pulse rounded bg-gold/20" />
              ) : (
                <>
                  <span className={`font-semibold ${isDark ? 'text-d-text' : 'text-navy'}`}>{total}</span> contributions in the last {WEEKS} weeks
                </>
              )}
            </p>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-body text-xs transition-colors duration-300 ${isDark ? 'text-gold hover:text-gold-light' : 'text-burgundy hover:text-burgundy-light'}`}
            >
              View full profile →
            </a>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-flex gap-1">
              <div className="flex flex-col gap-1 mr-1">
                {dayLabels.map((label, i) => (
                  <span key={i} className={`h-3 w-8 font-body text-[9px] flex items-center ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                    {label}
                  </span>
                ))}
              </div>

              {grid.map((week, w) => (
                <div key={w} className="flex flex-col gap-1">
                  {week.map((level, d) => (
                    <motion.div
                      key={`${w}-${d}`}
                      className={`h-3 w-3 rounded-sm ${
                        level === -1 ? 'opacity-0' : colors[level]
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: level === -1 ? 0 : 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (w * DAYS + d) * 0.002, duration: 0.2 }}
                      title={level === -1 ? '' : level === 0 ? 'No contributions' : `${level} contribution${level > 1 ? 's' : ''}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-1 mt-3">
            <span className={`font-body text-[9px] mr-1 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>Less</span>
            {colors.map((color, i) => (
              <div key={i} className={`h-2.5 w-2.5 rounded-sm ${color}`} />
            ))}
            <span className={`font-body text-[9px] ml-1 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>More</span>
          </div>

          <div className={`grid grid-cols-4 gap-4 mt-6 pt-6 border-t ${isDark ? 'border-d-border' : 'border-gold/20'}`}>
            {[
              { label: 'Repos', value: stats.repos },
              { label: 'Stars', value: stats.stars ?? 0 },
              { label: 'Followers', value: stats.followers },
              { label: 'Following', value: stats.following },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`font-display text-xl font-bold ${isDark ? 'text-d-text' : 'text-navy'}`}>
                  {loading ? <span className="inline-block h-5 w-10 animate-pulse rounded bg-gold/20" /> : stat.value}
                </div>
                <div className={`font-body text-[10px] mt-0.5 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
