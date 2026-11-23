/* The old site shows one table with a column per variant. A cell is a string (one variant)
   or [text, span] when it covers several variants side by side. */
const columns = ['1.5 SX AT', '1.5 EX AT', '1.5 LX AT', '1.5 LX MT']

export default {
    brandName: 'Kia',
    backTo: '/brands/kia',
    name: 'Sonet',
    images: ['Sonet.png'],
    carScale: 1.3,
    carTop: 'mt-0',
    carBottom: '-mb-10 md:-mb-28',
    noShadow: true,
    hideVariants: true,
    brochure: '#',
    overview: `In a world gone tame, The new Sonet is here to set you free.
Chiseled to perfection, raw in power, and loaded with tech, it’s built to give you a one-of-a-kind driving experience. So, climb in the new Kia Sonet and let your wild instincts take over.`,
    specs: [
        {
            matrix: {
                columns,
                groups: [
                    {
                        title: 'Dimensions',
                        rows: [
                            ['Length x Width x Height (mm)', ['4,110 x 1,790 x 1,642', 2], ['4,110 x 1,790 x 1,625', 2]],
                            ['Wheelbase (mm)', ['2500', 2], ['2500', 2]],
                            ['Minimum Ground Clearance (mm)', ['205', 2], ['205', 2]],
                            ['Minimum Turning Radius (m)', ['5.3', 2], ['5.3', 2]],
                            ['Fuel Tank Capacity (L)', ['45', 2], ['45', 2]],
                            ['Gross Vehicle Weight (kg)', '1605', '1605', ['1575', 2]],
                        ],
                    },
                    {
                        title: 'Engine',
                        rows: [
                            [
                                'Variant Description',
                                '1.5L In-Line 4 Cylinders, DOHC, Gasoline',
                                ['1.5L In-Line 4 Cylinders, DOHC, Gasoline', 3],
                            ],
                            ['Variant Displacement (cc)', '1497', ['1497', 3]],
                            ['Variant Maximum Output (ps/rpm)', '115/6,300', ['115/6,300', 3]],
                            ['Variant Maximum Torque (Nm/rpm)', '144/4,500', ['144/4,500', 3]],
                        ],
                    },
                    {
                        title: 'Drivetrain / Chassis',
                        rows: [
                            [
                                'Variant Transmission',
                                'Intelligent Variable Transmission',
                                'Intelligent Variable Transmission',
                                ['6-Speed Manual Transmission', 2],
                            ],
                            ['Variant Steering', 'Motor Driven Power Steering', ['Motor Driven Power Steering', 3]],
                            ['Variant Drivetrain', 'Front Wheel Drive', ['Front Wheel Drive', 3]],
                            ['Variant Brakes Front & Rear', 'Disc', ['Disc', 3]],
                            ['Variant Suspension | Front', 'McPherson Strut', ['McPherson Strut', 3]],
                            ['Variant Suspension | Rear', 'Coupled Torsion Beam Axle', ['Coupled Torsion Beam Axle', 3]],
                            ['Variant Wheel Type', '16″ Alloy', '16″ Alloy', ['16″ Styled Wheel Cover', 2]],
                            ['Variant Tire Size', '205/55 R16', ['205/55 R16', 3]],
                        ],
                    },
                    {
                        title: 'Exterior',
                        rows: [
                            ['Variant Headlamps', 'Star Map Signature LED Multireflector', ['Halogen Multireflector', 3]],
                            ['Variant Auto Light Control', 'Standard', ['Standard', 3]],
                            ['Variant Daytime Running Lights', 'Star Map Signature LED', ['Standard', 3]],
                            ['Variant Fog Lights', 'LED', ['–', 3]],
                            [
                                'Variant Exterior Rear View Mirrors',
                                'Electric Adjustable and Folding',
                                ['Electric Adjustable', 3],
                            ],
                            [
                                'Variant Turn Signal Indicators',
                                'Integrated on Exterior Rear View Mirror',
                                ['Fender', 3],
                            ],
                            ['Variant Antenna', 'Fin Type', ['Fin Type', 3]],
                            ['Variant Sunroof', 'Standard', '–', ['–', 2]],
                        ],
                    },
                ],
            },
        },
    ],
    variants: [],
}