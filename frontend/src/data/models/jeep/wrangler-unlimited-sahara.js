export default {
    brandName: 'Jeep',
    backTo: '/brands/jeep',
    name: 'The All-New Generation Wrangler Unlimited Sahara',
    images: ['JEEP-wrangler-unlimited-sahara.png'], // placeholder: replace with the real detail photo file name
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: 'mb-0',
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overviewSpecs: [
        {
            rows: [
                ['Engine', '2.0L 14 DOHC DI Turbo Engine'],
                ['Transmission', '8-Speed AT'],
                ['Output', '268 Hp @ 5,250 rpm'],
                ['Torque', '400 Nm @ 3,000 rpm'],
            ],
        },
    ],
    specs: [
        {
            groups: [
                {
                    title: 'Engine & Transmission',
                    rows: [
                        ['Engine', '2.0L 14 DOHC DI Turbo Engine'],
                        ['Transmission', '8-Speed AT'],
                        ['Output', '268 Hp @ 5,250 rpm'],
                        ['Torque', '400 Nm @ 3,000 rpm'],
                    ],
                },
                {
                    title: 'Safety and Convenience',
                    rows: [
                        [
                            'Features',
                            [
                                '2:72:1 Selec-Trac Full Time 4WD System',
                                'Active Noise Control System',
                                'Adaptive Rear Brake Lights',
                                'Advanced Brake Assist',
                                'Anti-Lock 4-Wheel FNC Disc HD Brakes',
                                'Anti-Spin Differential Rear Axle',
                                'Child Seat Upper Tether Anchorage',
                                'Conventional Differential Rear Axle',
                                'Daytime Running Lamp System',
                                'Dual Note Electric Horns',
                                'Electronic Roll Mitigation',
                                'Electronic Stability Control',
                                'Euro Stage 6b Emissions',
                            ].join('\n'),
                        ],
                    ],
                },
                {
                    title: 'Exterior',
                    rows: [
                        [
                            'Features',
                            [
                                '18X7.5 Polished Wheels with Gray Spokes',
                                '2 Front 1 Rear Tow Hooks',
                                '255/70R18 All Season Tires',
                                'All Steel Wheels',
                                'Automatic Headlamps',
                                'Black 3-Piece Hard Top',
                                'Black Front Frame Overlay',
                                'Black Fuel Filler Door',
                                'Body Color Fender Flares',
                                'Body Color Grille',
                                'Center High Mount Signal Lamp (CHMSL)',
                            ].join('\n'),
                        ],
                    ],
                },
                {
                    title: 'Interior',
                    rows: [
                        [
                            'Features',
                            [
                                '230V Auxiliary Power Outlet',
                                'Air Conditioning with Auto Temp Control',
                                'Alpine Premium Audio System',
                                'Ambient LED Interior Lighting',
                                'Apple CarPlay',
                                'Cluster 7.0 TFT Color Display',
                                'Console Bin Task Light',
                                'Electronic Steering Column Shaft Lock',
                                'Freedom Panel Storage Bag',
                                'Full Length Floor Console',
                                'Google Android Auto',
                            ].join('\n'),
                        ],
                    ],
                },
            ],
        },
    ],
    variants: [],
}