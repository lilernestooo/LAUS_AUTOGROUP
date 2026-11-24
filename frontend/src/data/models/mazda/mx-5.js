export default {
    brandName: 'Mazda',
    backTo: '/brands/mazda',
    name: 'Mazda MX-5',
    images: ['MAZDA-MX5.jpg'], // placeholder: replace with the real detail photo file name
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20', // the photo is shorter than the viewer box: more negative = smaller gap above the buttons
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overview: `Introducing the All-New Mazda MX-5. The newest generation of the world’s best-selling, multi-awarded two-seater sports car. Embracing the breakthrough SKYACTIV Technology, it zooms ahead to raise the level of Jinba Ittai spirit in every drive. The ultimate driving pleasure connects the driver to the MX-5, the way the rider becomes one with his horse.`,
    specs: [
        {
            name: 'Mazda MX-5 2.0 L M/T',
            rows: [
                ['Engine', '2.0L MZR DOHC 16-valve 4-cylinder with VVT'],
                ['Transmission', '6-Speed manual'],
                [
                    'Suspension',
                    'Front: Double-wishbone with aluminum control arms, strut bar, gas-charged shock absorbers. Rear: Independent multilink with aluminum bearing support, stabilizer bar, gas-charged shock absorbers.',
                ],
                ['Brakes', 'Ventilated Disk(Front)/ Solid Disk(Rear)'],
                ['Audio', 'AM/FM, Radio & MP3 Cd Changer, 7-speaker High Grade BOSE, Rear Tender Mounted'],
                ['Seating Capacity', '2'],
            ],
        },
    ],
    variants: [],
}