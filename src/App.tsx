import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const hotel = {
  name: 'The JMB Resort',
  phone: '+91 8765814455',
  phoneHref: 'tel:+918765814455',
  whatsapp: 'https://wa.me/918765814455',
  address: 'Sahodara, in front of Bharat Petroleum, Sahras Pali',
  city: 'Ballia, Uttar Pradesh 277001',
} as const;

const imageBase = 'https://images.unsplash.com/';
const images = {
  hero: `${imageBase}photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=88`,
  room: `${imageBase}photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85`,
  roomTwo: `${imageBase}photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85`,
  bath: `${imageBase}photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85`,
  dining: `${imageBase}photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85`,
  terrace: `${imageBase}photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=85`,
  detail: `${imageBase}photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85`,
  coast: `${imageBase}photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85`,
} as const;

const galleryImages = [
  { src: images.hero, alt: 'Sunlit bedroom with linen bedding', label: 'A room made quiet' },
  { src: images.dining, alt: 'Long table set for an evening meal', label: 'At the long table' },
  { src: images.terrace, alt: 'Pool terrace surrounded by greenery', label: 'Slow afternoons' },
  { src: images.bath, alt: 'Warm stone bathroom with a freestanding bath', label: 'The daily ritual' },
  { src: images.coast, alt: 'Misty coastline at first light', label: 'Just beyond' },
];

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 text-[#f5f0e4] md:px-10 lg:px-14">
        <a href="#top" className="group flex items-center gap-3" data-testid="link-brand">
          <span className="flex h-9 w-9 items-center justify-center border border-[#f5f0e4]/70 text-[12px] hotel-serif">JMB</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">The JMB Resort</span>
        </a>
        <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] lg:flex" aria-label="Primary navigation">
          <a href="#stay" className="line-link" data-testid="link-stay">Stay</a>
          <a href="#experience" className="line-link" data-testid="link-experience">Experience</a>
          <a href="#gallery" className="line-link" data-testid="link-gallery">Gallery</a>
          <a href="#contact" className="line-link" data-testid="link-contact">Enquire</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden border border-[#f5f0e4]/70 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-[#f5f0e4] hover:text-[#19353b] sm:block" data-testid="link-check-availability">
            Book / Enquire
          </a>
          <button type="button" onClick={onMenu} className="flex h-11 w-11 items-center justify-center border border-[#f5f0e4]/70 lg:hidden" aria-label="Open navigation" data-testid="button-open-menu">
            <Menu size={19} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#19353b] px-7 py-7 text-[#f5f0e4] lg:hidden">
      <div className="flex items-center justify-between">
        <a href="#top" onClick={onClose} className="group flex items-center gap-3" data-testid="link-mobile-brand">
          <span className="flex h-9 w-9 items-center justify-center border border-[#f5f0e4]/70 text-[12px] hotel-serif">JMB</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">The JMB Resort</span>
        </a>
        <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center border border-[#f5f0e4]/70" aria-label="Close navigation" data-testid="button-close-menu">
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>
      <nav className="mt-24 flex flex-col gap-7 hotel-serif text-5xl" aria-label="Mobile navigation">
        {[
          ['Stay', '#stay'],
          ['Experience', '#experience'],
          ['Gallery', '#gallery'],
          ['Enquire', '#contact'],
        ].map(([label, href]) => (
          <a key={href} href={href} onClick={onClose} className="border-b border-[#f5f0e4]/20 pb-5" data-testid={`link-mobile-${label.toLowerCase()}`}>
            {label}
          </a>
        ))}
      </nav>
      <p className="mt-auto max-w-[260px] text-sm leading-6 text-[#f5f0e4]/65">Hotels · Lawns · Banquet Halls in Ballia.</p>
    </div>
  );
}

