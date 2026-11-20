import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import FacebookPage from '../../components/FacebookPage'

/* Mazda photos AND the logo: put them in src/assets/mazda/ (found by file name only, capital letters don't matter) */
const mazdaImages = import.meta.glob('../../assets/mazda/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
const mazdaByFile = Object.fromEntries(
    Object.entries(mazdaImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getMazdaImg = (name) => (name ? mazdaByFile[name.toLowerCase()] : undefined)

/* ---------- DATA ---------- */
const brand = {
    name: 'Mazda',
    logo: 'mazda.png',
    website: { label: 'www.lausmazdagroup.com.ph', href: 'https://www.lausmazdagroup.com.ph' },
    inquireHref: '#', // replace with the real inquire link
    privacyHref: '#', // replace with the real Data Privacy Notice link
    categories: ['Sedan', 'Hatch', 'SUV', 'Convertible', 'Dual Cab'],
    // add slug: 'mazda-3' to a model once its detail page and data file exist
    // (the thumbnail file names are placeholders: replace them with the real names in src/assets/mazda/)
    // category can be one name or a list when a model belongs to several (e.g. Sedan and Hatch)
    models: [
        { name: 'Mazda2', category: ['Sedan', 'Hatch'], image: 'Mazda_Mazda2_Thumbnail.jpg' },
        { name: 'Mazda3', category: ['Sedan', 'Hatch'], image: 'Mazda_Mazda3_Thumbnail.jpg' },
        { name: 'Mazda6', category: 'Sedan', image: 'Mazda_Mazda6_Thumbnail.jpg' },
        { name: 'Mazda CX-5', category: 'SUV', image: 'Mazda_CX-5_Thumbnail.jpg' },
        { name: 'MAZDA CX-8', category: 'SUV', image: 'Mazda_CX-8_Thumbnail.jpg' },
        { name: 'MAZDA CX-9', category: 'SUV', image: 'Mazda_CX-9_Thumbnail.jpg' },
        { name: 'MAZDA CX-30', category: 'SUV', image: 'Mazda_CX-30_Thumbnail.jpg' },
        { name: 'Mazda MX-5', category: 'Convertible', image: 'Mazda_MX-5_Thumbnail.jpg' },
        { name: 'Mazda BT-50', category: 'Dual Cab', image: 'Mazda_BT-50_Thumbnail.jpg' },
    ],
    /* facebook: live Facebook page URL
       fbHeight: rendered height (360 = full card with a two-line name, 340 = full card,
       150 = compact card with the small Follow Page button)
       hours: opening hours, shown as plain text (not phone links) */
    dealers: [
        {
            name: 'Mazda Cabanatuan',
            address: ['Maharlika Highway, Sumacab Este,', 'Cabanatuan City, Nueva Ecija, 3100,', 'Philippines'],
            phones: [
                { label: 'Trunk Line:', numbers: ['+63 44 960 8042'] },
                { label: 'Sales:', numbers: ['+63 918-854-2513', '+63 919 078 8497'] },
                { label: 'Service:', numbers: ['+63 918 854 2515'] },
                { label: 'Operation:', numbers: ['+63 918 854 2513'] },
            ],
            facebook: 'https://www.facebook.com/mazdacabanatuanofficial/',
            fbHeight: 150,
        },
        {
            name: 'Mazda Dagupan',
            address: ['Lucao District, Dagupan City, 2400,', 'Philippines'],
            phones: [
                { label: 'Sales:', numbers: ['+63 918 854 2713'] },
                { label: 'Trunk Line:', numbers: ['+63 75 522 1111'] },
                { label: 'Fax:', numbers: ['+63 75 522 1113'] },
                { label: 'Service:', numbers: ['+63 918 854 2380'] },
            ],
            facebook: 'https://www.facebook.com/MazdaDagupanPage/',
            fbHeight: 360,
        },
        {
            name: 'Mazda Pampanga',
            address: ['Jose Abad Santos Avenue, City of San', 'Fernando, Pampanga, 2000, Philippines'],
            phones: [
                { label: 'Sales:', numbers: ['+63 918 854 2711'] },
                { label: 'Operations:', numbers: ['+63 918 587 8211'] },
                { label: 'Trunk Line:', numbers: ['+63 45 435 6424', '+63 45 435 6425'] },
                { label: 'Service/Parts Counter:', numbers: ['+63 918 854 2186'] },
                { label: 'DCRC:', numbers: ['+63 918 854 2392'] },
            ],
            facebook: 'https://www.facebook.com/mazdapampangaofficial/',
            fbHeight: 150,
        },
        {
            name: 'Mazda Tarlac',
            address: ['McArthur Highway, San Sebastian, Tarlac', 'City, Tarlac, 2300, Philippines'],
            phones: [
                { label: 'Sales:', numbers: ['+63 918 854 2302', '+63 45 491 1598'] },
                { label: 'Service:', numbers: ['+63 45 491 1433'] },
            ],
            facebook: 'https://www.facebook.com/mazdatarlac/',
            fbHeight: 340,
        },
    ],
}

const ALL = 'All Models'
const telHref = (n) => `tel:${n.replace(/[^+\d]/g, '')}`
// "Local 108" and similar extension notes are plain text, not phone links
const isPhone = (n) => n.replace(/\D/g, '').length >= 7

/* ---------- MODEL CARD ---------- */
function ModelCard({ model, to }) {
    const src = getMazdaImg(model.image)

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
export default function Mazda() {
    // starts on "All Models" (everything shown); click a category to filter, click "All Models" to show everything again
    const [active, setActive] = useState(ALL)
    const logo = getMazdaImg(brand.logo)

    const shown = active === ALL ? brand.models : brand.models.filter((m) => [].concat(m.category).includes(active))

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
                                                        to={m.slug ? `/brands/mazda/${m.slug}` : null}
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

                    {/* ================= SIDEBAR: 4 DEALERS (scrolls inside itself) ================= */}
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