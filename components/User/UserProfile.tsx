import React, { useState } from 'react';
import {
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CFormTextarea,
  CButton, CContainer, CCardBody, CCard,
  CModal, CModalHeader, CModalBody, CModalFooter,
} from '@coreui/react';
import { UserProfileType } from '../../types/userProfileTypes';
import ResortsParallaxBackground from '@/ResortsParallaxBackground/ResortsParallaxBackground';
import Image from 'next/image';

interface UserProfileProps {
  userProfileData: UserProfileType;
  isOwner: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfileData, isOwner }) => {
  const [formState, setFormState] = useState({ ...userProfileData });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update the userProfileData with formState (in a real app, this would be saved to the backend)
      // For now, we just display an alert
      alert('Profile updated successfully!');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err as Error);
      setLoading(false);
    }
  };

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameSubmit = () => {
    setIsEditingUsername(false);
    // Here you would typically update the backend with the new username
  };

  const handleProfilePictureEdit = () => {
    setIsEditingProfilePicture(true);
  };

  const handleProfilePictureSubmit = () => {
    setIsEditingProfilePicture(false);
    setFormState(prevState => ({
      ...prevState,
      profile_picture: newProfilePictureUrl,
    }));
    // Here you would typically update the backend with the new profile picture URL
  };

  const handleUpdateMembership = () => {
    // Implement membership update logic here
    alert('Redirecting to membership update page...');
  };

  if (isOwner) {
    return (
      <CContainer alignContent={'center'}>
        <ResortsParallaxBackground />
        <div className="user-profile-card-wrap">
          <CCard className="user-profile-card">
            <CCardBody>
              <div className="user-profile-card-header">
                <Image
                  src={formState.profile_picture}
                  alt={`${formState.username}'s profile`}
                  onClick={handleProfilePictureEdit}
                  style={{ cursor: 'pointer' }}
                  width={300}
                  height={300}
                />
                {isEditingUsername ? (
                  <CFormInput
                    type="text"
                    value={formState.username}
                    onChange={(e) => setFormState(prevState => ({ ...prevState, username: e.target.value }))}
                    onBlur={handleUsernameSubmit}
                    autoFocus
                  />
                ) : (
                  <h2 onClick={handleUsernameEdit} style={{ cursor: 'pointer' }}>{formState.username}</h2>
                )}
              </div>
              <CForm onSubmit={handleSubmit}>
                {/* Member Tier */}
                <div className="d-flex align-items-center mb-3">
                  <CFormInput
                    label="Member Tier"
                    name="member_tier"
                    value={formState.member_tier || ''}
                    readOnly
                    className="me-2"
                  />
                  <CButton onClick={handleUpdateMembership}>Update Membership</CButton>
                </div>

                {/* Preferred Sport */}
                <CFormSelect
                  label="Preferred Sport"
                  name="preferred_sport"
                  value={formState.preferred_sport || ''}
                  onChange={handleChange}
                  className="mb-3"
                >
                  <option value="">Select Preferred Sport</option>
                  <option value="skiing">Skiing</option>
                  <option value="snowboarding">Snowboarding</option>
                  <option value="both">Both</option>
                  <option value="other">Other</option>
                </CFormSelect>

                {/* Skill Level */}
                <CFormSelect
                  label="Skill Level"
                  name="skill_level"
                  value={formState.skill_level || ''}
                  onChange={handleChange}
                  className="mb-3"
                >
                  <option value="">Select Skill Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </CFormSelect>

                {/* Years of Experience */}
                <CFormInput
                  type="number"
                  label="Years of Experience"
                  name="years_experience"
                  value={formState.years_experience || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Favorite Resort */}
                <CFormInput
                  type="text"
                  label="Favorite Resort"
                  name="favorite_resort"
                  value={formState.favorite_resort || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Current Resort Location */}
                <CFormInput
                  type="text"
                  label="Current Resort Location"
                  name="current_resort_location"
                  value={formState.current_resort_location || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Visited Resorts */}
                <CFormInput
                  type="text"
                  label="Visited Resorts (comma-separated)"
                  name="visited_resorts"
                  value={formState.visited_resorts?.join(', ') || ''}
                  onChange={(e) => {
                    setFormState((prevState) => ({
                      ...prevState,
                      visited_resorts: e.target.value.split(',').map((s) => s.trim()),
                    }));
                  }}
                  className="mb-3"
                />

                {/* Preferred Terrain */}
                <CFormSelect
                  label="Preferred Terrain"
                  name="preferred_terrain"
                  value={formState.preferred_terrain || ''}
                  onChange={handleChange}
                  className="mb-3"
                >
                  <option value="">Select Preferred Terrain</option>
                  <option value="groomed">Groomed</option>
                  <option value="off-piste">Off-Piste</option>
                  <option value="park">Park</option>
                  <option value="half-pipe">Half-Pipe</option>
                  <option value="tree-runs">Tree Runs</option>
                  <option value="all">All</option>
                </CFormSelect>

                {/* Preferred Resort Type */}
                <CFormSelect
                  label="Preferred Resort Type"
                  name="preferred_resort_type"
                  value={formState.preferred_resort_type || ''}
                  onChange={handleChange}
                  className="mb-3"
                >
                  <option value="">Select Preferred Resort Type</option>
                  <option value="family">Family</option>
                  <option value="seasonal_worker">Seasonal Worker</option>
                  <option value="hardcore">Hardcore</option>
                  <option value="helicopter">Helicopter</option>
                  <option value="ski-bum">Ski Bum</option>
                  <option value="average-joe">Average Joe</option>
                  <option value="racer">Racer</option>
                  <option value="moguls">Moguls</option>
                  <option value="freestyle">Freestyle</option>
                </CFormSelect>

                {/* Equipment Brand */}
                <CFormInput
                  type="text"
                  label="Equipment Brand"
                  name="equipment_brand"
                  value={formState.equipment_brand || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Owns Equipment */}
                <CFormCheck
                  type="checkbox"
                  label="Owns Equipment"
                  name="owns_equipment"
                  checked={formState.owns_equipment || false}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Season Pass Type */}
                <CFormInput
                  type="text"
                  label="Season Pass Type"
                  name="season_pass_type"
                  value={formState.season_pass_type || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Emergency Contact Name */}
                <CFormInput
                  type="text"
                  label="Emergency Contact Name"
                  name="emergency_contact_name"
                  value={formState.emergency_contact_name || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Emergency Contact Phone */}
                <CFormInput
                  type="text"
                  label="Emergency Contact Phone"
                  name="emergency_contact_phone"
                  value={formState.emergency_contact_phone || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Bio */}
                <CFormTextarea
                  label="Bio"
                  name="bio"
                  value={formState.bio || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Profile Picture */}
                <CFormInput
                  type="text"
                  label="Profile Picture URL"
                  name="profile_picture"
                  value={formState.profile_picture || ''}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Preferred Lessons */}
                <CFormInput
                  type="text"
                  label="Preferred Lessons (comma-separated)"
                  name="preferred_lessons"
                  value={formState.preferred_lessons?.join(', ') || ''}
                  onChange={(e) => {
                    setFormState((prevState) => ({
                      ...prevState,
                      preferred_lessons: e.target.value.split(',').map((s) => s.trim()),
                    }));
                  }}
                  className="mb-3"
                />

                {/* Interested in Competitions */}
                <CFormCheck
                  type="checkbox"
                  label="Interested in Competitions"
                  name="interested_in_competitions"
                  checked={formState.interested_in_competitions || false}
                  onChange={handleChange}
                  className="mb-3"
                />

                {/* Achievements */}
                <CFormInput
                  type="text"
                  label="Achievements (comma-separated)"
                  name="achievements"
                  value={formState.achievements?.join(', ') || ''}
                  onChange={(e) => {
                    setFormState((prevState) => ({
                      ...prevState,
                      achievements: e.target.value.split(',').map((s) => s.trim()),
                    }));
                  }}
                  className="mb-3"
                />

                <CButton type="submit" color="primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </CButton>
                {error && (
                  <p style={{ color: 'red' }}>An error occurred: {error.message}</p>
                )}
              </CForm>
            </CCardBody>
          </CCard>
        </div>

        {/* Modal for editing profile picture */}
        <CModal visible={isEditingProfilePicture} onClose={() => setIsEditingProfilePicture(false)}>
          <CModalHeader closeButton>Update Profile Picture</CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="New Profile Picture URL"
              value={newProfilePictureUrl}
              onChange={(e) => setNewProfilePictureUrl(e.target.value)}
            />
            {/* You can add file upload functionality here */}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setIsEditingProfilePicture(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={handleProfilePictureSubmit}>
              Update
            </CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    );
  } else {
    return (
      <CContainer>
        <ResortsParallaxBackground/>
        <div className="user-profile-card-wrap">
          <CCard className="user-profile-card">
            <CCardBody>
              <div className="user-profile-card-header">
                <Image
                  src={userProfileData.profile_picture}
                  alt={`${userProfileData.username}'s profile`}
                  width={300}
                  height={300}
                />
                <h2>{userProfileData.username}</h2>
              </div>
              <p>
                <strong>Member Tier:</strong> {userProfileData.member_tier}
              </p>
              <p>
                <strong>Preferred Sport:</strong> {userProfileData.preferred_sport}
              </p>
              <p>
                <strong>Skill Level:</strong> {userProfileData.skill_level}
              </p>
              <p>
                <strong>Years of Experience:</strong> {userProfileData.years_experience}
              </p>
              <p>
                <strong>Favorite Resort:</strong> {userProfileData.favorite_resort}
              </p>
              <p>
                <strong>Current Resort Location:</strong>{' '}
                {userProfileData.current_resort_location}
              </p>
              <p>
                <strong>Visited Resorts:</strong>{' '}
                {userProfileData.visited_resorts?.join(', ')}
              </p>
              <p>
                <strong>Preferred Terrain:</strong> {userProfileData.preferred_terrain}
              </p>
              <p>
                <strong>Preferred Resort Type:</strong>{' '}
                {userProfileData.preferred_resort_type}
              </p>
              <p>
                <strong>Equipment Brand:</strong> {userProfileData.equipment_brand}
              </p>
              <p>
                <strong>Owns Equipment:</strong>{' '}
                {userProfileData.owns_equipment ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Season Pass Type:</strong> {userProfileData.season_pass_type}
              </p>
              <p>
                <strong>Bio:</strong> {userProfileData.bio}
              </p>
              <p>
                <strong>Preferred Lessons:</strong>{' '}
                {userProfileData.preferred_lessons?.join(', ')}
              </p>
              <p>
                <strong>Interested in Competitions:</strong>{' '}
                {userProfileData.interested_in_competitions ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Achievements:</strong>{' '}
                {userProfileData.achievements?.join(', ')}
              </p>
              {/* Note: Do not display emergency contact info or other sensitive data */}
            </CCardBody>
          </CCard>
        </div>
      </CContainer>
    );
  }
};

export default UserProfile;
