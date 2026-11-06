import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Eye,
  Globe2,
  Menu,
  Route,
  ScanLine,
  ShieldCheck,
  X,
} from 'lucide-react';
import { MapContainer } from '@/components/map';

const intelligenceLayers = [
  {
    number: '01',
    title: 'Capture',
    description: 'Collect road imagery and field observations with consistent, repeatable coverage.',
    icon: ScanLine,
  },
  {
    number: '02',
    title: 'AI Detection',
    description: 'Turn inspection imagery into structured signals for defects, risks and maintenance needs.',
    icon: Eye,
  },
  {
    number: '03',
    title: 'GPS Mapping',
    description: 'Place every observation on the road network so teams can understand where action is needed.',
    icon: Globe2,
  },
  {
    number: '04',
    title: 'Intelligence',
    description: 'Bring observations, severity and status together to support faster infrastructure decisions.',
    icon: BarChart3,
  },
];

const stakeholders = [
  { title: 'City operations', description: 'Prioritise work across wards with a shared view of road health.', icon: Route },
  { title: 'Inspection teams', description: 'Move from field capture to actionable maintenance context.', icon: ScanLine },
  { title: 'Decision makers', description: 'Track coverage, trends and outcomes with confidence.', icon: ShieldCheck },
];

const linkClass = 'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-body-lg font-semibold transition-colors';

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-primary">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary">
              <Route className="h-5 w-5" />
            </span>
            <span className="text-heading-sm tracking-tight">Marg-Darshak</span>
          </Link>

          <nav className="hidden items-center gap-8 text-body-base text-white/75 lg:flex">
            <a href="#platform" className="hover:text-white">Platform</a>
            <a href="#intelligence" className="hover:text-white">Intelligence</a>
            <a href="#impact" className="hover:text-white">Impact</a>
            <Link to="/dashboard/geospatial" className="hover:text-white">Geospatial view</Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login" className="px-3 py-2 text-body-base font-semibold text-white/80 hover:text-white">Sign in</Link>
            <Link to="/dashboard" className={`${linkClass} bg-white text-primary hover:bg-neutral-100`}>Open workspace <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/15 bg-primary px-5 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 text-body-lg text-white/85">
              <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
              <a href="#intelligence" onClick={() => setMenuOpen(false)}>Intelligence</a>
              <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
              <Link to="/dashboard/geospatial" onClick={() => setMenuOpen(false)}>Geospatial view</Link>
              <Link to="/dashboard" className={`${linkClass} w-full bg-white text-primary`} onClick={() => setMenuOpen(false)}>Open workspace <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative min-h-[680px] overflow-hidden bg-primary">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=85')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 pb-20 pt-32 sm:px-8">
            <div className="max-w-3xl">
              <p className="mb-6 text-caption font-semibold tracking-[2px] text-white/65">URBAN INFRASTRUCTURE INTELLIGENCE</p>
              <h1 className="max-w-3xl text-[clamp(42px,7vw,78px)] font-semibold leading-[0.98] tracking-[-3px] text-white">
                Every road tells a story. See what needs to change.
              </h1>
              <p className="mt-7 max-w-xl text-body-lg leading-7 text-white/75 sm:text-[17px]">
                Marg-Darshak turns road inspection imagery and GPS observations into a clear, connected view of infrastructure health.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/dashboard" className={`${linkClass} bg-white text-primary hover:bg-neutral-100`}>Explore the platform <ArrowRight className="h-4 w-4" /></Link>
                <a href="#platform" className={`${linkClass} border border-white/35 text-white hover:bg-white/10`}>How it works <ChevronDown className="h-4 w-4" /></a>
              </div>
              <div className="mt-12 flex flex-wrap gap-8 text-body-sm text-white/65">
                <span><strong className="block text-body-lg text-white">128K+</strong> observations ready to understand</span>
                <span><strong className="block text-body-lg text-white">24 wards</strong> connected to one view</span>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-caption font-semibold tracking-[2px] text-info">THE PLATFORM</p>
              <h2 className="mt-4 max-w-xl text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-2px] text-primary">
                From road imagery to road intelligence.
              </h2>
            </div>
            <p className="max-w-2xl text-[17px] leading-8 text-neutral-600">
              Infrastructure teams need more than a list of defects. Marg-Darshak connects capture, detection, location and action so every observation becomes useful context for the people responsible for better streets.
            </p>
          </div>
          <div id="intelligence" className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {intelligenceLayers.map(({ number, title, description, icon: Icon }) => (
              <article key={title} className="group rounded-xl border border-neutral-200 bg-neutral-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-panel">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-semibold text-info">{number}</span>
                  <Icon className="h-6 w-6 text-primary transition group-hover:text-info" />
                </div>
                <h3 className="mt-12 text-heading-sm text-primary">{title}</h3>
                <p className="mt-3 text-body-base leading-6 text-neutral-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-neutral-50 px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-caption font-semibold tracking-[2px] text-info">SEE THE CITY CLEARLY</p>
              <h2 className="mt-4 text-[clamp(32px,4vw,50px)] font-semibold leading-[1.05] tracking-[-2px] text-primary">A living map of infrastructure health.</h2>
              <p className="mt-5 text-[16px] leading-7 text-neutral-600">
                Explore road networks, urban blocks and GPS-tagged detections in one operational workspace. Filter by severity and status to move from city-wide patterns to a single location.
              </p>
              <Link to="/dashboard/geospatial" className={`${linkClass} mt-8 bg-primary text-white hover:bg-primary-light`}>Open geospatial intelligence <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-2 shadow-panel">
              <div className="h-[420px] overflow-hidden rounded-lg">
                <MapContainer center={[12.9716, 77.5946]} zoom={11} style={{ height: '100%' }} />
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-caption font-semibold tracking-[2px] text-info">BUILT FOR BETTER DECISIONS</p>
            <h2 className="mt-4 text-[clamp(32px,4vw,50px)] font-semibold leading-[1.05] tracking-[-2px] text-primary">Make maintenance more visible, focused and accountable.</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {['Know what is changing', 'Prioritise with evidence', 'Measure the work that matters'].map((title, index) => (
              <div key={title} className="border-t-2 border-primary pt-5">
                <CheckCircle2 className="h-6 w-6 text-success" />
                <h3 className="mt-6 text-heading-sm text-primary">{title}</h3>
                <p className="mt-3 text-body-base leading-6 text-neutral-600">
                  {['See trends across locations and time before small issues become expensive interventions.', 'Give teams the severity, location and context needed to act on the right problems first.', 'Create a shared record of observations, maintenance status and infrastructure progress.'][index]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary px-5 py-24 text-white sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-caption font-semibold tracking-[2px] text-white/60">ONE PLATFORM, MANY TEAMS</p>
              <h2 className="mt-4 text-[clamp(32px,4vw,50px)] font-semibold leading-[1.05] tracking-[-2px]">A shared language for the people who keep cities moving.</h2>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {stakeholders.map(({ title, description, icon: Icon }) => (
                <article key={title} className="rounded-xl border border-white/15 bg-white/5 p-6">
                  <Icon className="h-6 w-6 text-white/80" />
                  <h3 className="mt-10 text-heading-sm">{title}</h3>
                  <p className="mt-3 text-body-base leading-6 text-white/65">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 text-center sm:px-8">
          <p className="text-caption font-semibold tracking-[2px] text-info">START WITH A CLEARER VIEW</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(34px,5vw,58px)] font-semibold leading-[1.02] tracking-[-2px] text-primary">The next road decision starts here.</h2>
          <Link to="/dashboard" className={`${linkClass} mt-8 bg-primary text-white hover:bg-primary-light`}>Enter the operations workspace <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </main>

      <footer className="bg-primary-dark px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary"><Route className="h-4 w-4" /></span>
              <span className="text-heading-sm">Marg-Darshak</span>
            </div>
            <p className="mt-3 max-w-sm text-body-sm text-white/55">Urban infrastructure intelligence for roads that work better for everyone.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-body-sm text-white/60">
            <Link to="/dashboard" className="hover:text-white">Operations overview</Link>
            <Link to="/dashboard/geospatial" className="hover:text-white">Geospatial intelligence</Link>
            <Link to="/login" className="hover:text-white">Sign in</Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-caption text-white/40">© 2026 Marg-Darshak · Illustrative platform data for demonstration</div>
      </footer>
    </div>
  );
}
