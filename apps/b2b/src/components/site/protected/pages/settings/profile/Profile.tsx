'use client';

import Heading from '@repo/ui/components/heading';
import ProfileAvatar from './particles/ProfileAvatar';
import ProfileDangerZone from './particles/ProfileDangerZone';
import ProfileDisplayName from './particles/ProfileDisplayName';
import ProfileReset from './particles/ProfileReset';

const Profile = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="space-y-4">
          <div className="space-y-2">
            <Heading as="h5">My Profile</Heading>
            <p>Manage your personal information and preferences</p>
          </div>
          <ProfileAvatar />
          <ProfileDisplayName />
          <ProfileReset />
          <ProfileDangerZone />
        </div>
      </div>
    </section>
  );
};

export default Profile;
