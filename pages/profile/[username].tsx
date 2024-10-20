import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import UserProfile from '../../components/User/UserProfile';
import { UserProfileType } from '../../types/userProfileTypes';
import { useRecoilState } from 'recoil';
import { loggedInUserProfile } from '../../atoms/userProfile';
import { mockProfiles } from '../../mocks/UserMocks';

interface ProfilePageProps {
  initialLoggedInUsername: string | null;
  userProfileData: UserProfileType | null;
  error?: {
    message: string;
  };
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (context) => {
  const { username } = context.params as { username: string };

  // Simulate fetching the profile data based on the username
  const userProfileData = mockProfiles[username] || null;

  if (!userProfileData) {
    return { notFound: true };
  }

  // Simulate getting the logged-in username from a cookie
  const initialLoggedInUsername = context.req.cookies.loggedInUser || null;

  return {
    props: {
      userProfileData,
      initialLoggedInUsername,
    },
  };
};

const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfileData,
  initialLoggedInUsername,
  error,
}) => {
  const [user, setUser] = useRecoilState(loggedInUserProfile);

  useEffect(() => {
    // Update Recoil state with the initial value from SSR
    if (initialLoggedInUsername && initialLoggedInUsername !== user?.username) {
      setUser(user);
    }
  }, [initialLoggedInUsername, user, setUser]);

  const isOwner = user?.username === userProfileData?.username;

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!userProfileData) {
    return <p>User profile data not found.</p>;
  }

  return <UserProfile userProfileData={userProfileData} isOwner={isOwner} />;
};

export default ProfilePage;
