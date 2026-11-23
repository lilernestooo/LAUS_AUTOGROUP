/* the audio text is the same on all three versions */
const audio =
    '7″ Touchscreen LCD Monitor, Single CD, MP3, AUX-in, Two USB, 12V power supply and Bluetooth® Function with Voice Command; 6pcs speakers, standard commander control, Standard Bluetooth hands-free system'

/* the two 1.5 versions have the same specs */
const rows15 = [
    ['Engine', '1.5 SKYACTIV-G In-line 4-Cylinder DOHC, 16 Valves'],
    ['Transmission', 'SKYACTIV-DRIVE 6-Speed Automatic'],
    ['Suspension', 'Front: MacPherson Struts | Rear: Multi-link beam'],
    ['Brakes', 'Front: Ventilated Discs | Rear: Solid Discs'],
    ['Audio', audio],
    ['Seating Capacity', '5'],
    ['Colors', 'Aluminum metallic, White pearl, Jet black'],
]

export default {
    brandName: 'Mazda',
    backTo: '/brands/mazda',
    name: 'Mazda3',
    images: ['MAZDA-MAZDA3.jpg'], // placeholder: replace with the real detail photo file name
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20', // the photo is shorter than the viewer box: pulls the buttons up (more negative = smaller gap)
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overview: `Mazda3 sports a wide range of enhancements intended to elevate the ownership experience of Mazda3 customers. From the outside, the KODO: Soul of Motion-inspired form of the 2016 Mazda3 is updated with new front and rear bumper designs. Showing off a more aggressive stance fore and aft, the new bumpers are complemented by a revised signature wing on the grill assembly that shows increased three-dimensionality.`,
    specs: [
        {
            name: 'Mazda 3 2.0 Sedan SKYACTIV R with i-ELOOP and i-STOP',
            rows: [
                [
                    'Engine',
                    '2.0 SKYACTIV-G In-line 4-Cylinder DOHC, 16 Valves with i-STOP(Idling Stop System) & i-ELOOP',
                ],
                ['Transmission', 'SKYACTIV-DRIVE 6-Speed Automatic'],
                ['Suspension', 'Front: MacPherson Struts|Rear: Multi-link beam'],
                ['Brakes', 'Front: Ventilated Discs | Rear: Discs'],
                ['Audio', audio],
                ['Seating Capacity', '5'],
                ['Colors', 'Soul Red, Aluminum metallic, white pearl, jet black and deep crystal blue'],
            ],
        },
    ],
    variants: [
        {
            name: 'Mazda 3 1.5 Sedan SkyActiv V',
            rows: rows15,
        },
        {
            name: 'Mazda 3 1.5 Hatchback SkyActiv V',
            rows: rows15,
        },
    ],
}