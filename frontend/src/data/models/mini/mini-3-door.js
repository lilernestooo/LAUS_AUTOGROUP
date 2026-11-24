const lines = (...items) => items.join('\n')

export default {
    brandName: 'MINI',
    backTo: '/brands/mini',
    name: 'MINI 3 Door',
    images: ['MINI-3-DOOR-specs-min.png'],
    carScale: 1.2,
    carTop: '-mt-10 md:-mt-24',
    carBottom: '-mb-16 md:-mb-32',
    noShadow: true,
    brochure: '#',
    hideBrochure: true,
    overview: `Faster, feistier and more fun than ever, the iconic MINI 3 Door embodies the essence of high speeds, thrilling low centre-of-gravity handling and exhilarating go-kart feeling. Smart, charismatic with impeccable manners, it’s like your perfect evening date. Every single time. Packed with urban personality and more valuable standard features than ever, it’s just waiting for you to make it yours. It’s ready to make your life a whole lot brighter.`,
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
                            lines('Roof in Chili Red.', 'Mirror Cap in Chili Red.', 'Bonnet stripes in Chili Red.')
                        ],
                    ],
                },
            ],
        },
    ],
}