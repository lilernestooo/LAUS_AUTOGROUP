export default {
    brandName: 'Jeep',
    backTo: '/brands/jeep',
    name: 'Dodge Charger SXT',
    images: ['JEEP-2019-charger.jpg'], // placeholder: replace with the real detail photo file name
    scene: true, // the photo shows the car on a road, so it is framed as a picture (no glow or ground shadow)
    carTop: 'mt-0',
    carBottom: 'mb-0',
    brochure: '#',
    overviewSpecs: [
        {
            rows: [
                ['Engine', '3.6L Pentastar™ VVT V6 engine'],
                ['Transmission', '8-speed TorqueFlite® automatic transmission'],
            ],
        },
    ],
    specs: [
        {
            groups: [
                {
                    title: 'Engine & Transmission',
                    rows: [
                        ['Engine', '3.6L Pentastar™ VVT V6 engine'],
                        ['Transmission', '8-speed TorqueFlite® automatic transmission'],
                    ],
                },
                {
                    title: 'Drive Type',
                    rows: [['Features', ['All-wheel Drive', 'Rear-wheel Drive'].join('\n')]],
                },
                {
                    title: 'Capability & Functionality',
                    rows: [
                        [
                            'Features',
                            [
                                '2.62 rear axle ratio and 195-mm rear axle',
                                'Electric power steering',
                                'Engine block heater',
                                '160-amp alternator',
                                '730-amp maintenance-free battery',
                                'Touring suspension',
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
                                'Illuminated rear assist handles',
                                'Air conditioning with dual-zone manual temperature control and air filtering',
                                'Dubplate interior accents',
                                'Media hub including 2 USB ports and auxiliary audio input jack',
                                'Sun visors with illuminated mirrors',
                                'Hands-free communication with Bluetooth® streaming audio',
                                'Leather-wrapped shift knob',
                                '7-inch full-colour customizable in-cluster display centre',
                                'Uconnect® 4 multimedia centre with 7-inch touchscreen and 6 speakers',
                                'Front and rear floor mats',
                                'Acoustic windshield and front-door glass',
                                'Apple CarPlay compatibility and Android Auto™',
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
                                'P215/65R17 low-rolling-resistance tires',
                                'Body-colour fascia appliqué',
                                'Capless fuel filler',
                                'Body-colour door handles',
                                'Automatic bifunctional halogen projector headlamps with Black accents',
                                'Charger badge',
                                'Dual bright exhaust tips',
                                'Body-colour, power exterior mirrors, manual folding',
                                '17-inch Fine Silver aluminum wheels',
                                'Gloss Black grille and crosshairs',
                            ].join('\n'),
                        ],
                    ],
                },
                {
                    title: 'Safety & Security',
                    rows: [
                        [
                            'Features',
                            [
                                'Tire pressure monitoring display',
                                'Sentry Key® antitheft engine immobilizer',
                                'Compact spare tire',
                                '7 air bags including advanced multistage front, supplemental side curtain front/rear, supplemental front-seat-mounted side and driver’s knee blocker',
                                'Reactive front head restraints',
                                'Hydraulic assist brake booster',
                                'Keyless Enter ‘n Go™ with proximity entry and push-button start',
                                'Park-Sense® Rear Park Assist System',
                                'ParkView® Rear Back-Up Camera',
                                'Electronic Stability Control (ESC) with Hill Start Assist, All-Speed Traction Control, Electronic Roll Mitigation and Trailer Sway Control',
                                '4-wheel antilock disc brakes with Brake Assist, Rain Brake Support and Ready Alert Braking',
                            ].join('\n'),
                        ],
                    ],
                },
            ],
        },
    ],
    variants: [
        {
            name: 'Dodge Charger GT',
            rows: [
                [
                    'Enhancements vs. SXT',
                    [
                        'Performance fascia and functional hood scoop',
                        '2–inch Granite Crystal aluminum wheels',
                        'Super Track Pak with three-mode Electronic Stability Control',
                        'Dodge Performance Pages',
                    ].join('\n'),
                ],
            ],
        },
        {
            name: 'Dodge Charger R/T',
            rows: [
                [
                    'Enhancements vs. GT',
                    [
                        '5.7L HEMI VVT V8 with 370 hp and 395 lb-ft of torque',
                        '2.62 rear axle aratio and 20-mm rear axle',
                        'Active exhaust',
                        'R/T and HEMI badging',
                    ].join('\n'),
                ],
            ],
        },
        {
            name: 'Dodge Scat Pack 392',
            rows: [
                [
                    'Enhancements vs. R/T',
                    [
                        '6.4 SRT HEMI V8 engine with 485 hp and 475 lb-ft of torque',
                        'Heated front seats and steering wheel',
                        '20×9 Black Noise Aluminum wheels',
                        'High-performance suspension',
                    ].join('\n'),
                ],
            ],
        },
        {
            name: 'Dodge SRT Hellcat',
            rows: [
                [
                    'Enhancements vs. Scat Pack 392',
                    [
                        '6.2L Supercharged HEMI SRT Hellcat V8 engine with 707 hp and 650 lb-ft of torque',
                        'Competition suspension with active damping',
                        'Performance hood with dual heat extractors',
                        'High performance 4-wheel antilock disc brakes with red-painted 6-piston Brembo calipers',
                    ].join('\n'),
                ],
            ],
        },
    ],
}