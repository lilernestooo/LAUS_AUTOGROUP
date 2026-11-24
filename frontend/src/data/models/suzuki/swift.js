export default {
    brandName: 'Suzuki',
    backTo: '/brands/suzuki',
    name: 'Suzuki Swift',
    images: ['SUZUKI-Shift-min.png'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20',
    noShadow: true,
    brochure: '#',
    overview:
        'SWIFT UPLIFTS YOU\nA CAR HAS TO BE AN ENTITY THAT STIRS THE EMOTIONS.\nTHE NEW SWIFT IS MEANT TO DRIVE THE HEART.\nSTANDOUT CHARACTER ARTICULATED THROUGH STYLING AND COLOUR.\nCONFORMABLE AND UNBINDING.\nWELCOME TO A DAILY URGE TO GET BEHIND THE WHEEL AND TO AN EXCITING CAR EXPERIENCE THAT KNOWS NO END. IN EVERY POSSIBLE WAY, THE SWIFT “UPLIFTS”.',
    specs: [
        {
            matrix: {
                columns: ['GL – M/T', 'GL – CVT', 'GLX – CVT'],
                groups: [
                    {
                        title: 'Engine',
                        rows: [
                            ['FUEL TYPE', 'Gasoline', 'Gasoline', 'Gasoline'],
                            ['TYPE (ENGINE)', 'K12M', 'K12M', 'K12M'],
                            ['NO. OF CYLINDERS', '4', '4', '4'],
                            ['NO. OF VALVES', '16', '16', '16'],
                            ['DISPLACEMENT', '1,197 cm3', '1,197 cm3', '1,197 cm3'],
                            ['MAX. OUTPUT', '82 Hp @ 6,000 rpm', '82 Hp @ 6,000 rpm', '82 Hp @ 6,000 rpm'],
                            ['MAX. TORQUE', '113 Nm @ 4,200 rpm', '113 Nm @ 4,200 rpm', '113 Nm @ 4,200 rpm'],
                            ['FUEL DISTRIBUTION', 'Multipoint Injection', 'Multipoint Injection', 'Multipoint Injection'],
                            ['TYPE (TRANSMISSION)', '5 MT', 'CVT', 'CVT'],
                        ],
                    },
                    {
                        title: 'Chassis',
                        rows: [
                            ['STEERING', 'Rack & Pinion', 'Rack & Pinion', 'Rack & Pinion'],
                            ['BRAKES FRONT', 'Ventilated Disc', 'Ventilated Disc', 'Ventilated Disc'],
                            ['BRAKES REAR', 'Dum, Leading & Trailing', 'Dum, Leading & Trailing', 'Disc'],
                            [
                                'SUSPENSION FRONT',
                                'MacPherson Strut w/Coil Spring',
                                'MacPherson Strut w/Coil Spring',
                                'MacPherson Strut w/ Coil Spring',
                            ],
                            [
                                'SUSPENSION REAR',
                                'Torsion Beam w/ Coil Spring',
                                'Torsion Beam w/ Coil Spring',
                                'Torsion Beam w/ Coil Spring',
                            ],
                            ['TIRES', '185 / 55 R16', '185 / 55 R16', '185 / 55 R16'],
                        ],
                    },
                ],
            },
        },
    ],
    variants: [
        {
            name: 'Swift 1.4L Gas M/T',
            rows: [
                ['Engine', 'K14B,1.4L, 16-valve with variable valve timing (VVT)'],
                ['Transmission', 'Automatic Transmission-straight pattern shift lever'],
                ['Suspension', 'McPherson strut with coil spring(front), Torsion beam with coil spring(rear)'],
                ['Brakes', '14″ Ventilated Disc(front), Leading and trailing drum(rear)'],
                ['Audio', 'Dashboard integrated audio system, aircon controls and USB audio connectivity'],
                ['Seating Capacity', '5'],
                ['Colors', 'Ablaze Red, Snow White Pearl, Star Silver Metallic'],
            ],
        },
    ],
}