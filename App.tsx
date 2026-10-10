import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Compass, Globe2, HeartHandshake, Menu, MoveRight, ShieldCheck, Sparkles, X } from 'lucide-react'
import { destinations, tours, type Tour } from './data'

const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Destinations & Tours', to: '/tours' },
  { label: 'Itineraries', to: '/itineraries' },
  { label: 'About & Contact', to: '/about' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  return <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
    <div className="container-shell flex h-[76px] items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-3" aria-label="CLYN Travels home">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy text-sun"><Compass size={22} strokeWidth={2.2}/></span>
        <span className="leading-tight"><span className="block font-display text-lg font-extrabold tracking-[-.06em] text-navy">CLYN <span className="text-[#D5A91D]">TRAVELS</span></span><span className="block text-[9px] font-bold uppercase tracking-[.2em] text-slate-400">Go a little further</span></span>
      </Link>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        {navItems.map(item => <NavLink key={item.to} to={item.to} className={({isActive}) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-navy' : 'text-slate-500 hover:text-navy'}`}>{item.label}</NavLink>)}
      </nav>
      <Link to="/book" className="btn-primary hidden sm:inline-flex">Plan your trip <ArrowUpRight size={16}/></Link>
      <button className="rounded-xl border border-slate-200 p-2 text-navy lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="container-shell flex flex-col gap-1 pb-4 lg:hidden" aria-label="Mobile navigation">{navItems.map(item => <NavLink key={item.to} to={item.to} className={({isActive}) => `rounded-xl px-3 py-3 text-sm font-semibold ${isActive ? 'bg-sky text-navy' : 'text-slate-600'}`}>{item.label}</NavLink>)}<Link to="/book" className="btn-primary mt-2">Plan your trip <ArrowRight size={16}/></Link></nav>}
  </header>
}

function Footer() {
  return <footer className="mt-20 bg-[#0D2E50] text-white">
    <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><Link to="/" className="inline-flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sun"><Compass size={22}/></span><span className="font-display text-lg font-extrabold">CLYN TRAVELS</span></Link><p className="mt-4 max-w-sm text-sm leading-6 text-blue-100/70">Thoughtful travel inspiration for curious people. Explore Vietnam, Taiwan, and Thailand at your own pace.</p><p className="mt-4 text-xs text-blue-100/50">Independent travel inquiry website. Tour details are samples pending verification.</p></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-sun">Explore</p><div className="flex flex-col gap-3 text-sm text-blue-100/75"><Link to="/tours" className="hover:text-white">Destinations & tours</Link><Link to="/itineraries" className="hover:text-white">Sample itineraries</Link><Link to="/book" className="hover:text-white">Book a tour inquiry</Link></div></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-sun">Get in touch</p><p className="text-sm leading-6 text-blue-100/75">Company contact details to be added.</p><Link to="/about" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white">About CLYN <ArrowRight size={15}/></Link></div>
    </div>
    <div className="border-t border-white/10"><div className="container-shell flex flex-col justify-between gap-2 py-4 text-xs text-blue-100/50 sm:flex-row"><span>© {new Date().getFullYear()} CLYN Travels. All rights reserved.</span><span>Travel thoughtfully. Leave room for wonder.</span></div></div>
  </footer>
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="bg-cream py-14 md:py-20"><div className="container-shell max-w-4xl"><span className="eyebrow">{eyebrow}</span><h1 className="mt-4 text-4xl font-extrabold leading-tight text-navy sm:text-5xl md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">{description}</p></div></section>
}

function TourCard({ tour }: { tour: Tour }) {
  return <article className="card-lift overflow-hidden rounded-[22px] border border-slate-100 bg-white">
    <Link to={`/tours/${tour.id}`} className="group relative block h-56 overflow-hidden" aria-label={`View ${tour.name} details`}>
      <img src={tour.image} alt={`${tour.region} travel scenery`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"/>
      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-navy">{tour.country}</span>
      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-sun text-navy"><ArrowUpRight size={18}/></span>
    </Link>
    <div className="p-5">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-400"><span>{tour.region}</span><span>{tour.duration}</span></div>
      <h3 className="mt-3 text-xl font-extrabold text-navy"><Link to={`/tours/${tour.id}`} className="hover:underline">{tour.name}</Link></h3>
      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">{tour.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">{tour.highlights.slice(0,2).map(x => <span key={x} className="rounded-full bg-sky px-3 py-1.5 text-[11px] font-semibold text-[#315D83]">{x}</span>)}</div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs font-semibold text-slate-400">Pricing on request</span><Link to={`/book?tour=${tour.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-navy">Ask about this tour <ArrowRight size={15}/></Link></div>
    </div>
  </article>
}

function Home() {
  return <>
    <section className="relative isolate min-h-[610px] overflow-hidden bg-navy md:min-h-[650px]">
      <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=90" alt="Sunlit mountain lake and dramatic landscape" className="absolute inset-0 -z-20 h-full w-full object-cover"/>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A2948]/90 via-[#0A2948]/55 to-[#0A2948]/10"/>
      <div className="container-shell flex min-h-[610px] items-center py-16 md:min-h-[650px]">
        <div className="max-w-2xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur"><Sparkles size={14} className="text-sun"/> YOUR NEXT CHAPTER STARTS SOMEWHERE</span>
          <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.04] tracking-[-.06em] sm:text-6xl md:text-7xl">Find your kind<br/>of <span className="text-sun">somewhere.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/80 md:text-lg">From lantern-lit lanes to island-blue horizons, find inspiration for a trip that feels like yours.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/tours" className="btn-yellow">Explore destinations <ArrowRight size={17}/></Link><Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Start a booking inquiry <ArrowUpRight size={16}/></Link></div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-white/75"><span className="flex items-center gap-2"><Check size={15} className="text-sun"/> Thoughtful trip inspiration</span><span className="flex items-center gap-2"><Check size={15} className="text-sun"/> Flexible inquiry process</span><span className="flex items-center gap-2"><Check size={15} className="text-sun"/> Three destinations to explore</span></div>
        </div>
      </div>
      <div className="absolute bottom-6 right-8 hidden items-center gap-3 text-xs font-semibold text-white/70 md:flex"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></div>
    </section>
    <section className="container-shell py-16 md:py-24">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">Where to next?</span><h2 className="mt-4 max-w-xl text-3xl font-extrabold text-navy sm:text-4xl">Three destinations.<br/>A thousand ways to feel away.</h2></div><Link to="/tours" className="inline-flex items-center gap-2 text-sm font-bold text-navy">See all tours <MoveRight size={17}/></Link></div>
      <div className="mt-9 grid gap-5 md:grid-cols-3">{destinations.map((d, i) => <Link key={d.name} to={`/tours?destination=${d.name}`} className={`group relative min-h-[360px] overflow-hidden rounded-[24px] ${i === 1 ? 'md:translate-y-6' : ''}`}><img src={d.image} alt={`${d.name} destination`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-t from-[#071D32]/90 via-[#071D32]/15 to-transparent"/><span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy">{d.region}</span><div className="absolute inset-x-0 bottom-0 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.16em] text-sun">{d.tagline}</p><h3 className="mt-2 text-3xl font-extrabold">{d.name}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-white/80">{d.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">Explore destination <ArrowRight size={16}/></span></div></Link>)}</div>
    </section>
    <section className="bg-sky py-16 md:py-20"><div className="container-shell"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">Made for curious travelers</span><h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">A few ways to get away</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Browse our sample tour concepts. Final routes, inclusions, and pricing are confirmed only after an inquiry.</p></div><Link to="/tours" className="btn-primary">View all tours <ArrowRight size={16}/></Link></div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{tours.slice(0,3).map(t => <TourCard key={t.id} tour={t}/>)}</div></div></section>
    <section className="container-shell py-16 md:py-24"><div className="grid items-center gap-10 md:grid-cols-2"><div className="relative"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85" alt="Warm, welcoming restaurant setting" className="h-[420px] w-full rounded-[26px] object-cover"/><div className="absolute -bottom-5 right-4 max-w-[220px] rounded-2xl bg-sun p-5 shadow-soft sm:-right-5"><p className="font-display text-2xl font-extrabold text-navy">Travel, your way.</p><p className="mt-1 text-xs leading-5 text-navy/75">Start with an idea. We can discuss the details.</p></div></div><div className="md:pl-8"><span className="eyebrow">Why CLYN Travels</span><h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">The best trips feel personal.</h2><p className="mt-4 leading-7 text-slate-600">Travel planning should feel exciting, not overwhelming. CLYN Travels is designed to make exploring destinations and asking about a trip straightforward.</p><div className="mt-7 space-y-5">{[{icon:HeartHandshake,title:'A human-first approach',text:'Share what matters to you and use the inquiry to start a conversation.'},{icon:Globe2,title:'Focused destination inspiration',text:'Start exploring three distinctive destinations across Asia.'},{icon:ShieldCheck,title:'Clear, honest information',text:'No invented prices or live availability claims. Details are confirmed before you commit.'}].map(x=><div key={x.title} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream text-navy"><x.icon size={20}/></span><div><h3 className="font-bold text-navy">{x.title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{x.text}</p></div></div>)}</div></div></div></section>
    <section className="container-shell"><div className="relative overflow-hidden rounded-[28px] bg-navy px-6 py-12 text-center text-white sm:px-12 md:py-16"><div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[42px] border-white/5"/><div className="relative mx-auto max-w-2xl"><span className="eyebrow !text-blue-100">Your next trip is a conversation away</span><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Have a place in mind?</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-blue-100/75">Tell us your destination, dates, and group size. Send an inquiry to begin planning; submission is not a confirmed reservation.</p><Link to="/book" className="btn-yellow mt-7">Tell us about your trip <ArrowRight size={16}/></Link></div></div></section>
  </>
}

function ToursPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = searchParams.get('destination') || 'All'
  const [filter, setFilter] = useState(initial)
  const filtered = filter === 'All' ? tours : tours.filter(t => t.country === filter)
  const selectFilter = (value: string) => { setFilter(value); setSearchParams(value === 'All' ? {} : { destination: value }) }
  return <>
    <PageIntro eyebrow="Destinations & tours" title="Your next somewhere awaits." description="Browse sample journeys across Vietnam, Taiwan, and Thailand. Every package is a starting point; confirmed details depend on your dates and the final arrangements."/>
    <section className="container-shell py-12 md:py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-extrabold text-navy">Explore tour concepts</h2><p className="mt-2 text-sm text-slate-500">{filtered.length} sample {filtered.length === 1 ? 'tour' : 'tours'} · pricing on request</p></div><div className="flex flex-wrap gap-2" aria-label="Filter tours by destination">{['All','Vietnam','Taiwan','Thailand'].map(d=><button key={d} onClick={()=>selectFilter(d)} aria-pressed={filter===d} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${filter===d?'bg-navy text-white':'border border-slate-200 text-slate-600 hover:bg-sky'}`}>{d}</button>)}</div></div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(t=><TourCard key={t.id} tour={t}/>)}</div>
      <div className="mt-12 rounded-2xl border border-dashed border-[#c8d9e7] bg-sky/50 p-6 text-sm leading-6 text-slate-600"><strong className="text-navy">Please note:</strong> These are illustrative itinerary concepts, not verified or confirmed packages. Prices, inclusions, operating dates, transport, and availability must be confirmed before a booking is accepted.</div>
    </section>
  </>
}

function TourDetail() {
  const { pathname } = useLocation()
  const id = pathname.split('/').pop()
  const tour = tours.find(t => t.id === id)
  if (!tour) return <PageNotFound/>
  return <>
    <section className="relative isolate flex min-h-[390px] items-end overflow-hidden bg-navy py-12 md:min-h-[470px]"><img src={tour.image} alt={`${tour.region} scenery`} className="absolute inset-0 -z-20 h-full w-full object-cover"/><div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071D32]/90 via-[#071D32]/30 to-[#071D32]/5"/><div className="container-shell text-white"><Link to="/tours" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">← All tours</Link><div><span className="rounded-full bg-sun px-3 py-1.5 text-xs font-extrabold text-navy">{tour.country}</span><h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-6xl">{tour.name}</h1><p className="mt-4 max-w-2xl text-base text-white/80">{tour.description}</p><div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-white/80"><span>{tour.region}</span><span>·</span><span>{tour.duration}</span><span>·</span><span>Pricing on request</span></div></div></div></section>
    <section className="container-shell grid gap-10 py-12 md:grid-cols-[1fr_330px] md:py-16"><div><span className="eyebrow">Sample schedule</span><h2 className="mt-4 text-3xl font-extrabold text-navy">A day-by-day look</h2><p className="mt-3 text-sm leading-6 text-slate-500">This is a planning template. Specific activities, transfers, entry fees, and suppliers must be checked and confirmed.</p><div className="mt-8 space-y-4">{tour.itinerary.map((day,i)=><div key={day.day} className="relative flex gap-4 rounded-2xl border border-slate-100 p-5 sm:gap-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky text-xs font-extrabold text-navy">{String(i+1).padStart(2,'0')}</div><div><p className="text-xs font-bold uppercase tracking-wider text-[#64829C]">{day.day}</p><h3 className="mt-1 text-lg font-extrabold text-navy">{day.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{day.details}</p></div></div>)}</div><div className="mt-8"><h3 className="text-xl font-extrabold text-navy">Trip highlights</h3><ul className="mt-4 space-y-3">{tour.highlights.map(h=><li key={h} className="flex items-center gap-3 text-sm text-slate-600"><Check size={17} className="text-[#C49B12]"/>{h}</li>)}</ul></div></div><aside className="h-fit rounded-[24px] bg-cream p-6 md:sticky md:top-28"><span className="eyebrow">Make it yours</span><h3 className="mt-3 text-2xl font-extrabold text-navy">Interested in this trip?</h3><p className="mt-3 text-sm leading-6 text-slate-600">Share your preferred dates and group size to request details. No payment is taken on this website.</p><p className="mt-5 rounded-xl bg-white p-4 text-sm leading-6 text-slate-600">{tour.priceNote}</p><Link to={`/book?tour=${tour.id}`} className="btn-primary mt-5 w-full">Ask about this tour <ArrowRight size={16}/></Link><p className="mt-4 text-center text-xs leading-5 text-slate-400">Inquiry only · Not a confirmed reservation</p></aside></section>
  </>
}

function ItinerariesPage() {
  const [selected, setSelected] = useState(tours[0].id)
  const current = tours.find(t=>t.id===selected) || tours[0]
  return <>
    <PageIntro eyebrow="Itinerary inspiration" title="See how your days could unfold." description="Explore sample day-by-day routes before sending an inquiry. These schedules are planning examples, not verified operating itineraries."/>
    <section className="container-shell py-12 md:py-16"><div className="grid gap-8 md:grid-cols-[290px_1fr]"><aside><h2 className="text-xl font-extrabold text-navy">Choose an itinerary</h2><p className="mt-2 text-sm leading-6 text-slate-500">Select a sample tour to preview its daily flow.</p><div className="mt-5 space-y-2">{tours.map(t=><button key={t.id} onClick={()=>setSelected(t.id)} aria-pressed={selected===t.id} className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-left transition ${selected===t.id?'border-navy bg-sky':'border-slate-100 hover:border-slate-300'}`}><span><span className="block text-xs font-bold text-[#64829C]">{t.country} · {t.duration}</span><span className="mt-1 block text-sm font-extrabold text-navy">{t.name}</span></span>{selected===t.id&&<Check size={17} className="mt-1 shrink-0 text-navy"/>}</button>)}</div></aside><div><div className="overflow-hidden rounded-[24px] bg-white shadow-soft"><div className="relative h-56"><img src={current.image} alt={`${current.region} scenery`} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#071D32]/75 to-transparent"/><div className="absolute bottom-5 left-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-sun">{current.country} · {current.duration}</p><h2 className="mt-2 text-3xl font-extrabold">{current.name}</h2></div></div><div className="p-5 sm:p-7"><div className="space-y-0">{current.itinerary.map((d,i)=><div key={d.day} className="grid grid-cols-[72px_1fr] gap-4 border-b border-slate-100 py-5 last:border-0"><div className="pt-1 text-xs font-extrabold uppercase tracking-wider text-[#64829C]">{d.day}</div><div><h3 className="font-extrabold text-navy">{d.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{d.details}</p></div></div>)}</div><div className="mt-5 rounded-xl bg-cream p-4 text-sm leading-6 text-slate-600"><strong className="text-navy">Before you go:</strong> {current.priceNote} Confirm travel advisories, entry requirements, suppliers, and seasonal conditions before departure.</div><Link to={`/book?tour=${current.id}`} className="btn-primary mt-6">Ask about this itinerary <ArrowRight size={16}/></Link></div></div></div></div></section>
  </>
}

type FormValues = { fullName:string; email:string; phone:string; residence:string; tour:string; startDate:string; endDate:string; adults:string; children:string; requests:string }
const blankForm: FormValues = { fullName:'', email:'', phone:'', residence:'', tour:'', startDate:'', endDate:'', adults:'2', children:'0', requests:'' }

function BookingPage() {
  const [params] = useSearchParams()
  const [form, setForm] = useState<FormValues>({...blankForm, tour: params.get('tour') || ''})
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'demo'|'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const update = (key: keyof FormValues, value: string) => setForm(prev=>({...prev,[key]:value}))
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending'); setErrorMessage('')
    const payload = {...form, submittedAt: new Date().toISOString(), source: 'CLYN Travels website'}
    if (!scriptUrl) {
      try { const existing = JSON.parse(localStorage.getItem('clyn-demo-inquiries') || '[]'); existing.push(payload); localStorage.setItem('clyn-demo-inquiries', JSON.stringify(existing)); setStatus('demo') }
      catch { setStatus('error'); setErrorMessage('Your browser could not store this demo inquiry. Please try again.') }
      return
    }
    try {
      // Apps Script accepts URL-encoded fields without a CORS preflight. no-cors returns an opaque response,
      // so this confirms that the request was dispatched, not that a human has reviewed the inquiry.
      const body = new URLSearchParams()
      Object.entries(payload).forEach(([key,value])=>body.set(key,String(value ?? '')))
      await fetch(scriptUrl, { method:'POST', mode:'no-cors', body })
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('We could not send the inquiry. Please check your connection and try again.')
    }
  }
  const reset = () => { setForm(blankForm); setStatus('idle') }
  return <>
    <PageIntro eyebrow="Book a tour inquiry" title="Let’s plan something memorable." description="Tell us a little about your trip. This form sends an inquiry, not a confirmed reservation. Final pricing and availability must be confirmed separately."/>
    <section className="container-shell grid gap-8 py-12 md:grid-cols-[.75fr_1.25fr] md:py-16">
      <aside className="h-fit rounded-[24px] bg-navy p-6 text-white md:sticky md:top-28 md:p-8"><span className="eyebrow !text-blue-100">Start with the basics</span><h2 className="mt-4 text-3xl font-extrabold">Your trip, your pace.</h2><p className="mt-4 text-sm leading-6 text-blue-100/75">A few details help us understand what you have in mind. If your dates are flexible, let us know in the special requests field.</p><div className="mt-8 space-y-4">{[{title:'Choose a sample tour',text:'Pick a package or ask about a custom route.'},{title:'Share your dates',text:'Preferred dates help shape the conversation.'},{title:'Confirm the details',text:'Price, inclusions, and availability require follow-up.'}].map((x,i)=><div key={x.title} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-sun">{i+1}</span><div><p className="text-sm font-bold">{x.title}</p><p className="mt-1 text-xs leading-5 text-blue-100/65">{x.text}</p></div></div>)}</div><div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-4 text-xs leading-5 text-blue-100/70"><ShieldCheck size={17} className="mb-2 text-sun"/>Do not include passport numbers, payment card details, or other sensitive identity information in this form.</div></aside>
      <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-soft sm:p-8">
        {status==='success'||status==='demo' ? <div className="py-10 text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Check size={30}/></span><h2 className="mt-5 text-2xl font-extrabold text-navy">{status==='demo'?'Demo inquiry saved in this browser':'Inquiry request sent'}</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{status==='demo'?'This project is not connected to a backend yet. Your sample inquiry is stored only in this browser on this device and has not been sent to CLYN Travels. Configure the Google Apps Script URL to collect real inquiries.':'Your form request was dispatched to the configured endpoint. Because the browser cannot read the endpoint response, this is not proof of delivery or a confirmed booking. Please wait for direct confirmation from the travel team.'}</p><button onClick={reset} className="btn-primary mt-7">Send another inquiry</button></div> :
        <form onSubmit={submit} className="space-y-6">
          <div><h2 className="text-xl font-extrabold text-navy">Traveler details</h2><p className="mt-1 text-sm text-slate-500">Fields marked with * are required.</p></div>
          <div className="grid gap-5 sm:grid-cols-2"><div><label className="field-label" htmlFor="fullName">Full name *</label><input className="field" id="fullName" name="fullName" autoComplete="name" required value={form.fullName} onChange={e=>update('fullName',e.target.value)} placeholder="Your full name"/></div><div><label className="field-label" htmlFor="email">Email address *</label><input className="field" id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com"/></div><div><label className="field-label" htmlFor="phone">Phone number *</label><input className="field" id="phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="+63 ..."/></div><div><label className="field-label" htmlFor="residence">Country of residence *</label><input className="field" id="residence" name="residence" autoComplete="country-name" required value={form.residence} onChange={e=>update('residence',e.target.value)} placeholder="e.g. Philippines"/></div></div>
          <div className="border-t border-slate-100 pt-6"><h3 className="text-lg font-extrabold text-navy">Trip preferences</h3><div className="mt-4 grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><label className="field-label" htmlFor="tour">Selected tour package *</label><select className="field" id="tour" name="tour" required value={form.tour} onChange={e=>update('tour',e.target.value)}><option value="">Choose a sample tour</option>{tours.map(t=><option key={t.id} value={t.id}>{t.name} — {t.country}</option>)}<option value="custom">I’d like a custom itinerary</option></select></div><div><label className="field-label" htmlFor="startDate">Preferred start date *</label><input className="field" id="startDate" name="startDate" type="date" min={new Date().toISOString().slice(0,10)} required value={form.startDate} onChange={e=>update('startDate',e.target.value)}/></div><div><label className="field-label" htmlFor="endDate">Preferred end date</label><input className="field" id="endDate" name="endDate" type="date" min={form.startDate || new Date().toISOString().slice(0,10)} value={form.endDate} onChange={e=>update('endDate',e.target.value)}/></div><div><label className="field-label" htmlFor="adults">Number of adults *</label><select className="field" id="adults" name="adults" required value={form.adults} onChange={e=>update('adults',e.target.value)}>{Array.from({length:20},(_,i)=>i+1).map(n=><option key={n} value={n}>{n} {n===1?'adult':'adults'}</option>)}</select></div><div><label className="field-label" htmlFor="children">Number of children</label><select className="field" id="children" name="children" value={form.children} onChange={e=>update('children',e.target.value)}>{Array.from({length:11},(_,i)=>i).map(n=><option key={n} value={n}>{n} {n===1?'child':'children'}</option>)}</select></div><div className="sm:col-span-2"><label className="field-label" htmlFor="requests">Special requests or questions</label><textarea className="field min-h-[120px] resize-y" id="requests" name="requests" value={form.requests} onChange={e=>update('requests',e.target.value)} placeholder="Tell us about interests, accessibility needs, dietary requests, or flexible dates. Please don't include sensitive identity or payment details."/></div></div></div>
          {status==='error'&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>}
          <button type="submit" disabled={status==='sending'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">{status==='sending'?'Sending inquiry…':'Submit inquiry'} <ArrowRight size={16}/></button>
          <p className="text-center text-xs leading-5 text-slate-400">By submitting, you agree that your information may be used to respond to this inquiry. Add your finalized privacy policy before launching publicly.</p>
        </form>}
      </div>
    </section>
  </>
}

function AboutPage() {
  return <>
    <PageIntro eyebrow="About CLYN Travels" title="Good journeys begin with good questions." description="A welcoming starting point for travelers who want to explore Asia with more clarity and curiosity."/>
    <section className="container-shell grid items-center gap-10 py-12 md:grid-cols-2 md:py-16"><div><span className="eyebrow">Our approach</span><h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Make space for the moments you came for.</h2><p className="mt-5 leading-7 text-slate-600">CLYN Travels is presented here as a travel-planning brand focused on tour inspiration for Vietnam, Taiwan, and Thailand. The goal is to make it easy for travelers to explore sample journeys and start an inquiry.</p><p className="mt-4 leading-7 text-slate-600">Company history, registration details, team biographies, verified suppliers, and official contact channels have not yet been provided. These should be added and verified before the site is published as a live business.</p><Link to="/book" className="btn-primary mt-7">Start an inquiry <ArrowRight size={16}/></Link></div><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85" alt="Layered mountain ranges beneath a clear sky" className="h-[400px] w-full rounded-[26px] object-cover"/></section>
    <section className="bg-sky py-14 md:py-16"><div className="container-shell"><div className="max-w-2xl"><span className="eyebrow">Contact</span><h2 className="mt-4 text-3xl font-extrabold text-navy">Let's talk about your trip.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Official contact details are placeholders until supplied by the CLYN Travels team. For now, use the website inquiry form to test the intended contact flow.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</p><p className="mt-2 font-bold text-navy">To be provided</p><p className="mt-1 text-xs text-slate-500">Add a verified business email.</p></div><div className="rounded-2xl bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone / WhatsApp</p><p className="mt-2 font-bold text-navy">To be provided</p><p className="mt-1 text-xs text-slate-500">Add a monitored contact number.</p></div><div className="rounded-2xl bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Social media</p><p className="mt-2 font-bold text-navy">Links to be added</p><p className="mt-1 text-xs text-slate-500">Use official brand profiles only.</p></div></div></div></section>
  </>
}

function PageNotFound() {
  return <div className="container-shell py-24 text-center"><span className="eyebrow">Page not found</span><h1 className="mt-4 text-4xl font-extrabold text-navy">This path took a detour.</h1><Link to="/" className="btn-primary mt-7">Back to home</Link></div>
}

function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/tours" element={<ToursPage/>}/><Route path="/tours/:id" element={<TourDetail/>}/><Route path="/itineraries" element={<ItinerariesPage/>}/><Route path="/book" element={<BookingPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="*" element={<PageNotFound/>}/></Routes></main><Footer/></>
}

export default App
