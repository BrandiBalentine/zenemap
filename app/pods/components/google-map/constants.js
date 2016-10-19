const AUTOCOMPLETE_SERVICE = new window.google.maps.places.AutocompleteService();
const DIRECTIONS_RENDERER = new window.google.maps.DirectionsRenderer();
const DIRECTIONS_SERVICE = new window.google.maps.DirectionsService();
const LOCATIONS = {
  'restaurants':[
    {
      'name': 'Fly Trap',
      'address': '606 Folsom St, San Francisco, CA 94107'
    },
    {
      'name': 'Red Dog Restaurant & Bar',
      'address': '303 2nd St, San Francisco, CA 94107'
    },
    {
      'name': 'Chipotle Mexican Grill',
      'address': '126 New Montgomery St, San Francisco, CA 94105'
    }
  ],
  'shipping': [
    {
      'name': 'FedEx Office Print & Ship Center',
      'address': '303 2nd St, San Francisco, CA 94107'
    },
    {
      'name': 'The UPS Store',
      'address': '2 New Montgomery Street, San Francisco, CA 94105'
    },
    {
      'name': 'US Post Office',
      'address': '150 Sutter St, San Francisco, CA 94104'
    }
  ],
  'gyms': [
    {
      'name': 'Crunch - New Montgomery',
      'address': '61 New Montgomery St, San Francisco, CA 94105'
    },
    {
      'name': 'Crunch - Yerba Buena',
      'address': '350 3rd St, San Francisco, CA 94107'
    },
    {
      'name': 'Equinox Pine Street',
      'address': '301 Pine St, San Francisco, CA 94101'
    }
  ],
};
export { AUTOCOMPLETE_SERVICE, DIRECTIONS_RENDERER, DIRECTIONS_SERVICE, LOCATIONS };
