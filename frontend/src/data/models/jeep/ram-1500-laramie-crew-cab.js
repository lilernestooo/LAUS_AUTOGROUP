export default {
    brandName: 'Jeep',
    backTo: '/brands/jeep',
    name: 'Ram 1500 Laramie Crew Cab',
    images: ['JEEP-Ram-1500-laramie-crew-cab2019.png'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: 'mb-0',
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overviewSpecs: [
        {
            rows: [
                ['Engine', '5.7L HEMI V8 Engine'],
                ['Transmission', '8-Speed AT'],
                ['Output', '395 Hp @ 5,600 rpm'],
                ['Torque', '410 Nm @ 3,950 rpm'],
            ],
        },
    ],
    specs: [
        {
            groups: [
                {
                    title: 'Engine & Transmission',
                    rows: [
                        ['Engine', '5.7L HEMI V8 Engine'],
                        ['Transmission', '8-Speed AT'],
                        ['Output', '395 Hp @ 5,600 rpm'],
                        ['Torque', '410 Nm @ 3,950 rpm'],
                    ],
                },
                {
                    title: 'Safety and Convenience',
                    rows: [
                        [
                            'Features',
                            [
                                'Active Noise Control System',
                                'Advanced Multistage Front Air Bags',
                                'Anti-Lock 4-Wheel FNC Disc Brakes',
                                'Blind Spot and Cross Path Detection',
                                'Conventional Differential Rear Axle',
                                'Daytime Running Headlamps, Low Beam',
                                'Electric Park Brake',
                                'Electric Power Steering',
                                'Electric Shift On Demand Transfer Case',
                                'Electronic Roll Mitigation',
                                'Electronic Stability Control',
                                'Front/Rear Heavy Duty Shock Absorbers',
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
                                '20X9.0 Premium Paint/Polished Wheels',
                                '275/55R20 AS LRR Tire',
                                '4 Adjustable Cargo Tie-Down Hooks',
                                '4X4 Badge',
                                '5 ft. Cargo Box',
                                'Accent Color Shark Fin Antenna',
                                'Auto Dim Exterior Driver/Passenger Mirror',
                                'Auto High Beam Headlamp Control',
                                'Automatic Headlamps',
                                'Body Color Fender Flares',
                                'Body Color/Chrome Door Handles',
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
                                '115V Auxiliary Power Outlet',
                                '2nd Row In Floor Storage Bins',
                                '4 Way Front Headrests',
                                '9 Amplified Speakers with Subwoofer',
                                'Apple Carplay',
                                'Audio Jack Input for Mobile Devices',
                                'Automatic Airconditioning with Dual Zone Control',
                                'Bright Rotary Shifter',
                                'Cluster 7.0 TFT Color Display',
                                'Driver/Passenger Assist Handles',
                            ].join('\n'),
                        ],
                    ],
                },
            ],
        },
    ],
    variants: [],
}