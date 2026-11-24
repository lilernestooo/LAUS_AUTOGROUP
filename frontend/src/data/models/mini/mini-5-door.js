/* a line break inside a value makes a bullet list */
const lines = (...items) => items.join('\n')

export default {
    brandName: 'MINI',
    backTo: '/brands/mini',
    name: 'MINI 5 Door',
    images: ['MINI-5-DOOR-specs-min.png'], // placeholder: replace with the real detail photo file name
    carScale: 1.2,
    carTop: '-mt-10 md:-mt-24', // the photo has white space above the car: more negative = car moves up
    carBottom: '-mb-16 md:-mb-32', // the photo has white space under the car: more negative = smaller gap above the buttons
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    hideBrochure: true,
    overview: `The original style icon – now reinterpreted for modern city driving. Mixing hallmark MINI attitude with more doors, head room and leg room, this reliable 5-door hatchback is transforming the look of cities, roads and parking spaces all around the world. Your customisation options are almost endless. And it lets you get more in it – and out of it – without sacrificing that agile go-kart handling MINI is known for.`,
    specs: [
        {
            name: 'COOPER',
            groups: [
                {
                    title: 'Engine and Transmission',
                    rows: [
                        ['Power', '136 PS (100 kW)'],
                        ['Fuel Type', 'Petrol'],
                        ['Transmission', 'Manual, Automatic'],
                        ['Drive', '2-wheel'],
                        [
                            'Basic Characteristics',
                            lines(
                                '2 roof colours available',
                                '2 mirror cap colours available',
                                'Bonnet stripes available in black or white'
                            ),
                        ],
                    ],
                },
            ],
        },
    ],
    variants: [
        {
            name: 'COOPER S',
            groups: [
                {
                    title: 'Engine and Transmission',
                    rows: [
                        ['Power', '192 PS (141 kW)'],
                        ['Fuel Type', 'Petrol'],
                        ['Transmission', 'Manual, Automatic, Sports Automatic'],
                        ['Drive', '2-wheel'],
                        [
                            'Basic Characteristics',
                            lines(
                                '2 roof colours available',
                                '2 mirror cap colours available',
                                'Bonnet stripes available in black or white',
                                'Air scoop in the bonnet, track-style grille, icon “S” emblem, lower air intakes'
                            ),
                        ],
                    ],
                },
            ],
        },
    ],
}