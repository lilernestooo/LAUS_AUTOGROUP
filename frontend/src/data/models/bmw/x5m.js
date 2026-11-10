export default {
  brandName: 'BMW',
  backTo: '/brands/bmw',
  name: 'BMW X5 M Competition',
  scene: true, // wide scene photo, shown as a framed picture
  images: ['BMW-x5m-banner-1024x486-1.jpg'],
  brochure: '#', // replace with the real brochure PDF link
  overview:
    'The BMW X5 M Competition is taking the Sports Activity Vehicle to lofty new heights with its sublime mix of exclusive M design elements. Add to this the M TwinPower Turbo V8 engine with M xDrive and luxurious interiors, and you have a truly outstanding driving experience that is both flamboyant and dominant.',
  specs: [
    {
      name: '', // the original shows no model name for the X5m
      groups: [
        {
          title: 'Weight',
          rows: [
            ['Unladen weight EU in kg', '2,385'],
            ['Luggage capacity (seats up) in litres', '650'],
            ['Luggage capacity (seats down) in litres', '1,870'],
            ['Trailer load (unbraked) in kg', '750'],
            ['Trailer load 8% (braked) in kg', '3,000'],
            ['Trailer load 12% (braked) in kg', '3,000'],
          ],
        },
        {
          title: 'Engine',
          rows: [
            ['Cylinders/valves', '8/4'],
            ['Capacity in ccm', '4395'],
            ['Engine power in hp', '625'],
            ['Engine torque in Nm', '750'],
          ],
        },
        {
          title: 'Performance',
          rows: [
            ['Top speed in mph', '155 (180)'],
            ['Acceleration 0–62mph in seconds', '3.8'],
          ],
        },
      ],
    },
  ],
  variants: [], // the original shows N/A
}