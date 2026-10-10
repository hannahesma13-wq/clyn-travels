export type Tour = {
  id: string
  name: string
  country: 'Vietnam' | 'Taiwan' | 'Thailand'
  region: string
  duration: string
  style: string
  image: string
  description: string
  highlights: string[]
  itinerary: { day: string; title: string; details: string }[]
  priceNote: string
}

export const destinations = [
  {
    name: 'Vietnam',
    tagline: 'A little wonder at every turn',
    description: 'Lantern-lit streets, dramatic seascapes, rich food culture, and places that reward a slower look.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
    region: 'Southeast Asia',
  },
  {
    name: 'Taiwan',
    tagline: 'City energy, mountain calm',
    description: 'Night markets, mountain railways, design-minded cities, and comforting local flavors.',
    image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1200&q=85',
    region: 'East Asia',
  },
  {
    name: 'Thailand',
    tagline: 'Make room for the extraordinary',
    description: 'Golden temples, lively markets, tropical coastlines, and warm hospitality.',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85',
    region: 'Southeast Asia',
  },
]

export const tours: Tour[] = [
  {
    id: 'vietnam-discovery', name: 'Vietnam Discovery', country: 'Vietnam', region: 'Hanoi · Ha Long Bay', duration: '5 days / 4 nights', style: 'Culture & scenery',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
    description: 'A sample route pairing the energy of Hanoi with the celebrated landscapes of Ha Long Bay.',
    highlights: ['Old Quarter orientation', 'Vietnamese food and café culture', 'Ha Long Bay day experience'],
    itinerary: [
      { day: 'Day 1', title: 'Arrive in Hanoi', details: 'Arrival and transfer arrangements to be confirmed. Keep the evening relaxed with an optional walk around the Old Quarter.' },
      { day: 'Day 2', title: 'Hanoi at your own pace', details: 'Explore the city’s historic streets, local markets, and food culture. Specific visits depend on final tour arrangements.' },
      { day: 'Day 3', title: 'Ha Long Bay experience', details: 'Sample excursion day for the bay. Cruise, transport, meals, and inclusions require supplier confirmation.' },
      { day: 'Day 4', title: 'Local discoveries', details: 'Flexible day for museums, cafés, shopping, or an optional guided experience.' },
      { day: 'Day 5', title: 'Departure', details: 'Check-out and onward transfer, subject to confirmed flight and transport details.' },
    ],
    priceNote: 'Price to be confirmed after dates, group size, and inclusions are reviewed.',
  },
  {
    id: 'vietnam-cultural-escape', name: 'Vietnam Cultural Escape', country: 'Vietnam', region: 'Hoi An · Da Nang', duration: '4 days / 3 nights', style: 'Culture & coast',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
    description: 'A sample central Vietnam escape blending old-town atmosphere with time by the coast.',
    highlights: ['Hoi An old town', 'Local craft and food culture', 'Da Nang coastal scenery'],
    itinerary: [
      { day: 'Day 1', title: 'Arrive in Da Nang', details: 'Arrival, transfer, and check-in details to be arranged after travel dates are confirmed.' },
      { day: 'Day 2', title: 'Hoi An old town', details: 'Explore historic lanes and local craft traditions. Entry fees and guide services are not yet confirmed.' },
      { day: 'Day 3', title: 'Coast and local culture', details: 'Flexible day for the beach, food experiences, or optional excursions.' },
      { day: 'Day 4', title: 'Departure', details: 'Check-out and transfer arrangements to be confirmed.' },
    ],
    priceNote: 'Price to be confirmed after dates, group size, and inclusions are reviewed.',
  },
  {
    id: 'taiwan-highlights', name: 'Taiwan Highlights', country: 'Taiwan', region: 'Taipei · Jiufen', duration: '5 days / 4 nights', style: 'City & culture',
    image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1200&q=85',
    description: 'A first-timer sample itinerary built around Taipei’s city life and the atmospheric lanes of Jiufen.',
    highlights: ['Taipei city orientation', 'Night-market food discovery', 'Jiufen day excursion concept'],
    itinerary: [
      { day: 'Day 1', title: 'Welcome to Taipei', details: 'Arrival and hotel transfer to be confirmed. Take time to settle in and explore nearby streets.' },
      { day: 'Day 2', title: 'Taipei essentials', details: 'Sample city day for landmarks, local neighborhoods, and food stops.' },
      { day: 'Day 3', title: 'Jiufen and the north coast', details: 'Possible day excursion. Weather, transport, and final route will determine the schedule.' },
      { day: 'Day 4', title: 'Markets and free time', details: 'Explore a night market, shop, or add an optional cultural experience.' },
      { day: 'Day 5', title: 'Departure', details: 'Check-out and transfer details depend on confirmed flight information.' },
    ],
    priceNote: 'Price to be confirmed after dates, group size, and inclusions are reviewed.',
  },
  {
    id: 'taiwan-food-culture', name: 'Taiwan Food & Culture', country: 'Taiwan', region: 'Taipei', duration: '4 days / 3 nights', style: 'Food & neighborhoods',
    image: 'https://images.unsplash.com/photo-1544601285-3c9b1e6a4b1c?auto=format&fit=crop&w=1200&q=85',
    description: 'A sample short break for travelers curious about local flavors, city neighborhoods, and everyday Taiwan.',
    highlights: ['Night-market exploration', 'Neighborhood walks', 'Flexible cultural stops'],
    itinerary: [
      { day: 'Day 1', title: 'Arrive and settle in', details: 'Arrival and check-in; evening plans remain flexible.' },
      { day: 'Day 2', title: 'Taste of Taipei', details: 'Sample food-focused day. Specific vendors and dietary arrangements need confirmation.' },
      { day: 'Day 3', title: 'Neighborhood discoveries', details: 'A flexible day for local shops, cultural stops, and optional excursions.' },
      { day: 'Day 4', title: 'Departure', details: 'Transfer and departure details to be confirmed.' },
    ],
    priceNote: 'Price to be confirmed after dates, group size, and inclusions are reviewed.',
  },
  {
    id: 'thailand-escape', name: 'Thailand Escape', country: 'Thailand', region: 'Bangkok', duration: '4 days / 3 nights', style: 'City & heritage',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85',
    description: 'A sample Bangkok break balancing iconic sights, lively markets, and time to explore independently.',
    highlights: ['Temple and heritage options', 'Thai food discoveries', 'Market and shopping time'],
    itinerary: [
      { day: 'Day 1', title: 'Arrive in Bangkok', details: 'Arrival, hotel, and transfer arrangements to be confirmed.' },
      { day: 'Day 2', title: 'Heritage and riverside', details: 'Sample sightseeing day. Temple access, dress requirements, guide, and transport need verification.' },
      { day: 'Day 3', title: 'Markets and local flavors', details: 'Flexible day for markets, food, and optional activities.' },
      { day: 'Day 4', title: 'Departure', details: 'Check-out and transfer details depend on confirmed flight information.' },
    ],
    priceNote: 'Price to be confirmed after dates, group size, and inclusions are reviewed.',
  },
  {
    id: 'thailand-island-adventure', name: 'Thailand Island Adventure', country: 'Thailand', region: 'Krabi · Andaman Coast', duration: '5 days / 4 nights', style: 'Coast & nature',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1200&q=85',
    description: 'A sample coastal getaway for travelers drawn to limestone cliffs, turquoise water, and slower days.',
    highlights: ['Coastal scenery', 'Optional boat excursion concept', 'Free time for beach and rest'],
    itinerary: [
      { day: 'Day 1', title: 'Arrive on the coast', details: 'Arrival and transfer details to be confirmed after dates and airport are known.' },
      { day: 'Day 2', title: 'Coast at your pace', details: 'Free time to enjoy the area or choose a verified optional activity.' },
      { day: 'Day 3', title: 'Island excursion option', details: 'Boat trip is a possible option only; route, weather conditions, operator, and cost require confirmation.' },
      { day: 'Day 4', title: 'A slower day', details: 'Flexible beach, café, or wellness time.' },
      { day: 'Day 5', title: 'Departure', details: 'Check-out and transfer arrangements to be confirmed.' },
    ],
    priceNote: 'Price to be confirmed after dates, group size, and inclusions are reviewed.',
  },
]
