
const config = {
  api: {
    baseURL: 'http://localhost:5000/',
    //baseURL: 'http://92.205.227.135:5000/',
    //baseURL: 'https://api.ssjluxurytransport.com/',
    emailEndpoint: 'api/email',
    carsEndpoint: 'api/cars',
    adminLogin: 'api/admin/login',
    loginUrl: 'api/login',

  },
  whatsapp: {
    recipientPhone: '919876238140', // Example recipient phone number (India)
    baseUrl: 'https://wa.me/',
  },
  googlemap:{
    apiKey: 'AIzaSyAXzg4x-WLJFqc02OoS5cKG2GnTqoq65Uc',
  }
  // Add any other configuration details you need here
};

export default config;
