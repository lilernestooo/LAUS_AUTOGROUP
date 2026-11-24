const lines = (...items) => items.join('\n')

export default {
    brandName: 'MINI',
    backTo: '/brands/mini',
    name: 'MINI Convertible',
    images: ['MINI-CONVERTIBLE-specs-min.png'],
    carScale: 1.2,
    carTop: '-mt-10 md:-mt-24', // the photo has white space above the car: more negative = car moves up
    carBottom: '-mb-16 md:-mb-32', // the photo has white space under the car: more negative = smaller gap above the buttons
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overview: `Boldly outgoing and open minded, MINI Convertible is packed with impulse and energy. The very essence of roof down, summer driving excitement – it stimulates your senses and lets you capture and share those subtle moments of pure open-road joy. It’s a non-stop thrill behind the wheel. It’ll make you feel more alive and offer an air of sophistication in the sunshine. With unlimited headroom, there’s always a little more to enjoy.`,
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
                            lines('2 mirror cap colours available', 'Bonnet stripes available in black or white'),
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
                                '2 mirror cap colours available',
                                'Bonnet stripes available in black or white',
                                'Air scoop in the bonnet, track-style grille, icon “S” emblem, lower air intakes'
                            ),
                        ],
                    ],
                },
            ],
        },
        {
            name: 'JOHN COOPER WORKS',
            groups: [
                {
                    title: 'Engine and Transmission',
                    rows: [
                        ['Power', '231 PS (170 kW)'],
                        ['Fuel Type', 'Petrol'],
                        ['Transmission', 'Manual, Sports Automatic'],
                        ['Drive', '2-wheel'],
                        [
                            'Basic Characteristics',
                            lines(
                                '3 Mirror Cap colours available.',
                                'Bonnet stripes in Black or White.',
                                'Air scoop in the bonnet, track-style grille, iconic “JCW” emblem, lower air intakes'
                            ),
                        ],
                    ],
                },
            ],
        },
    ],
}