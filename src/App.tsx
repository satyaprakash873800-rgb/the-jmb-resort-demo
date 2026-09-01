import { useState, type ReactNode } from 'react';
import { ArrowRight, CalendarDays, Check, ChevronDown, MapPin, Menu, Phone, Sparkles, Users, X } from 'lucide-react';

const hotel = {
  name: 'Hotel Marina',
  city: 'Meerut',
  phone: '+91 84457 66634',
  phoneHref: 'tel:+918445766634',
  whatsapp: 'https://wa.me/918445766634',
  address: 'Do Pahiya Road, Pathanpura, NH58, Khadoli, Meerut, Uttar Pradesh 250005',
  maps: 'https://www.google.com/maps/search/?api=1&query=Hotel+Marina+Khadoli+Meerut',
};

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=88`;
const images = {
  hero: img('photo-1505693416388-ac5ce068fe85', 2200),
  room: img('photo-1600607687939-ce8a6c25118c', 1500),
  room2: img('photo-1582719478250-c89cae4dc85b', 1300),
  dining: img('photo-1414235077428-338989a2e8c0', 1700),
  lobby: img('photo-1497215728101-856f4ea42174', 1300),
  terrace: img('photo-1540541338287-41700207dee6', 1500),
};

function Button({ children, href = '#contact', light = false }: { children: ReactNode; href?: string; light?: boolean }) {
  return <a className={`btn ${light ? 'btn-light' : ''}`} href={href}>{children}<ArrowRight size={16} /></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Stay', '#stay'], ['Experience', '#experience'], ['Gallery', '#gallery'], ['Contact', '#contact']];
  return <>
    <header className="header">
      <a className="brand" href="#top" aria-label="Hotel Marina home"><span className="brand-mark">HM</span><span><b>HOTEL</b> MARINA</span></a>
      <nav className="desktop-nav">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><a className="header-phone" href={hotel.phoneHref}><Phone size={15} /> {hotel.phone}</a><a className="header-cta" href="#contact">Enquire <ArrowRight size={15} /></a><button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button></div>
    </header>
    {open && <div className="mobile-menu"><div className="mobile-top"><a className="brand" href="#top" onClick={() => setOpen(false)}><span className="brand-mark">HM</span><span><b>HOTEL</b> MARINA</span></a><button className="menu-btn" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div><nav>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowRight size={18}/></a>)}</nav><a className="mobile-call" href={hotel.phoneHref}><Phone size={17}/> Call {hotel.phone}</a></div>}
  </>;
}

function Hero() {
  return <section id="top" className="hero" style={{ backgroundImage: `url(${images.hero})` }}>
    <div className="hero-shade" />
    <div className="hero-inner">
      <div className="hero-copy">
        <div className="kicker"><span /> MEERUT · NH58 · KHADOLI</div>
        <h1>A stay that feels<br/><em>effortlessly yours.</em></h1>
        <p>Comfortable rooms, thoughtful service and a convenient base for stays, celebrations and gatherings in Meerut.</p>
        <div className="hero-buttons"><Button>Plan your stay</Button><a className="text-link" href="#experience">Explore Hotel <ArrowRight size={16}/></a></div>
      </div>
      <div className="hero-note"><span>HOTEL MARINA</span><strong>Stay well.<br/>Feel at home.</strong><small>Direct enquiries · Call or WhatsApp</small></div>
    </div>
    <div className="hero-scroll"><span>Scroll to explore</span><div /></div>
  </section>;
}

function Intro() {
  return <section className="intro section" id="experience"><div className="eyebrow">01 / THE MARINA EXPERIENCE</div><div className="intro-grid"><div><h2>Simple comforts.<br/><span>Beautifully considered.</span></h2></div><div className="intro-copy"><p>Hotel Marina is designed for guests who want a comfortable stay without unnecessary fuss. Whether you are travelling for work, visiting family or planning a celebration, everything begins with an easy welcome.</p><p>Located on Do Pahiya Road near NH58 in Khadoli, Meerut, the hotel gives you a practical, well-connected place to stay.</p><div className="mini-stats"><div><strong>20</strong><span>Rooms</span></div><div><strong>24/7</strong><span>Direct enquiry</span></div><div><strong>NH58</strong><span>Easy access</span></div></div></div></div></section>;
}

function Stay() {
  const cards = [
    { title: 'Comfortable Rooms', text: 'A calm place to recharge, with the everyday essentials you expect from a good hotel stay.', image: images.room },
    { title: 'A Welcoming Stay', text: 'Suitable for business travellers, families and guests looking for a convenient Meerut base.', image: images.room2 },
  ];
  return <section id="stay" className="stay section"><div className="section-head"><div><div className="eyebrow">02 / STAY</div><h2>Rooms made for<br/><i>restful nights.</i></h2></div><p>Ask the Hotel Marina team for current room availability, rates, occupancy and amenities.</p></div><div className="room-grid">{cards.map((c, i) => <article className={`room-card ${i === 0 ? 'room-large' : ''}`} key={c.title}><img src={c.image} alt={c.title}/><div className="room-overlay"/><div className="room-content"><span>0{i + 1} / STAY</span><div><h3>{c.title}</h3><p>{c.text}</p><a href="#contact">Ask about this room <ArrowRight size={15}/></a></div></div></article>)}</div><div className="amenity-row">{[['Comfort', 'Air-conditioned rooms', Sparkles], ['Connect', 'Wi-Fi available', CalendarDays], ['Convenient', 'Free parking', MapPin]].map(([t, d, Icon]) => <div key={t as string}><Icon size={20}/><div><b>{t as string}</b><span>{d as string}</span></div></div>)}</div></section>;
}

function Events() {
  return <section className="events"><div className="events-image" style={{ backgroundImage: `url(${images.dining})` }}/><div className="events-content"><div className="eyebrow light">03 / CELEBRATIONS & EVENTS</div><h2>Make space<br/>for <i>your moment.</i></h2><p>From weddings and receptions to birthdays, engagements, corporate gatherings and private celebrations, Hotel Marina can be your starting point for an event enquiry.</p><Button href="#contact" light>Discuss your event</Button><div className="event-list"><span><b>01</b> Weddings</span><span><b>02</b> Gatherings</span><span><b>03</b> Private events</span></div></div></section>;
}

function Gallery() {
  const gallery = [images.hero, images.room, images.dining, images.lobby, images.room2, images.terrace];
  return <section id="gallery" className="gallery section"><div className="section-head"><div><div className="eyebrow">04 / GALLERY</div><h2>A little look<br/><i>around.</i></h2></div><p>Replace these presentation images with approved Hotel Marina photography before launch.</p></div><div className="gallery-grid">{gallery.map((src, i) => <img key={src} src={src} alt={`Hotel Marina view ${i + 1}`} className={`g${i + 1}`}/>)}</div></section>;
}

function Location() {
  return <section className="location section"><div className="location-card"><div className="location-photo" style={{ backgroundImage: `url(${images.terrace})` }}/><div className="location-copy"><div className="eyebrow">05 / FIND US</div><h2>Close to the road.<br/><i>Easy to reach.</i></h2><p>{hotel.address}</p><div className="location-actions"><a href={hotel.maps} target="_blank" rel="noreferrer"><MapPin size={17}/> Get directions</a><a href={hotel.phoneHref}><Phone size={17}/> Call the hotel</a></div></div></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  return <section id="contact" className="contact section"><div className="contact-grid"><div className="contact-copy"><div className="eyebrow">06 / ENQUIRE DIRECTLY</div><h2>Let's plan<br/><i>your stay.</i></h2><p>Tell us what you need and the Hotel Marina team can respond directly.</p><div className="direct"><a href={hotel.phoneHref}><Phone/> <span>Call us<strong>{hotel.phone}</strong></span></a><a href={hotel.whatsapp} target="_blank" rel="noreferrer"><span className="wa-dot">WA</span> <span>WhatsApp<strong>Message the hotel</strong></span></a></div></div>{sent ? <div className="success"><div className="success-icon"><Check/></div><div className="eyebrow">REQUEST RECEIVED</div><h3>Thank you. We'll be in touch.</h3><p>Your enquiry has been recorded on this website. For the quickest response, call or WhatsApp the hotel directly.</p><a href="#top">Back to top <ArrowRight size={15}/></a></div> : <form className="enquiry-form" onSubmit={(e) => {e.preventDefault(); setSent(true)}}><div className="form-grid"><label>Name<input required placeholder="Your full name"/></label><label>Phone<input required type="tel" placeholder="Your phone number"/></label><label>Preferred date<input required type="date"/></label><label>Guests<select defaultValue=""><option value="" disabled>Select guests</option><option>1–2</option><option>3–5</option><option>6–20</option><option>20+</option></select><ChevronDown size={16}/></label></div><label className="message">What can we help with?<textarea rows={4} placeholder="Room stay, wedding, event, availability…"/></label><div className="form-bottom"><small>Enquiry only — not a confirmed reservation.</small><button className="submit" type="submit">Send enquiry <ArrowRight size={16}/></button></div></form>}</div></section>;
}

function Footer() {
  return <footer><div className="footer-main"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">HM</span><span><b>HOTEL</b> MARINA</span></a><h2>Stay well.<br/><i>Feel at home.</i></h2></div><a className="back-top" href="#top">Back to top <ArrowRight size={15}/></a></div><div className="footer-grid"><div><span>VISIT</span><p>{hotel.address}</p></div><div><span>CONTACT</span><p><a href={hotel.phoneHref}>{hotel.phone}</a><br/><a href={hotel.whatsapp}>WhatsApp</a></p></div><div><span>ABOUT</span><p>Hotel stays<br/>Celebrations · Events</p></div></div><div className="footer-bottom"><span>© 2026 Hotel Marina, Meerut</span><span>Website presentation · Details subject to hotel confirmation</span></div></footer>;
}

export default function App() {
  return <div className="site"><Header/><main><Hero/><Intro/><Stay/><Events/><Gallery/><Location/><Contact/></main><Footer/><a className="floating-whatsapp" href={hotel.whatsapp} target="_blank" rel="noreferrer">WA</a></div>;
}
