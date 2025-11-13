import { useEffect, useState } from 'react'

// Design tokens approximating GoCardless aesthetic
const tokens = {
  colors: {
    primary: '#0B5FFF', // brand blue
    ink: '#0A1429', // deep navy/ink
    bg: '#FFFFFF',
    surface: '#F8FAFF',
    subtleSurface: '#EFF4FF',
    gray600: '#64748B',
    gray500: '#6B7280',
    gray300: '#E5E7EB',
    gray200: '#EEF2FF',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    border: '#E5E7EB',
  },
  typography: {
    fontSans: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    h1: 'text-4xl sm:text-5xl lg:text-6xl tracking-tight font-semibold',
    h2: 'text-3xl sm:text-4xl tracking-tight font-semibold',
    h3: 'text-2xl tracking-tight font-semibold',
    body: 'text-base sm:text-lg leading-7',
    small: 'text-sm leading-6',
  },
  radius: {
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  },
  shadow: {
    sm: 'shadow-[0_2px_10px_rgba(10,20,41,0.06)]',
    md: 'shadow-[0_8px_30px_rgba(10,20,41,0.08)]',
  },
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/75 ${scrolled ? 'shadow-sm' : ''}`} role="banner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="font-semibold text-xl tracking-tight text-slate-900" aria-label="Groveno home">
            Groveno
          </a>
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            <a className="text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B5FFF] rounded" href="#product">Product</a>
            <a className="text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B5FFF] rounded" href="#pricing">Pricing</a>
            <a className="text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B5FFF] rounded" href="#docs">Docs</a>
            <a className="text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B5FFF] rounded" href="#signin">Sign in</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#get-started" className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#0B5FFF] hover:bg-[#0A55E0] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B5FFF] rounded-lg">Get Started</a>
          </div>
        </div>
      </div>
    </header>
  )
}

function Badge({ children, tone = 'default' }) {
  const bg = {
    default: 'bg-slate-100 text-slate-700',
    blue: 'bg-[#EEF2FF] text-[#0B5FFF]',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    gray: 'bg-slate-100 text-slate-700',
  }[tone]
  return <span className={`inline-flex items-center ${tokens.radius.full} px-2.5 py-1 text-xs font-medium ${bg} border border-slate-200`}>{children}</span>
}

function Button({ variant = 'primary', children, href = '#', onClick }) {
  const base = 'inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors'
  const styles = {
    primary: `${base} bg-[#0B5FFF] text-white hover:bg-[#0A55E0] focus-visible:ring-[#0B5FFF]`,
    secondary: `${base} bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 focus-visible:ring-slate-300`,
    ghost: `${base} bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300`,
  }
  const className = styles[variant]
  if (href) return <a href={href} className={className}>{children}</a>
  return <button onClick={onClick} className={className}>{children}</button>
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white ${tokens.radius.lg} border border-slate-200 ${tokens.shadow.sm} ${className}`}>
      {children}
    </div>
  )
}

function Section({ id, kicker, title, subtitle, children, align = 'center' }) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
          {kicker && <div className="mb-4"><Badge tone="blue">{kicker}</Badge></div>}
          {title && <h2 className={`${tokens.typography.h2} text-slate-900`}>{title}</h2>}
          {subtitle && <p className={`mt-4 ${tokens.typography.body} text-slate-600`}>{subtitle}</p>}
        </div>
        <div className="mt-10 sm:mt-14">
          {children}
        </div>
      </div>
    </section>
  )
}

function HeroVariant({ reverse = false }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
      <div className={reverse ? 'order-2 lg:order-1' : ''}>
        <h1 className={`${tokens.typography.h1} text-slate-900`}>Automated rent reminders that tenants actually see.</h1>
        <p className={`mt-5 ${tokens.typography.body} text-slate-600`}>Multi-channel reminders (SMS, Email, WhatsApp) sent at the right time, in the right timezone—so you get paid on time, every time.</p>
        <div className="mt-8 flex items-center gap-3">
          <Button variant="primary" href="#get-started">Get Started</Button>
          <Button variant="secondary" href="#how">See How It Works</Button>
        </div>
        <div className="mt-6 flex items-center gap-3 text-slate-600">
          <img src="/assets/checkcircle.svg" alt="" className="h-5 w-5"/>
          <span className="text-sm">Free during beta. No card required.</span>
        </div>
      </div>
      <div className={`${reverse ? 'order-1 lg:order-2' : ''}`}>
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#EFF4FF] to-transparent rounded-3xl"/>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700"><img src="/assets/bell.svg" alt="Bell" className="h-5 w-5"/> Reminders</div>
              <Badge tone="green">Sync: OK</Badge>
            </div>
            <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-50 text-slate-600 text-xs font-medium px-4 py-2">
                <div className="col-span-4">Tenant</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-3 text-right">Action</div>
              </div>
              {[
                { name: 'Alex M', amount: '$1,250', status: 'Due Today', tone: 'amber' },
                { name: 'Sofia R', amount: '$980', status: 'Unpaid', tone: 'gray' },
                { name: 'Jamal K', amount: '$1,400', status: 'Overdue', tone: 'default' },
              ].map((t, i) => (
                <div key={i} className="grid grid-cols-12 items-center px-4 py-3 border-t border-slate-100">
                  <div className="col-span-4 font-medium text-slate-900">{t.name}</div>
                  <div className="col-span-2 text-slate-700">{t.amount}</div>
                  <div className="col-span-3"><Badge tone={t.tone}>{t.status}</Badge></div>
                  <div className="col-span-3 flex justify-end"><Button variant="secondary">Mark as paid</Button></div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-slate-500">Default sequence: T-3, T0, T+3 (configurable later).</div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ValueGrid() {
  const items = [
    { title: 'Set & forget automation', desc: 'Create schedules once. We handle reminders every month—politely and on time.', icon: '/assets/calendar.svg' },
    { title: 'Multi-channel delivery', desc: 'Reach tenants on SMS, Email, and WhatsApp for maximum visibility.', icon: '/assets/channels.svg' },
    { title: 'Timezone & quiet hours smart', desc: 'Sends at 9am local by default and respects opt-outs.', icon: '/assets/bell.svg' },
    { title: 'Simple “Mark as paid”', desc: 'Keep your ledger clean with a single click, on any device.', icon: '/assets/checkcircle.svg' },
  ]
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((i) => (
        <Card key={i.title} className="p-6 hover:shadow-lg transition-shadow">
          <img src={i.icon} alt="" className="h-8 w-8"/>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">{i.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{i.desc}</p>
        </Card>
      ))}
    </div>
  )
}

function HowItWorks() {
  const steps = [
    { title: 'Add tenant & rent', desc: 'Enter amount, due day, and contact details.' },
    { title: 'We schedule reminders', desc: 'Pre-due, on-due, and post-due, per timezone.' },
    { title: 'You mark as paid', desc: 'We roll it to next month automatically.' },
  ]
  return (
    <ol className="relative border-l border-slate-200 pl-6 space-y-10">
      {steps.map((s, idx) => (
        <li key={idx} className="ml-2">
          <div className="absolute -left-2.5 mt-1 h-5 w-5 rounded-full border border-slate-300 bg-white"/>
          <h3 className="text-base font-semibold text-slate-900">{`Step ${idx+1}`} · {s.title}</h3>
          <p className="mt-2 text-slate-600 text-sm max-w-prose">{s.desc}</p>
        </li>
      ))}
      <p className="text-xs text-slate-500">Default sequence: T-3, T0, T+3 (configurable later).</p>
    </ol>
  )
}

function ChannelsStrip() {
  const chips = [
    { label: 'SMS' },
    { label: 'Email' },
    { label: 'WhatsApp' },
  ]
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {chips.map((c) => (
        <span key={c.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF2FF] text-[#0B5FFF] border border-slate-200 text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0B5FFF]"/>
          {c.label}
        </span>
      ))}
      <span className="text-sm text-slate-600">Send on all available channels for maximum visibility.</span>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#EFF4FF] to-transparent rounded-3xl"/>
      <img src="/assets/dashboard.svg" alt="Groveno dashboard preview" className="w-full rounded-2xl border border-slate-200 shadow"/>
    </div>
  )
}

function AccordionItem({ q, a, idx }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-4">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="w-full text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B5FFF] rounded">
        <span className="font-medium text-slate-900">{q}</span>
        <span className="text-slate-500">{open ? '–' : '+'}</span>
      </button>
      {open && <p className="mt-2 text-slate-600 text-sm">{a}</p>}
    </div>
  )
}

export default function App() {
  const faqs = [
    { q: 'Does this process payments?', a: 'Not in MVP; Groveno sends reminders only.' },
    { q: 'Which countries/timezones?', a: 'Global; IANA timezone aware scheduling.' },
    { q: 'Can I customize templates/schedules?', a: 'Defaults now; customization later on the roadmap.' },
    { q: 'What channels are supported?', a: 'SMS, Email, WhatsApp in the MVP.' },
    { q: 'What about opt-outs?', a: 'Reply STOP for SMS/WhatsApp; email unsubscribe handled.' },
    { q: 'Is there an admin role?', a: 'Basic role now; more controls are planned.' },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main>
        {/* Hero Variant A */}
        <section className="pt-12 sm:pt-16" aria-label="Hero">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HeroVariant />
          </div>
        </section>

        {/* Social proof strip */}
        <section aria-label="Social proof">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 rounded-xl border border-slate-200 p-4 sm:p-6 text-center text-sm text-slate-600 bg-slate-50">Built for independent landlords & small agencies</div>
          </div>
        </section>

        {/* Value props */}
        <Section id="product" kicker="Why Groveno" title="Everything you need to stop chasing rent" subtitle="A focused toolkit to automate reminders and keep your ledger clear.">
          <ValueGrid />
        </Section>

        {/* How it works */}
        <Section id="how" kicker="How it works" title="Three simple steps">
          <HowItWorks />
          <div className="mt-10">
            <ChannelsStrip />
          </div>
        </Section>

        {/* Dashboard preview */}
        <Section id="preview" kicker="Dashboard" title="Know who’s paid at a glance" subtitle="A simple overview that shows who’s paid and who needs a nudge.">
          <DashboardPreview />
        </Section>

        {/* Compliance */}
        <Section id="compliance" kicker="Compliance" title="Good messaging etiquette">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600">Groveno handles consent and opt-outs by default. SMS and WhatsApp messages include opt-out language (Reply STOP). We send within reasonable windows (9am local by default) and respect quiet hours.</p>
          </div>
        </Section>

        {/* Pricing */}
        <Section id="pricing" kicker="Pricing" title="Free during beta" subtitle="Paid plans coming soon.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Starter','Pro','Agency'].map((p, i) => (
              <Card key={p} className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">{p}</h3>
                <p className="mt-2 text-sm text-slate-600">Early access pricing. Feature placeholders.</p>
                <div className="mt-6"><Button variant="primary">Join waitlist</Button></div>
              </Card>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" kicker="FAQ" title="Answers at a glance" align="left">
          <div className="max-w-3xl">
            {faqs.map((f, i) => (
              <AccordionItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Section>

        {/* Hero Variant B (A/B) */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HeroVariant reverse />
          </div>
        </section>

        {/* Final CTA */}
        <Section id="get-started" title="Put rent reminders on autopilot.">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Contact Sales</Button>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            {[
              { h: 'Product', links: ['Overview','Pricing','Changelog','Roadmap'] },
              { h: 'Company', links: ['About','Blog','Careers','Contact'] },
              { h: 'Developers', links: ['Docs','API','Status','SDKs'] },
              { h: 'Legal', links: ['Privacy','Terms','DPA','Subprocessors'] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="font-semibold text-slate-900">{col.h}</h4>
                <ul className="mt-3 space-y-2 text-slate-600">
                  {col.links.map((l) => <li key={l}><a className="hover:text-slate-900" href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Groveno. All rights reserved.</span>
            <a href="/test" className="hover:text-slate-700">System status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
