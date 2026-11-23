export default {
    brandName: 'Kia',
    backTo: '/brands/kia',
    name: 'Kia Stinger',
    images: ['KIA-Stinger.jpg'], // placeholder: replace with the real detail photo file name
    scene: true, // photo with a background (road, city): framed as a picture
    // if your file is a cut-out (transparent or white background) delete the line above and use these instead:
    // carScale: 1.3, noShadow: true, carBottom: '-mb-10 md:-mb-28',
    carTop: 'mt-0',
    carBottom: 'mb-0',
    brochure: '#',
    overview: `The new paradigm of gran turismo

High performance, supreme comfort. Rarely has a new car brought both of these extremes together so seamlessly.
The Stinger is a car you can dream about all night and drive all day.`,
    specs: [
        {
            rows: [
                ['Horsepower', '255 hp @6200 rpm'],
                ['Torque', '260 ft-lb @1400 rpm'],
                ['Transmission', '8-Speed A/T'],
                ['Drive Train', 'All wheel drive'],
                ['Number of Seats', '5'],
            ],
        },
    ],
    variants: [],
}