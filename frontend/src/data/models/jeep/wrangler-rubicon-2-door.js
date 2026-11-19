/* The 2.0L and 3.6L versions share the same equipment lists on the old site */
const safety = [
    '4:1 Rock Trac HD Full Time 4WD System',
    'Active Noise Control System',
    'Adaptive Rear Brake Lights',
    'Advanced Brake Assist',
    'Anti-Lock 4-Wheel FNC Disc HD Brakes',
    'Child Seat Upper Tether Anchorage',
    'Daytime Running Lamp System',
    'Dual Note Electric Horns',
    'Electronic Roll Mitigation',
    'Electronic Stability Control',
    'Euro Stage 6b Emissions',
    'Four Wheel Drive',
].join('\n')

const exterior = [
    '2 Front 1 Rear Tow Hooks',
    'All Aluminum Wheels',
    'Automatic Headlamps',
    'Black Fuel Filler Door',
    'Body Color 3-Piece Hard Top',
    'Body Color Fender Flares',
    'Center High Mount Signal Lamp (CHMSL)',
    'E-Marked Exterior Lighting Exterior Mirrors with Supplemental Signals',
].join('\n')

const interior = [
    '230V Auxiliary Power Outlet',
    'Air Conditioning with Auto Temp Control',
    'Alpine Premium Audio System',
    'Ambient LED Interior Lighting',
    'Apple CarPlay',
    'Cluster 7.0 TFT Color Display',
    'Console Bin Task Light',
    'Dual Remote USB Port – Charge Only',
    'Electronic Steering Column Shaft Lock',
    'Freedom Panel Storage Bag',
    'Full Length Floor Console',
].join('\n')

const equipment = [
    { title: 'Safety and Convenience', rows: [['Features', safety]] },
    { title: 'Exterior', rows: [['Features', exterior]] },
    { title: 'Interior', rows: [['Features', interior]] },
]

export default {
    brandName: 'Jeep',
    backTo: '/brands/jeep',
    name: 'All-New Generation Wrangler Rubicon (2-Door)',
    images: ['JEEP-Wrangler-rubicon-2door.png'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: 'mb-0',
    noShadow: true,
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
                ...equipment,
            ],
        },
    ],
    variants: [
        {
            name: 'All-New Generation Wrangler Rubicon (2-Door) 3.6L',
            groups: [
                {
                    title: 'Engine & Transmission',
                    rows: [
                        ['Engine', '3.6L V6 WT Engine'],
                        ['Transmission', '8-Speed AT'],
                        ['Output', '286 Hp @ 6,400 rpm'],
                        ['Torque', '353 Nm @ 4,800 rpm'],
                    ],
                },
                ...equipment,
            ],
        },
    ],
}