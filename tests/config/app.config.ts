export const PROJECT_NAME = 'Навчай українською';

export const BASE_URL = 'http://speak-ukrainian.eastus2.cloudapp.azure.com/dev/';

export const ROUTES = {
  home: '',
  clubs: 'clubs',
  clubDetail: (id: number | string) => `club/${id}`,
  news: 'news',
  about: 'about',
  service: 'service',
  challenge: 'challenge',
  speakingClub: 'speakingclub',
  login: 'login',
  register: 'register',
} as const;
