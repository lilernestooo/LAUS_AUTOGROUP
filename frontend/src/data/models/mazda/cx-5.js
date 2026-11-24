const rows = [
    ['Engine', 'SKYACTIV-G In-line 4-Cylinder DOHC, 16 Valves with i-STOP(Engine Idling Stop System)'],
    ['Transmission', 'SKYACTIV-DRIVE 6-Speed Automatic FRONT WHEEL DRIVE'],
    ['Suspension', 'Front: MacPherson Strut | Rear: Multi-link beam'],
    ['Brakes', 'Front: Ventilated Discs | Rear: Discs'],
    [
        'Audio',
        '5.8″ TFT, Touch screen multi-info display with CD, MP3, Aux in, USB, Bluetooth voice control function with 9-Speaker Bose Sound System',
    ],
    ['Seating Capacity', '5'],
    ['Colors', 'Sky Blue, Soul Red, Crystal White Pearl, Aluminium Metallic, Jet Black'],
]

export default {
    brandName: 'Mazda',
    backTo: '/brands/mazda',
    name: 'Mazda CX-5',
    images: ['MAZDA-CX5.jpg'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20',
    noShadow: true,
    brochure: '#',
    overview: `What’s good about the new Mazda CX-5 SKYACTIV has been magnified, giving a new edge in both design and performance.
BOLDER. SMARTER.`,
    specs: [
        {
            name: 'Mazda CX-5’s SKYACTIV',
            rows,
        },
    ],
    variants: [
        {
            name: 'CX5 AWD 2.5 AT 6 Speed',
            rows,
        },
    ],
}