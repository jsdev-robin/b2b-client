import { ROLE } from './role';

export const ROLE_COOKIES = {
  [ROLE.SUPER_ADMIN]: {
    ACCESS: 'xsa1fe7',
    REFRESH: 'xsa2be3',
    PENDING_2FA: 'xsa3cd5',
    ROLE: 'xrole',
  },
  [ROLE.GUEST]: {
    ACCESS: 'xn1fe7',
    REFRESH: 'xn2be3',
    PENDING_2FA: 'xn3cd5',
    ROLE: 'xrole',
  },
};
