import React, { useState, useEffect } from 'react';
import {
  CButton,
  CContainer,
  CCardBody,
  CCard,
} from '@coreui/react';
import { UserProfileType } from '../../types/userProfileTypes';
import ResortsParallaxBackground from '@/ResortsParallaxBackground/ResortsParallaxBackground';
import Image from 'next/image';
import EditProfileModal from '../EditProfileModel/EditProfileModel';
import { MUTATIONS } from '../../graphql/auth';

interface UserProfileProps {
  userProfileData: UserProfileType;
  isOwner: boolean;
}

const DEFAULT_PROFILE_PICTURE = '/images/default-avatar.png';

const UserProfile: React.FC<UserProfileProps> = ({ userProfileData, isOwner }) => {
  const [formState, setFormState] = useState({ ...userProfileData });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Update form state when userProfileData changes
  useEffect(() => {
    setFormState(userProfileData);
  }, [userProfileData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormState(prevState => ({
        ...prevState,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/graphql';

    // Only include fields that have values
    const profileData = Object.entries(formState).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          // Only include non-empty arrays
          if (value.length > 0 && value.some(item => item.trim() !== '')) {
            acc[key] = value.filter(item => item.trim() !== '');
          }
        } else if (typeof value === 'boolean') {
          // Always include booleans
          acc[key] = value;
        } else if (typeof value === 'number') {
          // Only include numbers that aren't 0
          if (value !== 0) {
            acc[key] = value;
          }
        } else if (typeof value === 'string' && value.trim() !== '') {
          // Only include non-empty strings
          acc[key] = value.trim();
        }
      }
      return acc;
    }, {} as Partial<typeof formState>);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          query: MUTATIONS.UPDATE_PROFILE,
          variables: {
            input: {
              username: formState.username, // Required field
              ...profileData,
            },
          },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      if (data.data?.updateProfile) {
        setFormState({
          ...formState,
          ...data.data.updateProfile,
        });
        setIsEditingProfile(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const renderProfileInfo = () => (
    <>
      <div className="user-profile-card-header">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={formState.shredProfile?.profile_picture || DEFAULT_PROFILE_PICTURE}
            alt={`${formState.username}'s profile`}
            width={300}
            height={300}
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">{formState.username}</h2>
        {isOwner && (
          <CButton
            color="primary"
            onClick={() => setIsEditingProfile(true)}
            className="mb-4"
          >
            Edit Profile
          </CButton>
        )}
      </div>

      {/* Profile Information */}
      {Object.entries({
        'Member Tier': formState.shredProfile?.member_tier,
        'Preferred Sport': formState.shredProfile?.preferred_sport,
        'Skill Level': formState.shredProfile?.skill_level,
        'Years of Experience': formState.shredProfile?.years_experience,
        'Favorite Resort': formState.shredProfile?.favorite_resort,
        'Current Location': formState.shredProfile?.current_resort_location,
        'Visited Resorts': formState.shredProfile?.visited_resorts?.join(', '),
        'Preferred Terrain': formState.shredProfile?.preferred_terrain,
        'Bio': formState.shredProfile?.bio,
        'Interested in Competitions': formState.shredProfile?.interested_in_competitions ? 'Yes' : 'No',
      }).map(([label, value]) =>
        value && (
            <p key={label} className="mb-2">
              <strong>{label}:</strong> {value}
            </p>
        ),
      )}
    </>
  );

  if (loading) {
    return (
      <CContainer>
        <ResortsParallaxBackground />
        <div className="user-profile-card-wrap">
          <CCard className="user-profile-card">
            <CCardBody className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading profile...</p>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </CContainer>
    );
  }

  return (
    <CContainer>
      <ResortsParallaxBackground />
      <div className="user-profile-card-wrap">
        <CCard className="user-profile-card">
          <CCardBody>
            {renderProfileInfo()}
          </CCardBody>
        </CCard>
      </div>

      {isOwner && (
        <EditProfileModal
          visible={isEditingProfile}
          onClose={() => setIsEditingProfile(false)}
          formState={formState}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      )}
    </CContainer>
  );
};

export default UserProfile;
