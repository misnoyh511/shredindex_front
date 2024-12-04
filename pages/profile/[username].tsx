import React from 'react';
import { GetServerSideProps } from 'next';
import UserProfile from '../../components/User/UserProfile';
import { UserProfileType } from '../../types/userProfileTypes';
import { useAuth } from '../../hooks/useAuth';

interface ProfilePageProps {
  username: string;
  userProfileData: UserProfileType | null;
  error?: {
    message: string;
  };
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (context) => {
  const { username } = context.params as { username: string };
  const API_URL = process.env.NEXT_DEVELOPMENT_GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

  try {
    // Changed from mutation to query for fetching user profile
    const userProfileResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetUserProfile($username: String!) {
            getUserProfile(username: $username) {
              user {
                id
                username
                email
              }
              shredProfile {
                member_tier
                preferred_sport
                skill_level
                years_experience
                favorite_resort
                current_resort_location
                visited_resorts
                preferred_terrain
                preferred_resort_type
                equipment_brand
                owns_equipment
                season_pass_type
                emergency_contact_name
                emergency_contact_phone
                bio
                profile_picture
                preferred_lessons
                interested_in_competitions
                achievements
              }
            }
          }
        `,
        variables: {
          username,
        },
      }),
    });

    const userProfileData = await userProfileResponse.json();

    // Handle the case where we successfully got a response
    if (userProfileData.data?.getUserProfile) {
      return {
        props: {
          username,
          userProfileData: {
            id: userProfileData.data.getUserProfile.user.id,
            username: userProfileData.data.getUserProfile.user.username,
            email: userProfileData.data.getUserProfile.user.email,
            shredProfile: userProfileData.data.getUserProfile.shredProfile || {},
          },
        },
      };
    }

    // If no profile found but no error (new user case)
    return {
      props: {
        username,
        userProfileData: {
          username,
          id: '',
          email: '',
          shredProfile: {
            member_tier: '',
            preferred_sport: '',
            skill_level: '',
            profile_picture: '',
            years_experience: '',
            favorite_resort: '',
            current_resort_location: '',
            visited_resorts: [],
            preferred_terrain: '',
            preferred_resort_type: '',
            equipment_brand: '',
            owns_equipment: false,
            season_pass_type: '',
            emergency_contact_name: '',
            emergency_contact_phone: '',
            bio: '',
            preferred_lessons: '',
            interested_in_competitions: false,
            achievements: [],
          },
        },
      },
    };

  } catch (error) {
    console.error('Profile fetch error:', error);
    return {
      props: {
        username,
        error: {
          message: 'Failed to fetch user profile',
        },
        userProfileData: null,
      },
    };
  }
};

const ProfilePage: React.FC<ProfilePageProps> = ({
  username,
  userProfileData,
  error,
}) => {
  const { user } = useAuth();
  const isOwner = user?.username === username;

  if (error) {
    return <div className="text-center p-4 text-red-600">{error.message}</div>;
  }

  return (
    <UserProfile
      userProfileData={userProfileData || {
        username,
        id: '',
        email: '',
        shredProfile: {
          member_tier: '',
          preferred_sport: '',
          skill_level: '',
          profile_picture: '',
        },
      }}
      isOwner={isOwner}
    />
  );
};

export default ProfilePage;
