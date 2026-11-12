export default function FacebookCard({
  name,
  followers = '10K',
  description,
  category = 'Car dealership',
  phone,
  href,
  cover,
  logo,
  verified = true,
}) {
  const desc =
    description ||
    `The Official Facebook Page of ${name}. | A member of the Laus Group of Companies.`

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] hover:ring-lag-red/40">
      {/* cover */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#002c6c] via-[#0a3d7a] to-[#0b6bb8]">
        {cover && (
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        )}
        <span className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#1877f2] shadow-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" className="fill-white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </span>
      </div>

      <div className="px-4 pb-4">
        {/* logo + name: z-10 keeps them above the cover */}
        <div className="relative z-10 -mt-10 flex items-end gap-3">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#002c6c] shadow">
            {logo ? (
              <img src={logo} alt={name} className="h-full w-full object-contain p-2" />
            ) : (
              <span className="text-lg font-bold text-white italic">Ford</span>
            )}
          </div>
          <div className="min-w-0 pb-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-base font-bold text-black">{name}</p>
              {verified && (
                <svg
                  className="h-4 w-4 shrink-0 text-[#1877f2]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  title="Verified Page"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </div>
            <p className="text-xs text-[#555]">
              <span className="font-bold text-black">{followers}</span> followers
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#333]">{desc}</p>

        <p className="mt-2.5 flex flex-wrap items-center gap-x-2 text-xs font-semibold text-black">
          <span className="inline-flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
            {category}
          </span>
          {phone && (
            <>
              <span className="text-neutral-400">·</span>
              <span className="inline-flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {phone}
              </span>
            </>
          )}
        </p>

        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-3.5 flex items-center justify-center gap-2 rounded-lg bg-[#0866ff] py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#0756d6]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          Follow
        </a>
      </div>
    </div>
  )
}
