const common = [
    ['Engine', 'SKYACTIV-G 2.0L'],
    ['Transmission', 'SKYACTIV-DRIVE 6-SPEED with Sport Mode'],
    ['Suspension', 'Front: MacPherson Struts | Rear: Torsion Beam'],
    ['Brakes', 'Front: Ventilated Discs | Rear: Solid Discs'],
]

/* the lower versions have a smaller speaker system */
const audioBose =
    'Mazda Connect with 8.8″ LCD Monitor, 2-USB, Bluetooth, & Smartphone Mirroring, 12-Speaker BOSE® Sound System'
const audioHarmonic =
    'Mazda Connect with 8.8″ LCD Monitor, 2-USB, Bluetooth, & Smartphone Mirroring, 8 Pc Speaker Mazda Harmonic Acoustics'

export default {
    brandName: 'Mazda',
    backTo: '/brands/mazda',
    name: 'Mazda CX-30',
    images: ['MAZDA-CX30.png'], // placeholder: replace with the real detail photo file name
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20', // the photo is shorter than the viewer box: more negative = smaller gap above the buttons
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overview: `Forge ahead with the Mazda CX-30 and feel assured behind the wheel. The i-ACTIVSENSE suite also comes with features that aim to provide adequate support to the driver. After a tiring day or a long drive, driver fatigue can set in. This is where an advanced safety technology like Driver Monitoring is most especially helpful. Also assisting with driver fatigue is the Cruising and Traffic Support which is useful in slow-moving traffic.`,
    specs: [
        {
            name: 'AWD Signature',
            rows: [...common, ['Audio', audioBose]],
        },
    ],
    variants: [
        {
            name: 'AWD Sport',
            rows: [...common, ['Audio', audioBose]],
        },
        {
            name: '2WD Sport',
            rows: [...common, ['Audio', audioHarmonic]],
        },
        {
            name: '2WD Pro',
            rows: [...common, ['Audio', audioHarmonic]],
        },
    ],
}