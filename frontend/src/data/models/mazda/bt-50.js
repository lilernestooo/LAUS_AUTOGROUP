export default {
    brandName: 'Mazda',
    backTo: '/brands/mazda',
    name: 'Mazda BT-50',
    images: ['Mazda BT-50.png'], // placeholder: replace with the real detail photo file name
    carScale: 1.5,
    carTop: 'mt-0',
    carBottom: '-mb-12 md:-mb-20', // the photo is shorter than the viewer box: more negative = smaller gap above the buttons
    noShadow: true, // the photo already has its own ground shadow
    brochure: '#',
    overview: `Fresh from the ground up, the all-new Mazda BT-50 is the first genuine expression of Mazda Kodo design on a truck. A seamless blend of stylish form and practical function in a sturdy workhorse ready for business or leisure. Bold and beautiful, the minimalist ethos of Mazda design is seamlessly blended with the strength and toughness inherent in the All-New Mazda BT-50. Whether for work or play, business or leisure, the Mazda BT-50 is dressed to impress.`,
    specs: [
        {
            name: 'Mazda BT-50 3.0L 4×4 AT',
            rows: [
                // a line break makes a bullet list
                ['Engine', ['3.0L DOHC Diesel Engine', 'In-Line 4-Cylinder Intercooler', 'Turbocharged'].join('\n')],
                ['Transmission', '6-Speed Automatic'],
                ['Audio', '9″ LCD USB, Bluetooth Hands-Free Android Auto & Wireless Apple Carplay'],
                ['Seating Capacity', '5'],
                ['Colors', 'Concrete Gray, Gun Blue Metallic, Rock Gray, Volcanic Red, Icy White, True Black, Silver Ingot'],
            ],
        },
    ],
    variants: [],
}