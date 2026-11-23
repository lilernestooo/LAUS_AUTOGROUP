/* All three versions share the same specs on the old site */
const rows = [
    ['Engine', 'In-line, 4 Cylinder DOHC, 16-Valve, S-VT'],
    ['Transmission', '5 Speed Manual'],
    ['Suspension', 'Front: MacPherson Struts | Rear: Torsion Beam'],
    ['Brakes', 'Front: Disc | Rear: Drum'],
    ['Audio', 'AM/FM Single in-Dash CD with MP3 capability, aux input jack and 4 Speakers'],
    ['Seating Capacity', '5'],
    ['Colors', 'Black Mica, Highlight Silver, Sparkling Gold, Arctic White'],
]

export default {
    brandName: 'Mazda',
    backTo: '/brands/mazda',
    name: 'Mazda2',
    images: ['MAZDA-MAZDA2.jpg'], // placeholder: replace with the real detail photo file name
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20', // the photo is shorter than the viewer box: pulls the buttons up (more negative = smaller gap)
    noShadow: true, // the photo already has its own soft ground shadow
    // cuts off the grey strip on the right and fades the photo's rectangle edges into the page
    imgClass: '[clip-path:inset(0_1.5%_0_0)] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_70%)]',
    brochure: '#',
    overview: `The all-new Mazda2 draws on the experience of its critically-acclaimed and award-winning Mazda family to create a sub-compact car that redefines your expectation completely.
Combining the full range of SKYACTIV Technology (engine, transmission, body and chassis) and the KODO Soul of Motion design philosophy, the all-new Mazda2 delivers performance and driving pleasure without compromise.`,
    specs: [
        {
            name: 'Mazda 2 1.3 R',
            rows,
        },
    ],
    variants: [
        {
            name: 'Mazda 2 1.5 V',
            rows,
        },
        {
            name: 'Mazda 2 1.3 R Hatchback',
            rows,
        },
    ],
}