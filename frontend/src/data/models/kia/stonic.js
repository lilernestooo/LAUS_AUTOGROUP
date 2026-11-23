export default {
    brandName: 'Kia',
    backTo: '/brands/kia',
    name: 'Kia Stonic',
    images: ['Kia-Stonic.jpg'], // change to your real file name in src/assets/kia
    scene: true,
    brochure: '#',
    overview: `Style that’s Iconic
This one’s for the trendsetters. The bold. The free.
The generation that will lead us to a stylish future.
One that values individual expression. Check it out!`,
    specs: [
        {
            name: 'KIA STONIC (5-speed M/T)',
            groups: [
                {
                    title: 'Dimensions (mm)',
                    rows: [
                        ['Overall Length', '4,100'],
                        ['Overall Width', '1,735'],
                        ['Overall Height', '1,533'],
                        ['Wheelbase', '2,570'],
                    ],
                },
                {
                    title: 'Engine and Transmission',
                    rows: [
                        ['Engine', '1.4 Dual-CVVT'],
                        ['Displacement (cc)', '1,368'],
                        ['Transmission', '5-speed M/T'],
                        ['Max. Power (ps/rpm)', '95 / 6,000'],
                        ['Max. Torque (nm/rpm)', '132 / 4,000'],
                    ],
                },
            ],
        },
    ],
    variants: [
        {
            name: 'KIA STONIC (6-speed A/T)',
            groups: [
                {
                    title: 'Engine and Transmission',
                    rows: [
                        ['Engine', '1.4 Dual-CVVT'],
                        ['Displacement (cc)', '1,368'],
                        ['Transmission', '6-speed A/T'],
                        ['Max. Power (ps/rpm)', '100 / 6,000'],
                        ['Max. Torque (nm/rpm)', '132 / 4,000'],
                    ],
                },
            ],
        },
    ],
}