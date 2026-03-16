export interface Session {
  token: string;
  deviceInfo: {
    deviceType: string;
    os: string;
    browser: string;
    userAgent: string;
  };
  location: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  ip: string;
  status: boolean;
  loggedInAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  id: string;
  role: 'user';
  auth: {
    isVerified: boolean;
    passKeys: {
      count: number;
      enabled: boolean;
    };
    twoFA: {
      enabled: boolean;
    };
  };
  profile: {
    avatar: {
      url: string;
    };
    displayName: string;
    email: string;
    familyName: string;
    givenName: string;
  };
  createdAt: string;
  updatedAt: string;
}
