import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import FacebookPage from '../../components/FacebookPage'

/* Hyundai photos AND the logo: put them in src/assets/hyundai/ (found by file name only, capital letters don't matter) */
const hyundaiImages = import.meta.glob('../../assets/hyundai/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
const hyundaiByFile = Object.fromEntries(
    Object.entries(hyundaiImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getHyundaiImg = (name) => (name ? hyundaiByFile[name.toLowerCase()] : undefined)

/* ---------- DATA ---------- */
const brand = {
    name: 'Hyundai',
    logo: 'hyundai.png',
    website: { label: 'www.hyundai.ph', href: 'https://www.hyundai.ph' },
    inquireHref: '#', // replace with the real inquire link
    privacyHref: '#', // replace with the real Data Privacy Notice link
    // add slug: 'h350' to a model once its detail page and data file exist
    models: [
        { name: 'H350', image: 'HTB_H350_Thumbnail.jpg' },
        { name: 'H65', image: 'HTB_H65_Thumbnail.jpg' },
        { name: 'HD78', image: 'HTB_HD78_Thumbnail-300x263.jpg' },
    ],
    /* facebook: live Facebook page URL (leave '' until you have it, no box is shown without it)
       fbHeight: rendered height (380 = full card with a three-line name, 360 = two-line name,
       150 = compact card with the small Follow Page button) */
    dealers: [
        {
            name: 'Hyundai Trucks and Buses Baliwag',
            address: ['DRT Highway, Baliwag, Bulacan'],
            phones: [
                { label: 'Trunkline:', numbers: ['+6344 766 4867'] },
                { label: 'Sales:', numbers: ['0999 223 0304'] },
                { label: 'Service:', numbers: ['0918 854 2650'] },
            ],
            facebook: 'https://www.facebook.com/HyundaiTrucksandBusesBaliwag/',
            fbHeight: 380,
        },
        {
            name: 'Hyundai Trucks and Buses Clark',
            address: ['LGC Automotive Services Bldg., M. A.', 'Roxas Highway, Clark Freeport Zone 2009'],
            phones: [{ label: 'Contact:', numbers: ['0998.5878685', '0917.8355947'] }],
            facebook: 'https://www.facebook.com/HyundaiTrucksandBuses.Clark/',
            fbHeight: 360,
        },
    ],
}

const telHref = (n) => `tel:${n.replace(/[^+\d]/g, '')}`

/* ---------- MODEL CARD ---------- */
function ModelCard({ model, to, onNoPage }) {
    const src = getHyundaiImg(model.image)

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
        <button
            type="button"
            onClick={() => onNoPage(model)}
            className="block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-lag-red"
        >
            {card}
        </button>
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
                            height={dealer.fbHeight || 340}
                        />
                    </div>
                </Reveal>
            )}
        </div>
    )
}

/* ---------- THE PAGE ---------- */
export default function HyundaiTrucks() {
    const logo = getHyundaiImg(brand.logo)
    const [notice, setNotice] = useState(null) // model name whose page isn't ready yet

    // the message closes by itself after 4 seconds
    useEffect(() => {
        if (!notice) return
        const t = setTimeout(() => setNotice(null), 4000)
        return () => clearTimeout(t)
    }, [notice])

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

                        {/* models panel (no categories on the original, so only the All Models header) */}
                        <Reveal direction="up" delay={100}>
                            <div className="mt-10 overflow-hidden border border-neutral-200 bg-[#f8f8f8] md:mt-14 md:grid md:grid-cols-[190px_1fr]">
                                <div className="flex items-center gap-3 px-5 py-4 text-sm text-[#555] md:items-start">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    All Models
                                </div>

                                <div className="min-h-[300px] p-3 md:p-4">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 xl:grid-cols-3">
                                        {brand.models.map((m, i) => (
                                            <Reveal key={m.name} direction="zoom" delay={(i % 3) * 100}>
                                                <ModelCard
                                                    model={m}
                                                    to={m.slug ? `/brands/hyundai-trucks-and-buses/${m.slug}` : null}
                                                    onNoPage={(mod) => setNotice(mod.name)}
                                                />
                                            </Reveal>
                                        ))}
                                    </div>
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

                    {/* ================= SIDEBAR: DEALERS (scrolls inside itself) ================= */}
                    <aside className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-4">
                        <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-x-hidden lg:overflow-y-auto lg:p-2 [scrollbar-color:#b5b5b5_#e5e5e5] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-neutral-200">
                            {brand.dealers.map((d, i) => (
                                <DealerBlock key={d.name} dealer={d} first={i === 0} />
                            ))}
                        </div>
                    </aside>
                </div>
            </section>
            {/* message for cards that have no detail page yet */}
            {notice && (
                <div
                    role="status"
                    className="fixed bottom-6 left-1/2 z-[200] flex w-[92%] max-w-md -translate-x-1/2 items-start gap-3 border-l-4 border-lag-red bg-[#23252e] px-5 py-4 text-sm text-white shadow-2xl"
                >
                    <p className="flex-1 leading-6">
                        <span className="font-bold">{notice}</span> details are coming soon. Please contact one of our
                        dealers for more information.
                    </p>
                    <button
                        type="button"
                        onClick={() => setNotice(null)}
                        aria-label="Close message"
                        className="cursor-pointer text-xl leading-none text-white/70 hover:text-white"
                    >
                        ×
                    </button>
                </div>
            )}
        </main>
    )
}