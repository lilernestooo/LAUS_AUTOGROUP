export default {
  brandName: 'BMW',
  backTo: '/brands/bmw',
  name: 'BMW 7 Series Sedan',
  images: ['BMW-7-Series-Sedan_ModelCard.png'],
  brochure: '#', // replace with the real brochure PDF link
  overview:
    'The BMW Group has a long tradition of creating the automotive future. We believe the best way to predict the future is to create it. With the BMW 7 Series we are creating tomorrow’s luxury today. Thanks to game-changing innovations, benchmarking comfort and contemporary design as well as dynamics that are both impressive and highly efficient.',
  specs: [
    {
      name: 'BMW 740Li Sedan',
      groups: [
        {
          title: 'Weight',
          rows: [
            ['Unladen weight EU in kg', '1,845'],
            ['Max. permissible weight in kg', '2,445'],
            ['Permitted load in kg', '675'],
            ['Permitted axle load front/rear in kg', '1,155/1,340'],
          ],
        },
        {
          title: 'Engine',
          rows: [
            ['Cylinders/valves', '6/4'],
            ['Capacity in ccm', '2,998'],
            ['Stroke/bore in mm', '94.6/82.0'],
            ['Max. output in kW (hp) at 1/min', '240 (326)/5,500–6,500'],
            ['Max. torque in Nm at 1/min', '450/1,380–5,000'],
            ['Compression ratio : 1', '11'],
          ],
        },
        {
          title: 'Performance',
          rows: [
            ['Top speed in km/h', '250'],
            ['Acceleration 0–100 km/h in s', '5.6'],
          ],
        },
        {
          title: 'Fuel consumption',
          rows: [
            ['Urban in l/100 km', '9.7–9.1'],
            ['Extra-urban in l/100 km', '5.5–5.2'],
            ['Combined in l/100 km', '7.0–6.6'],
            ['CO2 emissions in g/km', '164–154'],
            ['Tank capacity, approx. in l', '78'],
          ],
        },
        {
          title: 'Wheels',
          rows: [
            ['Tyre dimensions front', '225/60 R17 99 Y'],
            ['Tyre dimensions rear', '225/60 R17 99 Y'],
            ['Wheel dimensions and material front', '7,5 J x 17 inch, light-alloy'],
            ['Wheel dimensions and material rear', '7,5 J x 17 inch, light-alloy'],
          ],
        },
      ],
    },
  ],
  variants: [], // the original shows N/A
}