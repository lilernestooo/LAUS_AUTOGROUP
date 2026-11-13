import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import FacebookPage from '../../components/FacebookPage'

/* Foton photos: put them in src/assets/foton/ (found by file name only, capital letters don't matter) */
const fotonImages = import.meta.glob('../../assets/foton/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
const fotonByFile = Object.fromEntries(
    Object.entries(fotonImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getFotonImg = (name) => (name ? fotonByFile[name.toLowerCase()] : undefined)

const bannerImages = import.meta.glob('../../assets/banners/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
const bannerByFile = Object.fromEntries(
    Object.entries(bannerImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getBanner = (name) => bannerByFile[name.toLowerCase()]

const brandImages = import.meta.glob('../../assets/brand/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
const brandByFile = Object.fromEntries(
    Object.entries(brandImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getBrandLogo = (name) => brandByFile[name.toLowerCase()]

/* ---------- DATA ---------- */
const brand = {
    name: 'Foton',
    logo: 'foton.png',
    inquireHref: '#', // replace with the real inquire link
    privacyHref: '#', // replace with the real Data Privacy Notice link
    categories: ['Light Duty Trucks', 'Vans', 'SUVs', 'Pick up'],
    // add slug: 'est-m-cargo' to a model once its detail page and data file exist
    models: [
        { name: 'EST-M Cargo', slug: 'est-m-cargo', category: 'Light Duty Trucks', image: 'Foton_Est-M-Cargo_Thumbnail.jpg' },
        { name: 'ETX-N 350 Cargo', slug: 'etx-n-350-cargo', category: 'Light Duty Trucks', image: 'Foton_ETX-N-350_Thumbnail.jpg' },
        { name: 'EST-400 Tractor Head', slug: 'est-400-tractor-head', category: 'Light Duty Trucks', image: 'Foton_EST-400_Thumbnail.jpg' },
        { name: 'Gratour iM6', slug: 'gratour-im6', category: 'Vans', image: 'Foton_Gratour_Thumbnail.jpg' },
        { name: 'GTL-400 Dumptruck', slug: 'gtl-400-dumptruck', category: 'Light Duty Trucks', image: 'Foton_GTL-400_Thumbnail.jpg' },
        { name: 'Thunder 4x2', slug: 'thunder-4x2', category: 'Pick up', image: 'Foton_Thunder-4x2_Thumbnail.jpg' },
        { name: 'Toano Standard', category: 'Vans', image: 'Foton_Toano-Standard_Thumbnail.jpg' },
        { name: 'Toplander', category: 'SUVs', image: 'Foton_Toplander_Thumbnail.jpg' },
        { name: 'Tornado 2.4C Dropside', category: 'Light Duty Trucks', image: 'Foton_TORNADO-2.4C-Drop-side-12-FOOTER_Thumbnail.jpg' },
        { name: 'Tornado 2.4C FVan', category: 'Light Duty Trucks', image: 'Foton_TORNADO-2.4C-FVAN-12-FOOTER_Thumbnail.jpg' },
        { name: 'Tornado 2.4C MPV', category: 'Vans', image: 'Foton_TORNADO-2.4C-MPV-24-SEATER_Thumbnail.jpg' },
        { name: 'Tornado 2E E4 Dropside', category: 'Light Duty Trucks', image: 'Foton_TORNADO-2E-E4-DROPSIDE-11-FOOTER_Thumbnail.jpg' },
        { name: 'Tornado 4.4C Dropside', category: 'Light Duty Trucks', image: 'Foton_TORNADO-4.4C-Dropside-14-FOOTER_Thumbnail.jpg' },
        { name: 'Tornado 4.8C Cab and Chassis', category: 'Light Duty Trucks', image: 'Foton_TORNADO-4.8C-Cab-and-Chassis-17-FOOTER_Thumbnail.jpg' },
        { name: 'Tornado M 4.2C Cab and Chassis', category: 'Light Duty Trucks', image: 'Foton_TORNADO-M-4.2C-Cab-and-Chassis-14-FOOTER_Thumbnail.jpg' },
        { name: 'Tornado M 5.2C Dropside', category: 'Light Duty Trucks', image: 'Foton_TORNADO-M-5.2C-Dropside-17-FOOTER_Thumbnail.jpg' },
        { name: 'TransVan HR', category: 'Vans', image: 'Foton_TransVan-HR-16-seater_Thumbnail.jpg' },
        { name: 'Traveller 16 Seater', category: 'Vans', image: 'Foton_Traveller-16-seater-Cummins-Engine_Thumbnail.jpg' },
    ],
    /* facebook: live Facebook page URL (leave '' until you have it) and rendered height
       (130px for the compact header, 330px for the full card) */
    dealers: [
        {
            name: 'Foton Metro Clark',
            address: ['McArthur Highway, Dau, Mabalacat CIty,', 'Pampanga'],
            phones: [
                { label: 'Sales:', numbers: ['0998-587-8215'] },
                { label: 'After Sales:', numbers: ['0918-854-2904'] },
                { label: 'Parts:', numbers: ['0919-065-0054'] },
                { label: 'Service:', numbers: ['0919-065-0054', '0918-854-2904'] },
            ],
            facebook: 'https://www.facebook.com/FotonMetroClark/',
            fbHeight: 330,
        },
        {
            name: 'Foton Bacolor',
            address: ['Jose Abad Santos Avenue, Bacolor,', 'Pampanga'],
            phones: [{ label: 'Contact:', numbers: ['+63 918 854 2280', '+63 918 854 2994'] }],
            facebook: 'https://www.facebook.com/FotonBacolorPampanga/',
            fbHeight: 190,
        },
    ],
}

const ALL = 'All Models'
const telHref = (n) => `tel:${n.replace(/[^+\d]/g, '')}`

/* ---------- MODEL CARD ---------- */
function ModelCard({ model, to }) {
    const src = getFotonImg(model.image)

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
                    {dealer.phones.map((group) => (
                        <p key={group.label}>
                            {group.label}
                            {group.numbers.map((n) => (
                                <a
                                    key={n}
                                    href={telHref(n)}
                                    className="block transition-colors hover:text-lag-red"
                                >
                                    {n}
                                </a>
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
                            height={dealer.fbHeight || 190}
                        />
                    </div>
                </Reveal>
            )}
        </div>
    )
}

/* ---------- THE PAGE ---------- */
export default function Foton() {
    const [active, setActive] = useState(ALL)
    const logo = getBanner(brand.logo) || getBrandLogo(brand.logo)

    const shown = active === ALL ? brand.models : brand.models.filter((m) => m.category === active)
    const countOf = (c) =>
        c === ALL ? brand.models.length : brand.models.filter((m) => m.category === c).length

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
                            <div className="flex h-44 items-center justify-center border-2 border-neutral-300 bg-[#fcfcfc] md:h-56">
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
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[11px] ${active === c ? 'bg-white/25' : 'bg-white/10 text-neutral-300'
                                                            }`}
                                                    >
                                                        {countOf(c)}
                                                    </span>
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
                                                        to={m.slug ? `/brands/foton/${m.slug}` : null}
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

                    {/* ================= SIDEBAR: 2 DEALERS (scrolls inside itself) ================= */}
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