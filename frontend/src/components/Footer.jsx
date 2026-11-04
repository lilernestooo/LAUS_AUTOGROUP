const dealers = [
  'BMW', 'Carmix', 'Changhe', 'Chevrolet', 'Chery', 'Ford', 'Foton', 'Fuso',
  'Haima', 'Hyundai', 'Jeep', 'Kia', 'Mazda', 'MINI', 'Mitsubishi', 'Peugeot',
  'Piaggio APE', 'Suzuki', 'Volkswagen',
]

export default function Footer() {
  return (
    <footer className="bg-lag-dark text-white">
      <div className="mx-auto grid w-[92%] max-w-[1180px] gap-6 py-10 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl">Search for:</h3>
          <input
            type="text"
            placeholder="Enter your search"
            className="w-full bg-white p-3 text-sm text-black outline-none"
          />
        </div>

        <div>
          <h3 className="mb-4 text-xl">Dealer Links</h3>
          <ul className="max-h-[210px] overflow-y-auto pr-1 [scrollbar-color:#ffffff_#23252e] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-lag-darker">
            {dealers.map((d) => (
              <li key={d} className="mb-[5px] bg-lag-darker">
                <a
                  href="#"
                  className="block p-[11px] text-sm text-neutral-300 transition-all duration-200 hover:bg-lag-red hover:pl-5 hover:text-white"
                >
                  {d}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#3a3d48] py-7 text-center text-sm">
        Copyright © 2026 LausAutoGroup All Rights Reserved.
      </div>
    </footer>
  )
}