function Hero({ onScroll }: { onScroll: () => void }) {
  return (
    <section id="top" className="relative flex min-h-[760px] items-end overflow-hidden bg-[#19353b] text-[#f5f0e4] md:min-h-[840px]">
      <img src={images.hero} alt="Quiet hotel room with a view through linen curtains" className="hero-image absolute inset-0 h-full w-full object-cover object-center opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,53,59,0.66)_0%,rgba(25,53,59,0.12)_43%,rgba(25,53,59,0.86)_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-6 pb-12 pt-36 md:px-10 md:pb-16 lg:grid-cols-[1fr_340px] lg:items-end lg:px-14">
        <div>
          <p className="eyebrow mb-7 text-[#c1d2c7]">Ballia · Hotels · Lawns · Banquet Halls</p>
          <h1 className="hotel-serif max-w-4xl text-[clamp(3.8rem,9vw,9.4rem)] leading-[0.88] tracking-[-0.045em]">Celebrate. Stay.<br />Create memories.</h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#f5f0e4]/80 md:text-lg">A premium destination in Ballia for comfortable stays, celebrations and memorable events.</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#contact" className="group flex items-center gap-3 bg-[#e48a72] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#19353b] transition-transform hover:-translate-y-1" data-testid="link-hero-enquire">
              Plan your event <ArrowUpRight size={15} />
            </a>
            <button type="button" onClick={onScroll} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5f0e4]/80 transition-colors hover:text-[#f5f0e4]" data-testid="button-explore-hotel">
              Explore the hotel <ArrowDown size={15} />
            </button>
          </div>
        </div>
        <div className="hidden border-l border-[#f5f0e4]/35 pl-8 lg:block">
          <p className="eyebrow text-[#c1d2c7]">The JMB Resort</p>
          <p className="mt-4 hotel-serif text-2xl leading-tight">Hotel stays and event spaces, brought together in Sahodara, Ballia.</p>
          <a href={hotel.phoneHref} className="mt-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-[#f5f0e4]/65"><span className="h-px w-8 bg-[#e48a72]" /> {hotel.phone}</a>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-[#eee9dc] px-6 py-24 md:px-10 md:py-36 lg:px-14" id="about">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
        <div className="reveal">
          <p className="eyebrow text-[#e48a72]">01 / A sense of place</p>
          <div className="mt-14 hidden h-px w-20 bg-[#19353b]/30 md:block" />
        </div>
        <div className="reveal">
          <h2 className="hotel-serif max-w-3xl text-4xl leading-[1.02] tracking-[-0.025em] text-[#19353b] md:text-6xl">Good design gets out of the way. What remains is how a place makes you feel.</h2>
          <div className="mt-10 grid gap-8 text-[15px] leading-7 text-[#19353b]/70 md:grid-cols-2">
            <p>The JMB Resort brings together hotel accommodation with lawns and banquet halls for guests, families and celebrations.</p>
            <p>Located in Sahodara, Sahras Pali, the resort welcomes enquiries for stays and memorable events in Ballia.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaySection() {
  return (
    <section id="stay" className="bg-[#dce5dc] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#e07965]">02 / The rooms</p>
            <h2 className="hotel-serif mt-5 text-5xl leading-none text-[#19353b] md:text-7xl">Make yourself<br />at home.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#19353b]/65">Room names, capacity, amenities and rates are awaiting verified information. Please enquire for current details.</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-[1.28fr_0.72fr]">
          <RoomCard image={images.room} number="01" title="Room type — details soon" note="Verified room description, guest capacity and amenities can be added here." large />
          <RoomCard image={images.roomTwo} number="02" title="Room type — details soon" note="Contact the resort directly for current accommodation information." />
        </div>
        <div className="mt-6 grid gap-6 border-t border-[#19353b]/20 pt-8 text-[#19353b] sm:grid-cols-3">
          {[
            ['Stay', 'Hotel accommodation', BedDouble],
            ['Enquire', 'Current details by phone', Clock3],
            ['Update', 'Verified facilities to be added', Sparkles],
          ].map(([title, detail, Icon]) => (
            <div key={title as string} className="flex items-center gap-4" data-testid={`info-room-${String(title).toLowerCase()}`}>
              <Icon size={19} strokeWidth={1.3} className="text-[#e07965]" />
              <div><p className="text-xs font-bold uppercase tracking-[0.14em]">{title as string}</p><p className="mt-1 text-sm text-[#19353b]/60">{detail as string}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomCard({ image, number, title, note, large = false }: { image: string; number: string; title: string; note: string; large?: boolean }) {
  return (
    <article className={`reveal group relative overflow-hidden bg-[#19353b] text-[#f5f0e4] ${large ? 'min-h-[530px] md:min-h-[620px]' : 'min-h-[430px] md:min-h-[620px]'}`}>
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#19353b]/90 via-transparent to-[#19353b]/10" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-7 md:p-9">
        <span className="eyebrow text-[#c1d2c7]">{number} / stay</span>
        <div>
          <h3 className="hotel-serif text-4xl leading-none md:text-5xl">{title}</h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#f5f0e4]/75">{note}</p>
          <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f5f0e4] line-link" data-testid={`link-enquire-room-${number}`}>
            Ask about this room <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}

function ExperienceSection() {
  const features = [
    ['Weddings', 'A day shaped around your story', 'Share your celebration requirements with the resort team.'],
    ['Gatherings', 'Space for people to come together', 'Banquet hall and lawn details will be confirmed on enquiry.'],
    ['Events', 'From milestones to private moments', 'Weddings, receptions, engagements, birthdays, corporate events and private celebrations.'],
  ];
  return (
    <section id="experience" className="bg-[#f4f0e7] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <p className="eyebrow text-[#e07965]">03 / The rhythm of a stay</p>
          <h2 className="hotel-serif max-w-2xl text-4xl leading-[1.04] tracking-[-0.02em] text-[#19353b] md:text-6xl">A setting for the moments you want to remember.</h2>
        </div>
        <div className="mt-20 divide-y divide-[#19353b]/20 border-y border-[#19353b]/20">
          {features.map(([time, title, detail], index) => (
            <div key={time} className="reveal group grid gap-5 py-8 md:grid-cols-[0.75fr_1.25fr_1fr] md:items-center md:gap-8" style={{ transitionDelay: `${index * 90}ms` }}>
              <div className="flex items-center gap-4"><span className="hotel-serif text-3xl text-[#e07965]">0{index + 1}</span><span className="eyebrow text-[#19353b]/50">{time}</span></div>
              <h3 className="hotel-serif text-3xl text-[#19353b] transition-transform group-hover:translate-x-2 md:text-4xl">{title}</h3>
              <p className="max-w-sm text-sm leading-6 text-[#19353b]/60">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiningSection() {
  return (
    <section className="relative overflow-hidden bg-[#19353b] text-[#f5f0e4]">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal flex flex-col justify-center px-6 py-24 md:px-10 md:py-32 lg:px-14">
          <p className="eyebrow text-[#e48a72]">04 / Banquet & Lawns</p>
          <h2 className="hotel-serif mt-6 max-w-lg text-5xl leading-[0.96] md:text-7xl">Make room for your moment.</h2>
          <p className="mt-8 max-w-sm text-[15px] leading-7 text-[#f5f0e4]/65">Explore The JMB Resort as a possible setting for your next gathering. Share your event requirements for verified venue details.</p>
          <div className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c1d2c7]"><Utensils size={16} strokeWidth={1.3} /> Plan your celebration</div>
        </div>
        <div className="relative min-h-[560px] overflow-hidden md:min-h-[680px]">
          <img src={images.dining} alt="Long dining table prepared for guests" className="absolute inset-0 h-full w-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#19353b] via-transparent to-transparent md:w-1/2" />
          <div className="absolute bottom-8 right-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#f5f0e4]/60 text-center text-[9px] font-bold uppercase leading-4 tracking-[0.16em] text-[#f5f0e4] md:bottom-12 md:right-12">Open<br />to the<br />moment</div>
        </div>
      </div>
    </section>
  );
}

function GallerySection({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section id="gallery" className="bg-[#eee9dc] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal flex items-end justify-between gap-6">
          <div><p className="eyebrow text-[#e07965]">05 / A little look around</p><h2 className="hotel-serif mt-5 text-5xl leading-none text-[#19353b] md:text-7xl">The feeling of<br />The JMB Resort.</h2></div>
          <p className="hidden max-w-[210px] text-right text-sm leading-6 text-[#19353b]/60 md:block">A visual library for the things that matter. More images to come.</p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
          {galleryImages.map((image, index) => (
            <button type="button" key={image.src} onClick={() => onOpen(index)} className={`gallery-card group relative overflow-hidden text-left ${index === 0 ? 'col-span-2 aspect-[1.35] md:col-span-7 md:row-span-2 md:aspect-auto' : index === 1 ? 'col-span-2 aspect-[1.65] md:col-span-5' : index === 2 ? 'col-span-1 aspect-square md:col-span-3' : index === 3 ? 'col-span-1 aspect-square md:col-span-4' : 'col-span-2 aspect-[1.7] md:col-span-5'}`} aria-label={`Open image: ${image.label}`} data-testid={`button-gallery-${index}`}>
              <img src={image.src} alt={image.alt} className="gallery-image absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#19353b]/80 to-transparent px-5 pb-5 pt-12 text-xs text-[#f5f0e4] opacity-0 transition-opacity group-hover:opacity-100">{image.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NearbySection() {
  return (
    <section className="bg-[#e8dfcf] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="reveal overflow-hidden"><img src={images.coast} alt="Misty landscape near the hotel" className="aspect-[4/5] w-full object-cover" /></div>
        <div className="reveal">
          <p className="eyebrow text-[#e07965]">06 / Just beyond the door</p>
          <h2 className="hotel-serif mt-6 text-5xl leading-[0.96] text-[#19353b] md:text-7xl">A good base<br />for going nowhere.</h2>
          <p className="mt-8 max-w-lg text-[15px] leading-7 text-[#19353b]/70">The JMB Resort is located in Sahodara, Sahras Pali, Ballia, in front of Bharat Petroleum.</p>
          <div className="mt-10 grid gap-5 border-t border-[#19353b]/20 pt-6 sm:grid-cols-2">
            <div className="flex gap-3"><MapPin size={17} className="mt-0.5 text-[#e07965]" strokeWidth={1.4} /><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-[#19353b]">Find us</p><p className="mt-1 text-sm leading-6 text-[#19353b]/60">{hotel.address}<br />{hotel.city}</p></div></div>
            <a href="https://www.google.com/maps/search/?api=1&query=The+JMB+Resort+Sahodara+Sahras+Pali+Ballia" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-[#19353b] transition-colors hover:text-[#e07965]" data-testid="link-local-guide"><MoveUpRight size={17} className="mt-0.5" strokeWidth={1.4} /><span className="text-xs font-bold uppercase tracking-[0.13em] line-link">Get directions</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

type EnquiryData = { name: string; phone: string; dates: string; guests: string; message: string };

function EnquirySection() {
  const [form, setForm] = useState<EnquiryData>({ name: '', phone: '', dates: '', guests: 'Expected guests', message: '' });
  const [sent, setSent] = useState(false);
  const update = (key: keyof EnquiryData, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="bg-[#dce5dc] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto grid max-w-[1200px] gap-16 md:grid-cols-[0.82fr_1.18fr]">
        <div className="reveal">
          <p className="eyebrow text-[#e07965]">07 / Start a conversation</p>
          <h2 className="hotel-serif mt-6 text-5xl leading-[0.96] text-[#19353b] md:text-7xl">Tell us about<br />your celebration.</h2>
          <p className="mt-8 max-w-sm text-[15px] leading-7 text-[#19353b]/65">Share a few details to start a conversation with The JMB Resort about your stay or event.</p>
          <div className="mt-12 space-y-5 border-t border-[#19353b]/20 pt-6 text-sm text-[#19353b]/70">
            <a href={hotel.phoneHref} className="flex items-center gap-3"><Phone size={16} className="text-[#e07965]" strokeWidth={1.4} /> {hotel.phone}</a>
            <a href={hotel.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3"><span className="text-[#e07965]">◉</span> WhatsApp</a>
          </div>
        </div>
        <div className="reveal">
          {sent ? (
            <div className="flex min-h-[440px] flex-col justify-center border border-[#19353b]/25 bg-[#f4f0e7] p-8 md:p-12" data-testid="status-enquiry-sent">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#19353b] text-[#dce5dc]"><Check size={22} /></div>
              <p className="eyebrow mt-8 text-[#e07965]">Request received</p>
              <h3 className="hotel-serif mt-4 text-4xl leading-none text-[#19353b]">We’ll be in touch, {form.name || 'soon'}.</h3>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#19353b]/65">This demo form does not make a booking. Please call or WhatsApp the resort to continue your enquiry.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-9 flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#19353b] line-link" data-testid="button-new-enquiry">Send another enquiry <ArrowRight size={14} /></button>
            </div>
          ) : (
            <form onSubmit={submit} className="border border-[#19353b]/25 bg-[#f4f0e7] p-7 md:p-10" data-testid="form-enquiry">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Your name" id="name" type="text" value={form.name} required placeholder="Full name" onChange={(value) => update('name', value)} />
                <Field label="Phone number" id="phone" type="tel" value={form.phone} required placeholder="Your phone number" onChange={(value) => update('phone', value)} />
                <Field label="Preferred date" id="dates" type="date" value={form.dates} required placeholder="Preferred date" onChange={(value) => update('dates', value)} />
                <div>
                  <label htmlFor="guests" className="eyebrow text-[#19353b]/55">Expected guests</label>
                  <div className="relative mt-3"><select id="guests" value={form.guests} onChange={(event) => update('guests', event.target.value)} className="w-full appearance-none border-b border-[#19353b]/30 bg-transparent py-3 pr-8 text-sm text-[#19353b] focus:border-[#19353b] focus:outline-none" data-testid="select-guests"><option>Expected guests</option><option>Under 50</option><option>50–100</option><option>100–250</option><option>250+</option></select><ChevronDown size={15} className="pointer-events-none absolute right-1 top-3.5 text-[#19353b]/50" /></div>
                </div>
              </div>
              <div className="mt-7"><label htmlFor="message" className="eyebrow text-[#19353b]/55">Anything we should know?</label><textarea id="message" rows={3} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="A celebration, a question, a good reason to leave town…" className="mt-3 w-full resize-none border-b border-[#19353b]/30 bg-transparent py-3 text-sm text-[#19353b] placeholder:text-[#19353b]/40 focus:border-[#19353b] focus:outline-none" data-testid="textarea-enquiry" /></div>
              <div className="mt-9 flex flex-col gap-5 border-t border-[#19353b]/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[220px] text-[11px] leading-5 text-[#19353b]/55">Your enquiry is a request, not a confirmed reservation.</p>
                <button type="submit" className="flex items-center justify-center gap-3 bg-[#19353b] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f4f0e7] transition-transform hover:-translate-y-1" data-testid="button-submit-enquiry">Send enquiry <ArrowUpRight size={15} /></button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, type, value, required, placeholder, onChange }: { label: string; id: string; type: string; value: string; required?: boolean; placeholder: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-[#19353b]/55">{label}</label>
      <input id={id} type={type} required={required} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full border-b border-[#19353b]/30 bg-transparent py-3 text-sm text-[#19353b] placeholder:text-[#19353b]/40 focus:border-[#19353b] focus:outline-none" data-testid={`input-${id}`} />
    </div>
  );
}

function GalleryLightbox({ index, onClose, onPrevious, onNext }: { index: number | null; onClose: () => void; onPrevious: () => void; onNext: () => void }) {
  useEffect(() => {
    if (index === null) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrevious();
      if (event.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [index, onClose, onNext, onPrevious]);
  if (index === null) return null;
  const image = galleryImages[index];
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#19353b]/95 p-5 text-[#f5f0e4]" role="dialog" aria-modal="true" aria-label="Gallery image viewer" data-testid="dialog-gallery">
      <button type="button" onClick={onClose} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-[#f5f0e4]/50" aria-label="Close gallery" data-testid="button-close-gallery"><X size={20} /></button>
      <button type="button" onClick={onPrevious} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#f5f0e4]/50 transition-colors hover:bg-[#f5f0e4] hover:text-[#19353b] md:left-8" aria-label="Previous image" data-testid="button-gallery-previous"><ArrowLeft size={18} /></button>
      <figure className="flex max-h-[90vh] max-w-5xl flex-col items-center">
        <img src={image.src} alt={image.alt} className="max-h-[77vh] w-auto max-w-full object-contain" data-testid="img-gallery-active" />
        <figcaption className="mt-5 flex w-full items-center justify-between gap-8 text-[10px] uppercase tracking-[0.16em] text-[#f5f0e4]/65"><span>{image.label}</span><span>{String(index + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}</span></figcaption>
      </figure>
      <button type="button" onClick={onNext} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#f5f0e4]/50 transition-colors hover:bg-[#f5f0e4] hover:text-[#19353b] md:right-8" aria-label="Next image" data-testid="button-gallery-next"><ArrowRight size={18} /></button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#19353b] px-6 py-14 text-[#f5f0e4] md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-12 border-b border-[#f5f0e4]/20 pb-14 md:flex-row md:items-end">
          <div><p className="eyebrow text-[#c1d2c7]">The JMB Resort</p><p className="hotel-serif mt-5 max-w-xl text-4xl leading-none md:text-6xl">Celebrate. Stay.<br />Create memories.</p></div>
          <a href="#top" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f5f0e4]/70 transition-colors hover:text-[#f5f0e4]" data-testid="link-back-to-top">Back to top <ArrowUpRight size={15} /></a>
        </div>
        <div className="grid gap-10 py-10 text-sm text-[#f5f0e4]/65 sm:grid-cols-3">
          <div><p className="eyebrow mb-4 text-[#c1d2c7]">Visit</p><p>{hotel.address}<br />{hotel.city}</p></div>
          <div><p className="eyebrow mb-4 text-[#c1d2c7]">Contact</p><a href={hotel.phoneHref}>{hotel.phone}</a><br /><a href={hotel.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div><p className="eyebrow mb-4 text-[#c1d2c7]">Business</p><p>Hotel · Lawns<br />Banquet Halls · Events</p></div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-[#f5f0e4]/20 pt-6 text-[10px] uppercase tracking-[0.13em] text-[#f5f0e4]/40 sm:flex-row"><span>© {new Date().getFullYear()} The JMB Resort</span><span>Concept website · Details to be confirmed by the resort</span></div>
      </div>
    </footer>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const title = 'The JMB Resort | Hotels, Lawns & Banquet Halls in Ballia';
    document.title = title;
    const description = 'Discover The JMB Resort in Ballia for hotel stays, lawns, banquet halls and event enquiries.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const existing = document.getElementById('hotel-schema');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'hotel-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Hotel',
        name: hotel.name,
        description,
        url: window.location.href,
        telephone: hotel.phone,
        address: { '@type': 'PostalAddress', streetAddress: hotel.address, addressLocality: 'Ballia', addressRegion: 'Uttar Pradesh', postalCode: '277001', addressCountry: 'IN' },
        image: images.hero,
      });
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const previousImage = () => setLightboxIndex((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
  const nextImage = () => setLightboxIndex((current) => current === null ? null : (current + 1) % galleryImages.length);

  return (
    <div className="grain min-h-[100dvh] bg-[#eee9dc] hotel-sans text-[#19353b]">
      <Header onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero onScroll={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} />
        <Intro />
        <StaySection />
        <ExperienceSection />
        <DiningSection />
        <GallerySection onOpen={openLightbox} />
        <NearbySection />
        <EnquirySection />
      </main>
      <Footer />
      <GalleryLightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} onPrevious={previousImage} onNext={nextImage} />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
