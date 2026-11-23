const rows = [
    [
        'Engine',
        '2.0L Theta II Gas engine, 16 valves, multi-point injection(MPI), DOHC with Dual Continuous Variable Valve Timing(CVVT)',
    ],
    ['Transmission', '6-Speed A/T with Shiftronic Feature and Shiftlock'],
    ['Suspension', 'McPherson Strut with Coil Springs/Multi-link Type'],
    ['Brakes', 'Ventilated Disc/Solid Disc'],
    ['Audio', 'Ports, iPod cable, 6-speakers(Manual Type)'],
    ['Seating Capacity', '5'],
    ['Colors', 'Clear White(UD),Sand Track, Signal red(BEG), Black Cherry (9P)'],
]

export default {
    brandName: 'Kia',
    backTo: '/brands/kia',
    name: 'Kia Sportage',
    images: ['Sportage.png'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-10 md:-mb-28', // the PNG has white padding under the car: make this more negative to pull the tabs up
    noShadow: true, // the PNG already has its own ground shadow
    brochure: '#',
    overview: `Born into the modern world

The sun rises on a bold, dynamic design, with curves and lines an expression of captivating style and sharp sophistication. The new Sportage, a car that lets you live life to the full.`,
    specs: [
        {
            name: 'Sportage 2.0L AWD GAS EX A/T',
            rows,
        },
    ],
    variants: [
        {
            name: 'Sportage 2.0L 2WD GAS EX A/T',
            rows,
        },
    ],
}