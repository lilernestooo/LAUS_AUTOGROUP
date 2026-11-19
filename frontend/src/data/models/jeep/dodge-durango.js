export default {
    brandName: 'Jeep',
    backTo: '/brands/jeep',
    name: 'Dodge Durango',
    images: ['JEEP-2018-dodge-durango-gt.png'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: 'mb-0',
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overviewSpecs: [
        {
            rows: [
                ['Engine', '3.6L V6 WT Engine'],
                ['Transmission', '8-Speed AT'],
                ['Output', '286 Hp @ 6,350 rpm'],
                ['Torque', '347 Nm @ 4,300 rpm'],
            ],
        },
    ],
    specs: [
        {
            groups: [
                {
                    title: 'Engine & Transmission',
                    rows: [
                        ['Engine', '3.6L V6 WT Engine'],
                        ['Transmission', '8-Speed AT'],
                        ['Output', '286 Hp @ 6,350 rpm'],
                        ['Torque', '347 Nm @ 4,300 rpm'],
                    ],
                },
                {
                    title: 'Safety and Convenience',
                    rows: [
                        [
                            'Features',
                            [
                                'Advanced Multistage Front Air Bags',
                                'Anti-Lock 4-Wheel Functional Disc HD Brakes',
                                'Auto High Beam Headlamp Control',
                                'Automatic Headlamp Leveling System',
                                'Automatic Headlamps',
                                'Blind Spot and Cross Path Detection',
                                'Conventional Differential Rear Axle',
                                'Driver Inflatable Knee-Bolster Air Bag',
                                'Electric Power Steering',
                                'Electronic Stability Control',
                                'Front Passenger Seat Belt Alert',
                                'GPS Navigation',
                                'Hill Start Assist',
                                'Integrated Voice Command with Bluetooth',
                                'Lock on Sync Tire Press Sensor',
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
                                '20-inch x8.0 Premium Painted Aluminum Wheels',
                                '265/50R20 Performance A/S Tires',
                                'Acoustic Windshield',
                                'Black Headlamp Bezels',
                                'Body Color Door Handles',
                                'Body Color Exterior Mirrors',
                                'Body Color Front & Rear Fascia',
                                'Body Color Shark Fin Antenna',
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
                                '12V Auxiliary Power Outlet',
                                '2nd Row Console with Armrest and Storage',
                                '2nd Row Fold/Tumble Captain Chairs',
                                '6 Passenger Seating',
                                '8.4 Touchscreen Display',
                                '9 Alpine Amplified Speakers with Subwoofer',
                                'Active Head Restraints',
                                'Apple Carplay/Google Android Auto',
                                'Auto Dim Exterior Driver Mirror',
                                'Automatic Triple Zone Control Airconditioning',
                                'Bright Cargo Area Scuff Pads',
                                'Bright Front Door Sill Scuff Pads',
                                'Cargo Compartment Carpet and Cover',
                                'Cargo Tie Down Loops',
                                'Child Seat Anchor System – LATCH Ready',
                                'Cigar Lighter',
                            ].join('\n'),
                        ],
                    ],
                },
            ],
        },
    ],
    variants: [],
}