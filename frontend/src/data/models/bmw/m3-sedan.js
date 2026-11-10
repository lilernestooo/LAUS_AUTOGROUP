export default {
  brandName: 'BMW',
  backTo: '/brands/bmw',
  name: 'BMW M3 Sedan',
  images: ['BMW-m3-sedan.png'],
  brochure: '#', // replace with the real brochure PDF link
  overview:
    'The motorsport DNA of the BMW M3 Sedan is unmistakeable. The dynamic front end with the large air inlets and the double slats of the kidney grille in their high gloss black paint finish signal the outstanding performance potential. In the interior, the driver-oriented cockpit inspires with its perfect ergonomics. Exclusive M seats with their shell shape offer excellent side support. All details enjoy an especially high-quality finish and convey the pure character of motor racing.',
  specs: [
    {
      name: '', // the original shows no model name for the M3
      groups: [
        {
          title: 'Engine',
          rows: [
            ['Cylinders/valves', '6/4'],
            ['Capacity in ccm', '2,979'],
            ['Stroke/bore in mm', '89.6/84.0'],
            ['Engine power in kW (PS) at 1/min', '317 (431)/5,500-7,300'],
            ['Engine torque (Nm) at 1/min', '550/1,850-5,500'],
            ['Compression ratio : 1', '10.2'],
          ],
        },
        {
          title: 'Weight',
          rows: [
            ['Unladen weight EU in kg', '1,635'],
            ['Max. permissible weight in kg', '2,100'],
            ['Permitted load in kg', '540'],
            ['Permitted axle load front/rear in kg', '990/1,170'],
            ['Luggage capacity min. (seats up or roof down) in l', '480'],
            ['Luggage capacity max. (seats down or roof up) in l', '–'],
          ],
        },
        {
          title: 'Performance',
          rows: [
            ['Top speed in km/h', '250'],
            ['Acceleration 0–100 km/h in s', '4.3'],
          ],
        },
        {
          title: 'Fuel consumption',
          rows: [
            ['Urban in l/100 km', '12.2'],
            ['Extra-urban in l/100 km', '7.3'],
            ['Combined in l/100 km', '9.1'],
            ['CO2 combined emissions in g/km', '209'],
            ['Tank capacity, approx. in l', '60'],
          ],
        },
        {
          title: 'Wheels',
          rows: [
            ['Tyre dimensions front', '255/40 ZR18 (95Y)'],
            ['Tyre dimensions rear', '275/40 ZR18 (99Y)'],
            ['Wheel dimensions and material front', '9 J x 18 inches, EH2+ light-alloy'],
            ['Wheel dimensions and material rear', '10 J x 18 inches, EH2+ light-alloy'],
          ],
        },
      ],
    },
  ],
  variants: [], // the original shows N/A
}