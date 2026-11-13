import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../../components/Reveal'

/* Finds images by file name only (any capital letters), folder: src/assets/foton */
const modelImages = import.meta.glob('../../assets/foton/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})
const modelByFile = Object.fromEntries(
    Object.entries(modelImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getImg = (name) => modelByFile[name.split('/').pop().toLowerCase()]

/* ---------- DATA ----------
   Every file in src/data/models/foton/<slug>.js is loaded automatically.
   The file name is the slug: est-m-cargo.js opens /brands/foton/est-m-cargo */
const modelData = import.meta.glob('../../data/models/foton/*.js', {
    eager: true,
    import: 'default',
})
const details = Object.fromEntries(
    Object.entries(modelData).map(([path, data]) => [path.split('/').pop().replace('.js', ''), data])
)

const TABS = [
    {
        label: 'Overview',
        icon: <path d="M12 8h.01M11 12h1v5h1M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />,
    },
    {
        label: 'Vehicle Specifications',
        icon: <path d="M4 6h16M4 12h16M4 18h10" />,
    },
    {
        label: 'Other Variants',
        icon: <path d="M4 7h7v7H4zM13 10h7v7h-7zM8 14v3h5" />,
    },
]

/* ---------- CAR VIEWER: fixed photo + shadow ---------- */
function CarViewer({
    src,
    alt,
    scene,
    shadowBottom,
    shadowWidth,
    shadowShift,
    shadowRotate,
    shadowHeight,
    carScale,
    noShadow,
    noBlend,
}) {
    // scene photo (car on a street): show it as a framed picture, no glow or ground shadow
    if (scene) {
        return (
            <div className="mx-auto max-w-4xl">
                {src ? (
                    <img
                        src={src}
                        alt={alt}
                        draggable={false}
                        className="w-full rounded-xl shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
                    />
                ) : (
                    <div className="flex aspect-[16/9] items-center justify-center rounded bg-neutral-200 text-neutral-500">
                        Car image missing
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="relative mx-auto flex h-72 max-w-5xl items-center justify-center md:h-[34rem]">
                {/* soft glow behind the car */}
                <div className="pointer-events-none absolute h-64 w-3/4 rounded-full bg-lag-red/10 blur-3xl" />

                {/* car */}
                <div
                    className="relative z-10 w-full max-w-3xl"
                    style={carScale ? { transform: `scale(${carScale})`, transformOrigin: 'bottom center' } : undefined}
                >
                    {/* shadow on the ground: only when the photo has no natural shadow */}
                    {!noShadow && (
                        <div
                            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${shadowBottom || 'bottom-[6%]'}`}
                            style={{
                                width: shadowWidth || '88%',
                                marginLeft: shadowShift,
                                rotate: shadowRotate,
                            }}
                        >
                            {/* wide soft shadow */}
                            <div
                                className="mx-auto w-full rounded-[50%] bg-black/55 blur-lg"
                                style={{ height: shadowHeight || '1.5rem' }}
                            />
                            {/* tight dark shadow right under the tires */}
                            <div
                                className="absolute inset-x-[6%] top-1/2 -translate-y-1/2 rounded-[50%] bg-black/80 blur-[4px]"
                                style={{ height: shadowHeight ? `calc(${shadowHeight} * 0.4)` : '0.625rem' }}
                            />
                        </div>
                    )}
                    {src ? (
                        <img
                            src={src}
                            alt={alt}
                            draggable={false}
                            className={`relative w-full ${noShadow || noBlend ? '' : 'mix-blend-multiply'} ${noShadow ? '' : /\.jpe?g/i.test(src) ? '' : 'drop-shadow-[0_6px_8px_rgba(0,0,0,0.15)]'
                                }`}
                        />
                    ) : (
                        <div className="flex aspect-[16/9] items-center justify-center rounded bg-neutral-200 text-neutral-500">
                            Car image missing
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/* ---------- POP-UP SHELL (used by all three tabs) ---------- */
function Popup({ eyebrow, title, onClose, children }) {
    // Escape closes, page scroll is locked while open
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [onClose])

    // portal: the page uses transforms, which would otherwise trap a fixed pop-up
    return createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6">
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="flex h-[80vh] max-h-[34rem] w-full max-w-3xl animate-slide-in flex-col overflow-hidden rounded-2xl bg-[#23252e] shadow-2xl"
            >
                {/* header */}
                <div className="relative flex items-start justify-between gap-4 bg-[#23252e] px-6 py-5">
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-lag-red" />
                    <div>
                        <p className="text-[11px] font-bold tracking-[0.3em] text-white uppercase">
                            {eyebrow}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">{title}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition duration-300 hover:rotate-90 hover:bg-lag-red"
                    >
                        ×
                    </button>
                </div>

                {/* content (scrolls inside the pop-up) */}
                <div className="min-h-0 flex-1 overflow-y-auto bg-[#f4f4f5] p-5 md:p-7 [scrollbar-color:#b5b5b5_#e5e5e5] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-neutral-200">
                    {children}
                </div>

                {/* footer */}
                <div className="border-t border-neutral-200 bg-white px-6 py-3">
                    <p className="text-xs text-[#999]">
                        Actual unit may vary from photo. Specifications &amp; colors are subject to change
                        without prior notice.
                    </p>
                </div>
            </div>
        </div>,
        document.body
    )
}

function SpecsContent({ specs }) {
    return (
        <div className="space-y-8">
            {specs.map((variant, vi) => {
                // "rows" style and "groups" style both become the same table
                const sections = variant.groups || [{ title: null, rows: variant.rows }]

                return (
                    <section key={`${variant.name || 'specs'}-${vi}`}>
                        {/* variant label (skipped when the car has no model name) */}
                        {variant.name && (
                            <div className="mb-5 flex items-center gap-3">
                                <span className="rounded-sm bg-lag-dark px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase">
                                    Model
                                </span>
                                <h4 className="text-lg font-semibold text-lag-dark">{variant.name}</h4>
                                <span className="h-px flex-1 bg-neutral-300" />
                            </div>
                        )}

                        {/* one table for everything */}
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                            {sections.map((g) => (
                                <div key={g.title || 'rows'}>
                                    {g.title && (
                                        <h5 className="flex items-center gap-2 border-y border-neutral-200 bg-neutral-100 px-4 py-2 text-xs font-bold tracking-[0.15em] text-lag-dark uppercase first:border-t-0">
                                            <span className="h-3.5 w-1 rounded bg-lag-red" />
                                            {g.title}
                                        </h5>
                                    )}
                                    <dl>
                                        {g.rows.map(([label, value], ri) => (
                                            <div
                                                key={`${label}-${ri}`}
                                                className={`flex flex-col gap-1 px-4 py-3 text-[13px] transition-colors hover:bg-neutral-100 sm:grid sm:grid-cols-[15rem_1fr] sm:gap-6 ${ri % 2 ? 'bg-[#fafafa]' : 'bg-white'
                                                    }`}
                                            >
                                                <dt className="text-[#777]">{label}</dt>
                                                <dd className="min-w-0 text-[#222] sm:text-right">
                                                    {String(value).includes('\n') ? (
                                                        <ul className="list-disc space-y-1.5 pl-5 text-left font-normal text-[#555] marker:text-lag-red">
                                                            {String(value)
                                                                .split('\n')
                                                                .map((line, li) =>
                                                                    line.startsWith('¹') ? (
                                                                        <li key={li} className="-ml-5 list-none pt-1 text-xs text-[#888]">
                                                                            {line}
                                                                        </li>
                                                                    ) : (
                                                                        <li key={li}>{line}</li>
                                                                    )
                                                                )}
                                                        </ul>
                                                    ) : (
                                                        <span
                                                            className={
                                                                String(value).length > 80
                                                                    ? 'block text-left leading-6 text-[#555]'
                                                                    : 'font-semibold'
                                                            }
                                                        >
                                                            {value}
                                                        </span>
                                                    )}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

/* ---------- THE PAGE ---------- */
function ModelPage({ data }) {
    const [open, setOpen] = useState(null) // null = closed, otherwise the tab index
    const src = data.images.map(getImg).find(Boolean)
    const close = () => setOpen(null)

    return (
        <main className="overflow-x-clip">
            <section className="relative bg-[#fcfcfc] pt-8 pb-20 md:pt-10 md:pb-24">
                <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/5 blur-3xl" />
                <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-lag-dark/5 blur-3xl" />

                <div className="relative mx-auto max-w-6xl px-6">
                    {/* top buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Reveal direction="right">
                            <Link
                                to={data.backTo}
                                className="group relative inline-flex items-center gap-2 overflow-hidden border-2 border-lag-dark bg-white px-5 py-2.5 text-sm font-medium text-lag-dark transition-colors duration-500 hover:text-white"
                            >
                                <span className="absolute inset-0 -translate-x-full bg-lag-dark transition-transform duration-500 ease-out group-hover:translate-x-0" />
                                <svg className="relative transition-transform duration-300 group-hover:-translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M11 6l-6 6 6 6" />
                                </svg>
                                <span className="relative">Back to Vehicle Models</span>
                            </Link>
                        </Reveal>

                        {!data.hideBrochure && (
                            <Reveal direction="left">
                                <a
                                    href={data.brochure}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative inline-flex items-center gap-2 overflow-hidden border-2 border-lag-red bg-white px-5 py-2.5 text-sm font-medium text-lag-red transition-colors duration-500 hover:text-white"
                                >
                                    <span className="absolute inset-0 -translate-x-full bg-lag-red transition-transform duration-500 ease-out group-hover:translate-x-0" />
                                    <span className="relative">Download Brochure</span>
                                    <svg className="relative transition-transform duration-300 group-hover:translate-y-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 4v12M6 12l6 6 6-6M5 21h14" />
                                    </svg>
                                </a>
                            </Reveal>
                        )}
                    </div>

                    {/* title */}
                    <Reveal direction="down">
                        <div className="relative z-20 mt-8 text-center">
                            <span className="text-xs font-bold tracking-[0.3em] text-lag-red uppercase">
                                {data.brandName}
                            </span>
                            {data.name && (
                                <h1 className="mt-2 text-3xl font-normal text-[#222] md:text-5xl">{data.name}</h1>
                            )}
                            <div className="mx-auto mt-4 h-1 w-16 rounded bg-lag-red" />
                        </div>
                    </Reveal>

                    {/* car */}
                    <Reveal direction="zoom" delay={100}>
                        <div className={`${data.scene ? 'mt-8' : data.carTop || '-mt-2 md:-mt-10'} ${data.carBottom || ''}`}>
                            <CarViewer
                                src={src}
                                alt={data.name}
                                scene={data.scene}
                                shadowBottom={data.shadowBottom}
                                shadowWidth={data.shadowWidth}
                                shadowShift={data.shadowShift}
                                shadowRotate={data.shadowRotate}
                                shadowHeight={data.shadowHeight}
                                carScale={data.carScale}
                                noShadow={data.noShadow}
                                noBlend={data.noBlend}
                            />
                        </div>
                    </Reveal>

                    {/* the three tabs: each one opens a pop-up */}
                    <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3">
                        {TABS.map((t, i) => (
                            <Reveal key={t.label} direction="up" delay={i * 100}>
                                <button
                                    type="button"
                                    onClick={() => setOpen(i)}
                                    aria-haspopup="dialog"
                                    className="group relative flex w-full cursor-pointer items-center justify-between gap-3 overflow-hidden border-2 border-lag-dark bg-white px-6 py-4 text-left text-sm font-bold tracking-wide text-lag-dark uppercase transition-colors duration-500 hover:text-white md:text-base"
                                >
                                    <span className="absolute inset-0 -translate-x-full bg-lag-red transition-transform duration-500 ease-out group-hover:translate-x-0" />
                                    <span className="relative flex items-center gap-3">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {t.icon}
                                        </svg>
                                        {t.label}
                                    </span>
                                    <svg className="relative transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* pop-ups */}
            {open === 0 && (
                <Popup eyebrow={data.name} title="Overview" onClose={close}>
                    <div className="space-y-6">
                        {data.overview && (
                            <p className="border-l-4 border-lag-red bg-white p-5 text-[15px] leading-8 whitespace-pre-line text-[#666] shadow-sm md:text-base">
                                {data.overview}
                            </p>
                        )}
                        {data.overviewSpecs && <SpecsContent specs={data.overviewSpecs} />}
                    </div>
                </Popup>
            )}

            {open === 1 && (
                <Popup eyebrow={data.name} title="Vehicle Specifications" onClose={close}>
                    <SpecsContent specs={data.specs} />
                </Popup>
            )}

            {open === 2 && (
                <Popup eyebrow={data.name} title="Other Variants" onClose={close}>
                    {data.variants.length === 0 ? (
                        <p className="bg-white p-5 font-bold text-[#666] shadow-sm">N/A</p>
                    ) : (
                        <SpecsContent specs={data.variants} />
                    )}
                </Popup>
            )}
        </main>
    )
}

/* ---------- ROUTE ENTRY ---------- */
export default function FotonModel() {
    const { model } = useParams()
    const data = details[model]

    if (!data) {
        return (
            <main className="bg-[#fcfcfc] py-32 text-center">
                <h1 className="text-3xl font-normal text-[#222]">Model not found</h1>
                <div className="mx-auto mt-4 h-1 w-16 rounded bg-lag-red" />
                <Link to="/brands/foton" className="mt-8 inline-block text-lag-red hover:underline">
                    Back to Vehicle Models
                </Link>
            </main>
        )
    }

    return <ModelPage key={model} data={data} />
}