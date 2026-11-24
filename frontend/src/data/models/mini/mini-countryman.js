/* a line break inside a value makes a bullet list */
const lines = (...items) => items.join('\n')

export default {
    brandName: 'MINI',
    backTo: '/brands/mini',
    name: 'MINI Countryman',
    images: ['MINI-COUNTRYMAN-specs-min.png'], // placeholder: replace with the real detail photo file name
    carScale: 1.2,
    carTop: '-mt-10 md:-mt-24', // the photo has white space above the car: more negative = car moves up
    carBottom: '-mb-12 md:-mb-24',
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overview: `Equipped with a ruggedly handsome design, MINI Countryman is the ultimate all-rounder, ready to take you places other vehicles can’t reach. Whether it’s a winding coastal road or the bustle of the city, it gives you a driving experience you’ll always look forward to. Enjoy a new-found freedom and flexibility to drive anywhere. And enjoy telling your stories when you return.`,
    specs: [
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
                                'Air scoop in the bonnet, track-style grille, iconic “S” emblem, lower air intakes'
                            ),
                        ],
                    ],
                },
            ],
        },
    ],
    variants: [
        {
            name: 'JOHN COOPER WORKS',
            groups: [
                {
                    title: 'Engine and Transmission',
                    rows: [
                        ['Power', '231 PS (170 kW)'],
                        ['Fuel Type', 'Petrol'],
                        ['Transmission', 'Manual, Sports Automatic'],
                        ['Drive', '4-wheel'],
                        [
                            'Basic Characteristics',
                            lines(
                                '2 roof colours available',
                                '2 mirror cap colours available',
                                'Bonnet stripes in Black or White',
                                'Air scoop in the bonnet, track-style grille, iconic “JCW” emblem, lower air intakes'
                            ),
                        ],
                    ],
                },
            ],
        },
    ],
}