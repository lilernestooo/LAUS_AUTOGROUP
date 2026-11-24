/* a line break inside a value makes a bullet list */
const lines = (...items) => items.join('\n')

export default {
    brandName: 'MINI',
    backTo: '/brands/mini',
    name: 'MINI Clubman',
    images: ['MINI-CLUBMAN-specs-min.png'],
    carScale: 1.2,
    carTop: '-mt-10 md:-mt-24',
    carBottom: '-mb-16 md:-mb-32',
    noShadow: true,
    brochure: '#',
    hideBrochure: true,
    overview: `The epitome of style meeting function, the discerning MINI Clubman is a refined classic compact car designed to give you the highest level of comfort and everyday practicality. With its distinctive split doors at the rear, soft-touch finishes and premium technologies, it’s the cultured extension of the MINI family. Hair brushed and parted, it’s ready to show you a whole new level of motoring.`,
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
                                '3 roof colours available',
                                '3 mirror cap colours available',
                                'Optional bonnet stripes available in black or white'
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
                        ['Transmission', 'Manual, Automatic'],
                        ['Drive', '2-wheel'],
                        [
                            'Basic Characteristics',
                            lines(
                                '3 roof colours available',
                                '3 mirror cap colours available',
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
                        ['Drive', '4-wheel'],
                        [
                            'Basic Characteristics',
                            lines(
                                '3 roof colours available',
                                '3 mirror cap colours available',
                                'Bonnet stripes available in Black or White',
                                'Air scoop in the bonnet, track-style grille, iconic “JCW” emblem, lower air intakes'
                            ),
                        ],
                    ],
                },
            ],
        },
    ],
}