import React from 'react';
import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loggedInUserProfile } from '../../atoms/userProfile';
import { showLoginTray } from '../../atoms/showLoginTray';
import { showMembershipTray } from '../../atoms/showMembershipTray';
import UserAvatar from '@/UserAvatar/UserAvatar';



const UserProfileMenu: React.FC = () => {
  const [membershipVisible, setMembershipVisible] = useRecoilState(showMembershipTray);
  const [userProfile, setUserProfile] = useRecoilState(loggedInUserProfile);
  const [, setShowLoginState] = useRecoilState(showLoginTray);

  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/profile/${userProfile?.username}`);
  };

  const handleLogout = () => {
    setUserProfile(null);
    // Optionally, perform logout actions like clearing tokens, calling logout API, etc.
  };

  if (!userProfile) {
    return (
      <div className="user-button-menu" onClick={() => setShowLoginState('login')}>
        Login
      </div>
    );
  }

  return (
    <CDropdown className="user-button-menu" variant="nav-item" alignment={'end'}>
      <CDropdownToggle caret={false}>
        <UserAvatar src={userProfile.profile_picture} />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem onClick={() => setMembershipVisible(!membershipVisible)}>
          Membership (Tier {userProfile.member_tier})
        </CDropdownItem>
        <CDropdownItem onClick={handleViewProfile}>
          View Profile ({userProfile.username})
        </CDropdownItem>
        <CDropdownItem>Points: {userProfile.member_points}</CDropdownItem>
        <CDropdownItem onClick={handleLogout}>Logout</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default UserProfileMenu;
