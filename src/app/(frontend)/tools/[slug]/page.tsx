import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const tools = [
  {
    slug: 'signalflow-ai',
    name: 'SignalFlow AI',
    category: 'Automation',
    summary: 'Builds multi-step marketing and sales workflows from plain-language prompts.',
    pricing: 'Freemium',
    rating: '4.9',
    bestFor: 'Revenue teams that need repeatable campaign, CRM, and handoff automation.',
    features: ['Prompt-to-workflow builder', 'CRM enrichment', 'Approval checkpoints'],
  },
  {
    slug: 'canvasforge',
    name: 'CanvasForge',
    category: 'Image',
    summary: 'Creates product visuals, ad variants, and social-ready brand assets in minutes.',
    pricing: 'Paid',
    rating: '4.8',
    bestFor: 'Marketing teams producing campaign visuals across many channels.',
    features: ['Brand kit controls', 'Batch creative generation', 'Ad format resizing'],
  },
  {
    slug: 'briefpilot',
    name: 'BriefPilot',
    category: 'Writing',
    summary: 'Turns scattered research into polished strategy briefs, summaries, and reports.',
    pricing: 'Free trial',
    rating: '4.7',
    bestFor: 'Consultants, operators, and founders who turn research into decisions.',
    features: ['Source-aware summaries', 'Brief templates', 'Executive-ready exports'],
  },
  {
    slug: 'devnest',
    name: 'DevNest',
    category: 'Code',
    summary: 'Reviews pull requests, drafts tests, and maps technical debt across repositories.',
    pricing: 'Paid',
    rating: '4.8',
    bestFor: 'Engineering teams that want AI assistance inside review and QA loops.',
    features: ['Pull request review', 'Test plan drafting', 'Repository risk mapping'],
  },
]

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = tools.find((item) => item.slug === slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">N</span>
          <span>NavFox</span>
        </Link>
        <nav className="top-nav" aria-label="Primary navigation">
          <Link href="/#tools">AI Tools</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#guides">Guides</Link>
          <a href="/admin" target="_blank">
            Admin
          </a>
        </nav>
        <Link className="submit-link" href="/">
          Back home
        </Link>
      </header>

      <main className="detail-layout">
        <aside className="detail-sidebar" aria-label="Tool summary">
          <div className="tool-icon large">{tool.name.slice(0, 1)}</div>
          <h2>{tool.name}</h2>
          <p>{tool.summary}</p>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{tool.category}</dd>
            </div>
            <div>
              <dt>Pricing</dt>
              <dd>{tool.pricing}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>{tool.rating}</dd>
            </div>
          </dl>
        </aside>

        <article className="detail-content">
          <p className="eyebrow">AI tool profile</p>
          <h1>{tool.name}</h1>
          <p className="hero-text">{tool.bestFor}</p>

          <section>
            <h2>Key features</h2>
            <div className="feature-grid">
              {tool.features.map((feature) => (
                <div className="feature-card" key={feature}>
                  <span>Feature</span>
                  <strong>{feature}</strong>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Directory note</h2>
            <p>
              This profile is structured like a curated AI directory entry: short positioning,
              practical use cases, pricing signal, and a quick comparison surface for buyers.
            </p>
          </section>
        </article>
      </main>

      <footer className="site-footer">
        <div>
          <strong>NavFox</strong>
          <p>Curated AI tools, categories, and practical adoption guides.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/#tools">Tools</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#guides">Guides</Link>
        </nav>
      </footer>
    </div>
  )
}
