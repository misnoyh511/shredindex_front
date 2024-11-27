// components/User/EditProfileModal.tsx
import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react';
import { UserProfileType } from '../../types/userProfileTypes';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  formState: UserProfileType;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  formState,
  onChange,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <CModal
      visible={visible}
      onClose={onClose}
      size="lg"
      scrollable
    >
      <CModalHeader closeButton>Edit Profile</CModalHeader>
      <CModalBody>
        <CForm onSubmit={onSubmit}>
          <CFormInput
            type="text"
            label="Profile Picture URL"
            name="profile_picture"
            value={formState.profile_picture || ''}
            onChange={onChange}
            className="mb-3"
          />

          <CFormSelect
            label="Preferred Sport"
            name="preferred_sport"
            value={formState.preferred_sport || ''}
            onChange={onChange}
            className="mb-3"
          >
            <option value="">Select Preferred Sport</option>
            <option value="skiing">Skiing</option>
            <option value="snowboarding">Snowboarding</option>
            <option value="both">Both</option>
            <option value="other">Other</option>
          </CFormSelect>

          <CFormSelect
            label="Skill Level"
            name="skill_level"
            value={formState.skill_level || ''}
            onChange={onChange}
            className="mb-3"
          >
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </CFormSelect>

          <CFormInput
            type="number"
            label="Years of Experience"
            name="years_experience"
            value={formState.years_experience || ''}
            onChange={onChange}
            className="mb-3"
          />

          <CFormInput
            type="text"
            label="Favorite Resort"
            name="favorite_resort"
            value={formState.favorite_resort || ''}
            onChange={onChange}
            className="mb-3"
          />

          <CFormInput
            type="text"
            label="Current Resort Location"
            name="current_resort_location"
            value={formState.current_resort_location || ''}
            onChange={onChange}
            className="mb-3"
          />

          <CFormInput
            type="text"
            label="Visited Resorts (comma-separated)"
            name="visited_resorts"
            value={formState.visited_resorts?.join(', ') || ''}
            onChange={(e) => {
              onChange({
                ...e,
                target: {
                  ...e.target,
                  name: 'visited_resorts',
                  value: e.target.value.split(',').map(s => s.trim()),
                },
              });
            }}
            className="mb-3"
          />

          <CFormSelect
            label="Preferred Terrain"
            name="preferred_terrain"
            value={formState.preferred_terrain || ''}
            onChange={onChange}
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

          <CFormTextarea
            label="Bio"
            name="bio"
            value={formState.bio || ''}
            onChange={onChange}
            className="mb-3"
          />

          <CFormCheck
            type="checkbox"
            label="Interested in Competitions"
            name="interested_in_competitions"
            checked={formState.interested_in_competitions || false}
            onChange={onChange}
            className="mb-3"
          />

          {/* Emergency Contact Information */}
          <div className="border-top pt-3 mt-3">
            <h6>Emergency Contact Information</h6>
            <CFormInput
              type="text"
              label="Emergency Contact Name"
              name="emergency_contact_name"
              value={formState.emergency_contact_name || ''}
              onChange={onChange}
              className="mb-3"
            />

            <CFormInput
              type="text"
              label="Emergency Contact Phone"
              name="emergency_contact_phone"
              value={formState.emergency_contact_phone || ''}
              onChange={onChange}
              className="mb-3"
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={onSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditProfileModal;
