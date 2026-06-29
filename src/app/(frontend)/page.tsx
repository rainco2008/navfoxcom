import Link from 'next/link'
import React from 'react'

import './styles.css'

const categories = [
  { name: 'Productivity', count: 666, active: true },
  { name: 'Business', count: 1636 },
  { name: 'Automation', count: 539 },
  { name: 'Image', count: 421 },
  { name: 'Video', count: 312 },
  { name: 'Writing', count: 288 },
  { name: 'Code', count: 184 },
  { name: 'Audio', count: 156 },
]

const tools = [
  {
    slug: 'signalflow-ai',
    name: 'SignalFlow AI',
    category: 'Automation',
    summary: 'Builds multi-step marketing and sales workflows from plain-language prompts.',
    pricing: 'Freemium',
    rating: '4.9',
    tags: ['Agents', 'CRM', 'No-code'],
  },
  {
    slug: 'canvasforge',
    name: 'CanvasForge',
    category: 'Image',
    summary: 'Creates product visuals, ad variants, and social-ready brand assets in minutes.',
    pricing: 'Paid',
    rating: '4.8',
    tags: ['Design', 'Ads', 'Brand'],
  },
  {
    slug: 'briefpilot',
    name: 'BriefPilot',
    category: 'Writing',
    summary: 'Turns scattered research into polished strategy briefs, summaries, and reports.',
    pricing: 'Free trial',
    rating: '4.7',
    tags: ['Research', 'Docs', 'Teams'],
  },
  {
    slug: 'devnest',
    name: 'DevNest',
    category: 'Code',
    summary: 'Reviews pull requests, drafts tests, and maps technical debt across repositories.',
    pricing: 'Paid',
    rating: '4.8',
    tags: ['Code', 'Review', 'Testing'],
  },
]

const stats = [
  ['4,000+', 'Curated AI tools'],
  ['350k+', 'Monthly AI adopters'],
  ['120+', 'Workflow guides'],
]

export default async function HomePage() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">N</span>
          <span>NavFox</span>
        </Link>
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#tools">AI Tools</a>
          <a href="#categories">Categories</a>
          <a href="#guides">Guides</a>
          <a href="/admin" target="_blank">
            Admin
          </a>
        </nav>
        <a className="submit-link" href="/admin" target="_blank">
          Submit tool
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">AI directory for practical adoption</p>
            <h1>Find the right AI tools for every workflow.</h1>
            <p className="hero-text">
              Discover, compare, and shortlist AI products across business, automation,
              content, design, coding, and team productivity.
            </p>
            <form className="search-bar">
              <input aria-label="Search AI tools" placeholder="Search tools, categories, or use cases" />
              <button type="submit">Search</button>
            </form>
            <div className="hero-tags" aria-label="Popular searches">
              <a href="#tools">AI agents</a>
              <a href="#tools">Image generators</a>
              <a href="#tools">Sales automation</a>
              <a href="#tools">Writing assistants</a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Directory highlights">
            {stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="directory-layout" id="tools">
          <aside className="sidebar" aria-label="Tool filters">
            <div>
              <h2>Browse by category</h2>
              <p>Filter the directory by use case, team function, and output format.</p>
            </div>
            <div className="category-list" id="categories">
              {categories.map((category) => (
                <a
                  className={category.active ? 'category-pill is-active' : 'category-pill'}
                  href="#tools"
                  key={category.name}
                >
                  <span>{category.name}</span>
                  <span>{category.count}</span>
                </a>
              ))}
            </div>
          </aside>

          <section className="tool-section" aria-label="Featured AI tools">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Featured directory</p>
                <h2>Trending AI tools</h2>
              </div>
              <a href="#categories">View all categories</a>
            </div>

            <div className="tool-grid">
              {tools.map((tool) => (
                <article className="tool-card" key={tool.slug}>
                  <div className="tool-card-header">
                    <div className="tool-icon">{tool.name.slice(0, 1)}</div>
                    <div>
                      <h3>{tool.name}</h3>
                      <p>{tool.category}</p>
                    </div>
                  </div>
                  <p>{tool.summary}</p>
                  <div className="tag-row">
                    {tool.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="tool-meta">
                    <span>{tool.pricing}</span>
                    <span>{tool.rating} rating</span>
                  </div>
                  <Link href={`/tools/${tool.slug}`}>View details</Link>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="guide-band" id="guides">
          <div>
            <p className="eyebrow">Workflow guides</p>
            <h2>Go beyond lists. Learn which tools fit the job.</h2>
          </div>
          <div className="guide-list">
            <a href="#tools">Best AI tools for business operations</a>
            <a href="#tools">How to compare automation platforms</a>
            <a href="#tools">AI stack ideas for marketing teams</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>NavFox</strong>
          <p>Curated AI tools, categories, and practical adoption guides.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#tools">Tools</a>
          <a href="#categories">Categories</a>
          <a href="#guides">Guides</a>
          <a href="/admin" target="_blank">
            Admin
          </a>
        </nav>
      </footer>
    </div>
  )
}
