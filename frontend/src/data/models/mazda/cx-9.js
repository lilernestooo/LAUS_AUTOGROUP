const rows = [
    ['Engine', '3.7L 24-Valve DOHC V6'],
    ['Transmission', '6-Speed A/T Floor Shift (Gate-Type)'],
    [
        'Suspension',
        'Front: Independent MacPherson Strut / Front Suspension with Stabilizer Bar | Rear: Independent Multilink Rear / Suspension with Stabilizer Bar',
    ],
    ['Brakes', 'Front: Ventilated Discs | Rear: Foot Brake Type'],
    [
        'Audio',
        '4.3″ Full-color LCD Display, CD in Dash with MP3/WMA Capability, Bose® 10-Speaker System with Subwoofer, USB & AUX',
    ],
    ['Seating Capacity', '7'],
    ['Colors', 'Brilliant Black, Crystal White Pearl Mica, Aluminum Metallic'],
]

export default {
    brandName: 'Mazda',
    backTo: '/brands/mazda',
    name: 'Mazda CX-9',
    images: ['MAZDA-CX9.png'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20',
    noShadow: true,
    brochure: '#',
    overview: `Mazda CX-9

Get your soul in motion with the all new KODO design. Zoom ahead with a 3.7L 24-Valve DOHC V6 engine with 277Ps maximum power. Be in control with advanced safety features. Luxuriate in this spacious, features-loaded, 7-seater beauty. Also available in 2WD.`,
    specs: [
        {
            name: 'Mazda CX-9 Grand Touring AWD',
            rows,
        },
    ],
    variants: [
        {
            name: 'Mazda CX-9 Grand Touring AWD',
            rows,
        },
    ],
}