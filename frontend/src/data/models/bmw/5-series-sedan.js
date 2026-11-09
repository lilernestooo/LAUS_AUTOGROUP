export default {
  brandName: 'BMW',
  backTo: '/brands/bmw',
  name: 'BMW 5 Series Sedan',
  images: ['BMW-5-Series-Sedan_ModelCard.png'],
  brochure: '#', // replace with the real brochure PDF link
  overview:
    'The BMW 5 Series Sedan is tailor-made to meet the highest requirements. Intelligent networking and the latest technologies from BMW ConnectedDrive pave the way for previously unattainable latitude and flexibility. Perfect for everyone who expects more from a sedan than just a stylish appearance: the most advanced 5 Series Sedan ever.',
  specs: [
    {
      name: 'BMW 520d Sedan',
      groups: [
        {
          title: 'Weight',
          rows: [
            ['Unladen weight EU in kg', '1,695 [1,705]'],
            ['Max. permissible weight in kg', '2,230 [2,240]'],
            ['Permitted load in kg', '610 [610]'],
            ['Permitted axle load front/rear in kg', '1,060/1,275 [1,060/1,275]'],
          ],
        },
        {
          title: 'Engine',
          rows: [
            ['Cylinders/valves', '4/4'],
            ['Capacity in ccm', '1,995'],
            ['Stroke/bore in mm', '90.0/84.0'],
            ['Max. output in kW (hp) at 1/min', '140 (190)/4,000'],
            ['Max. torque in Nm at 1/min', '400/1,750–2,500'],
            ['Compression ratio : 1', '16.5'],
          ],
        },
        {
          title: 'Performance',
          rows: [
            ['Top speed in km/h', '236 [233]'],
            ['Acceleration 0–100 km/h in s', '7.9 [7.7]'],
          ],
        },
        {
          title: 'Fuel consumption',
          rows: [
            ['Urban in l/100 km', '5.6–5.1 [5.3–4.9]'],
            ['Extra-urban in l/100 km', '4.2–3.9 [4.1–3.7]'],
            ['Combined in l/100 km', '4.7–4.3 [4.5–4.1]'],
            ['CO2 emissions in g/km', '124–114 [119–109]'],
            ['Tank capacity, approx. in l', '70'],
          ],
        },
        {
          title: 'Wheels',
          rows: [
            ['Tyre dimensions front', '225/55 R17 97W'],
            ['Tyre dimensions rear', '225/55 R17 97W'],
            ['Wheel dimensions and material front', '8 J x 17 inches, light-alloy'],
            ['Wheel dimensions and material rear', '8 J x 17 inches, light-alloy'],
          ],
        },
      ],
    },
  ],
  variants: [], // empty = shows N/A, like the original
}