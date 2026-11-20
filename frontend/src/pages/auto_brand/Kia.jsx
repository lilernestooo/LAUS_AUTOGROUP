import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import FacebookPage from '../../components/FacebookPage'

/* Kia photos AND the logo: put them in src/assets/kia/ (found by file name only, capital letters don't matter) */
const kiaImages = import.meta.glob('../../assets/kia/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
const kiaByFile = Object.fromEntries(
    Object.entries(kiaImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getKiaImg = (name) => (name ? kiaByFile[name.toLowerCase()] : undefined)

/* ---------- DATA ---------- */
const brand = {
    name: 'Kia',
    logo: 'kia.png',
    website: { label: 'www.kiaphvirtualshowroom.com', href: 'https://www.kiaphvirtualshowroom.com' },
    inquireHref: '#', // replace with the real inquire link
    privacyHref: '#', // replace with the real Data Privacy Notice link
    categories: ['Sedan', 'Compact SUV', 'Multi-Purpose Vehicle', 'Mini Van'],
    // add slug: 'sonet' to a model once its detail page and data file exist
    // (the thumbnail file names are placeholders: replace them with the real names in src/assets/kia/)
    models: [
        { name: 'Sonet', category: 'Compact SUV', image: 'Sonet-Thumbnail.png' },
        { name: 'Carnival', category: 'Multi-Purpose Vehicle', image: 'Kia_Carnival_Thumbnail.jpg' },
        { name: 'Sorento', category: 'Compact SUV', image: 'Kia_Sorento_Thumbnail.jpg' },
        { name: 'Soluto', category: 'Sedan', image: 'Kia_Soluto_Thumbnail.jpg' },
        { name: 'Stonic', category: 'Compact SUV', image: 'Kia_Stonic_Thumbnail.jpg' },
        { name: 'K2500', category: 'Mini Van', image: 'k2500.jpg' },
        { name: 'Sportage', category: 'Compact SUV', image: 'Kia_Sportage_Thumbnail.jpg' },
        { name: 'Forte', category: 'Sedan', image: 'Kia_Forte_Thumbnail.jpg' },
        { name: 'Stinger', category: 'Sedan', image: 'Kia_Stinger_Thumbnail.jpg' },
        { name: 'Seltos', category: 'Compact SUV', image: 'Kia_Seltos_Thumbnail.jpg' },
    ],
    /* facebook: live Facebook page URL
       fbHeight: rendered height (360 = full card with a two-line name, 340 = full card,
       150 = compact card with the small Follow Page button)
       hours: opening hours, shown as plain text (not phone links) */
    dealers: [
        {
            name: 'Kia Baliwag',
            address: ['DRT Highway, Pagala, Baliwag, 3006', 'Bulacan, Philippines'],
            phones: [
                { label: 'Sales:', numbers: ['+63 918 854 2412'] },
                { label: 'Telefax:', numbers: ['(044) 7664830'] },
                { label: 'Fax:', numbers: ['+63 45 860 2000'] },
                { label: 'Service:', numbers: ['+63 918 854 2487'] },
            ],
            facebook: 'https://www.facebook.com/KiaBaliwagOfficial',
            fbHeight: 150,
        },
        {
            name: 'Kia Clark',
            address: ['LGC Automotive Services Building, M.A.', 'Roxas Avenue Clark, Pampanga,', 'Philippines'],
            phones: [
                { label: 'Landline:', numbers: ['(045) 4998040'] },
                { label: 'Sales:', numbers: ['0998 587 8258'] },
                { label: 'Fax:', numbers: ['+63 45 860 2000'] },
                { label: 'Aftersales:', numbers: ['0998 595 5875'] },
            ],
            hours: [
                {
                    label: 'Operating Hours:',
                    lines: ['Showroom', '8:30am to 5:30pm (Monday to Friday)', '8:30am to 5:00pm (Saturday)'],
                },
            ],
            facebook: 'https://www.facebook.com/KiaClarkOfficial/',
            fbHeight: 340,
        },
        {
            name: 'Kia Isabela',
            address: ['City Road, Dubinan East 3311 Dubinan,', 'Philippines'],
            phones: [{ label: 'Sales:', numbers: ['+63 919 065 8755'] }],
            facebook: 'https://www.facebook.com/KiaIsabela/',
            fbHeight: 340,
        },
        {
            name: 'Kia Malolos',
            address: ['Capitol Bldg 2 McArthur Highway,', 'Guinhawa 3000 Malolos, Philippines'],
            phones: [{ label: 'Sales:', numbers: ['+63 918 854 2412'] }],
            facebook: 'https://www.facebook.com/KiaMalolos/',
            fbHeight: 340,
        },
        {
            name: 'Kia Pampanga',
            address: ['Jose Abad Santos Avenue, City of San', 'Fernando, Pampanga, 2000, Philippines'],
            phones: [
                { label: 'Landline:', numbers: ['(045) 9611485', '+63 45 961 3926'] },
                { label: 'Fax:', numbers: ['+63 45 961 5303'] },
                { label: 'Sales:', numbers: ['+63 918 854 2756', '+63 918 854 2310'] },
                { label: 'Aftersales:', numbers: ['Local 108', '+63 999 881 0984', '+63 918 854 2105'] },
            ],
            hours: [
                {
                    label: 'Operation Hours:',
                    lines: ['Showroom:', '8:30 AM – 5:30 PM | Mon – Fri', '8:30 AM – 5:00 PM | Sat'],
                },
                { label: 'Service Center:', lines: ['8:00 AM – 6:00 PM | Mon – Sat'] },
            ],
            facebook: 'https://www.facebook.com/kiapampanga/',
            fbHeight: 360,
        },
        {
            name: 'Kia Pangasinan',
            address: ['McArthur Highway, Barangay Ambonao,', 'Calasiao, Pangasinan, Philippines,2418'],
            phones: [
                { label: 'Sales:', numbers: ['+63 918 854 2456', '+63 918 854 2410'] },
                { label: 'Trunk Line:', numbers: ['+63 75 517 9999', '+63 75 517 1717'] },
                { label: 'Sales:', numbers: ['+63 918 854 2456', '(075) 517 9999'] },
                { label: 'Aftersales:', numbers: ['+63 918 854 2378', '+63 918 854 2410'] },
            ],
            facebook: 'https://www.facebook.com/kiapangasinan/',
            fbHeight: 360,
        },
    ],
}

const ALL = 'All Models'
const telHref = (n) => `tel:${n.replace(/[^+\d]/g, '')}`
// "Local 108" and similar extension notes are plain text, not phone links
const isPhone = (n) => n.replace(/\D/g, '').length >= 7

/* ---------- MODEL CARD ---------- */
function ModelCard({ model, to }) {
    const src = getKiaImg(model.image)

    const card = (
        <div className="group">
            <div className="relative overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]">
                {src ? (
                    <img
                        src={src}
                        alt={model.name}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-contain transition duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex aspect-[16/10] w-full items-center justify-center bg-neutral-200 px-2 text-center text-xs text-neutral-500">
                        {model.image}
                    </div>
                )}
                {/* red line that grows on hover */}
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-lag-red transition-transform duration-500 group-hover:scale-x-100" />
            </div>
            <p className="mt-3 text-sm font-medium text-[#555] transition-colors duration-300 group-hover:text-lag-red md:text-base">
                {model.name}
            </p>
        </div>
    )

    // only models that have a detail page are links
    return to ? (
        <Link to={to} className="block outline-none focus-visible:ring-2 focus-visible:ring-lag-red">
            {card}
        </Link>
    ) : (
        card
    )
}

/* ---------- ONE DEALER IN THE SIDEBAR ---------- */
function DealerBlock({ dealer, first }) {
    return (
        <div className={first ? '' : 'mt-8 border-t border-neutral-200 pt-8'}>
            <Reveal direction="right">
                <h2 className="text-2xl leading-9 font-normal text-[#222] md:text-3xl">{dealer.name}</h2>
                <div className="mt-4 mb-6 h-1 w-16 rounded bg-lag-red" />
            </Reveal>

            <Reveal direction="right" delay={100}>
                <div className="space-y-5 text-[15px] leading-7 text-[#666]">
                    <p>
                        {dealer.address.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </p>
                    {dealer.phones.map((group, gi) => (
                        <p key={`${group.label}-${gi}`}>
                            {group.label}
                            {group.numbers.map((n) =>
                                isPhone(n) ? (
                                    <a
                                        key={n}
                                        href={telHref(n)}
                                        className="block transition-colors hover:text-lag-red"
                                    >
                                        {n}
                                    </a>
                                ) : (
                                    <span key={n} className="block">
                                        {n}
                                    </span>
                                )
                            )}
                        </p>
                    ))}
                    {dealer.hours &&
                        dealer.hours.map((h) => (
                            <p key={h.label}>
                                {h.label}
                                {h.lines.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </p>
                        ))}
                </div>
            </Reveal>

            {/* real live facebook page embed (only when the dealer has a link) */}
            {dealer.facebook && (
                <Reveal direction="up" delay={150}>
                    <div className="mt-5 overflow-hidden rounded-xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] hover:ring-lag-red/40">
                        <FacebookPage
                            href={dealer.facebook}
                            title={`${dealer.name} Facebook Page`}
                            height={dealer.fbHeight || 340}
                        />
                    </div>
                </Reveal>
            )}
        </div>
    )
}

/* ---------- THE PAGE ---------- */
export default function Kia() {
    // starts on "All Models" (everything shown); click a category to filter, click "All Models" to show everything again
    const [active, setActive] = useState(ALL)
    const logo = getKiaImg(brand.logo)

    const shown = active === ALL ? brand.models : brand.models.filter((m) => m.category === active)

    return (
        <main className="overflow-x-clip">
            <section className="relative bg-[#fcfcfc] py-10 md:py-16">
                {/* soft decoration */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/5 blur-3xl" />
                <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-lag-dark/5 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-0">
                    {/* ================= MAIN COLUMN ================= */}
                    <div className="min-w-0 lg:col-span-9 lg:pr-10">
                        {/* brand logo */}
                        <Reveal direction="zoom">
                            <div className="flex h-44 items-center justify-center border-2 border-neutral-300 bg-[#cecece] md:h-56">
                                {logo ? (
                                    <img
                                        src={logo}
                                        alt={brand.name}
                                        className="w-32 max-w-full object-contain md:w-44"
                                    />
                                ) : (
                                    <span className="text-4xl font-bold text-lag-dark">{brand.name}</span>
                                )}
                            </div>
                        </Reveal>

                        {/* inquire now */}
                        <Reveal direction="left" delay={100}>
                            <div className="mt-6 flex justify-end">
                                <a
                                    href={brand.inquireHref}
                                    className="group relative inline-flex items-center gap-2 overflow-hidden border border-lag-red bg-white px-8 py-3 text-base font-bold tracking-wide text-lag-red uppercase transition-colors duration-500 hover:text-white"
                                >
                                    {/* red fill that slides in from the left */}
                                    <span className="absolute inset-0 -translate-x-full bg-lag-red transition-transform duration-500 ease-out group-hover:translate-x-0" />
                                    <span className="relative">Inquire Now</span>
                                    <svg
                                        className="relative transition-transform duration-300 group-hover:translate-x-1"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </a>
                            </div>
                        </Reveal>

                        {/* models panel */}
                        <Reveal direction="up" delay={100}>
                            <div className="mt-10 overflow-hidden border border-neutral-200 bg-[#f8f8f8] md:mt-14 md:grid md:grid-cols-[190px_1fr]">
                                {/* categories */}
                                <div className="md:bg-transparent">
                                    <div className="flex items-center gap-3 px-5 py-4 text-sm text-[#555]">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <path d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        All Models
                                    </div>
                                    <ul className="flex overflow-x-auto md:block md:overflow-visible">
                                        {[ALL, ...brand.categories].map((c) => (
                                            <li key={c} className="shrink-0 md:shrink">
                                                <button
                                                    type="button"
                                                    onClick={() => setActive(c)}
                                                    aria-pressed={active === c}
                                                    className={`flex w-full cursor-pointer items-center justify-between gap-3 border-b border-l-4 border-b-white/20 px-5 py-4 text-left text-sm whitespace-nowrap transition-all duration-300 md:whitespace-normal ${active === c
                                                        ? 'border-l-lag-red bg-lag-red text-white'
                                                        : 'border-l-transparent bg-[#2b2b2b] text-white hover:border-l-lag-red hover:bg-neutral-700 hover:pl-7'
                                                        }`}
                                                >
                                                    <span>{c}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* model grid: replays the reveal when the category changes */}
                                <div key={active} className="min-h-[300px] p-3 md:p-4">
                                    {shown.length === 0 ? (
                                        <p className="py-16 text-center text-[#888]">No models in this category yet.</p>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 xl:grid-cols-3">
                                            {shown.map((m, i) => (
                                                <Reveal key={m.name} direction="zoom" delay={(i % 3) * 100}>
                                                    <ModelCard
                                                        model={m}
                                                        to={m.slug ? `/brands/kia/${m.slug}` : null}
                                                    />
                                                </Reveal>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Reveal>

                        {/* footer notes */}
                        <Reveal direction="up">
                            <div className="mt-10 space-y-2 text-[15px] text-[#888]">
                                <p>
                                    Visit Us:{' '}
                                    <a
                                        href={brand.website.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-lag-red underline-offset-4 hover:underline"
                                    >
                                        {brand.website.label}
                                    </a>
                                </p>
                                <p>
                                    Actual unit may vary from photo. Specifications &amp; colors are subject to
                                    change without prior notice.
                                </p>
                                <p>
                                    <a
                                        href={brand.privacyHref}
                                        className="text-lag-red underline-offset-4 hover:underline"
                                    >
                                        Data Privacy Notice
                                    </a>
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* ================= SIDEBAR: 6 DEALERS (scrolls inside itself) ================= */}
                    <aside className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-4">
                        <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-x-hidden lg:overflow-y-auto lg:p-2 [scrollbar-color:#b5b5b5_#e5e5e5] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-neutral-200">
                            {brand.dealers.map((d, i) => (
                                <DealerBlock key={d.name} dealer={d} first={i === 0} />
                            ))}
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    )
}