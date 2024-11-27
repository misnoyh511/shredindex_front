import React, { useEffect, useState } from 'react';
import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { showLoginTray } from '../../atoms/showLoginTray';
import { showMembershipTray } from '../../atoms/showMembershipTray';
import UserAvatar from '@/UserAvatar/UserAvatar';
import { useAuth } from '../../hooks/useAuth';

const UserProfileMenu: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const [membershipVisible, setMembershipVisible] = useRecoilState(showMembershipTray);
  const [, setShowLoginState] = useRecoilState(showLoginTray);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleViewProfile = () => {
    if (user?.username) {
      router.push(`/profile/${user.username}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Return null on server-side to prevent hydration issues
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="user-button-menu" onClick={() => setShowLoginState('login')}>
        <div className={'custom-avatar relative rounded-full overflow-hidden'}>
          <div className="w-full h-full object-cover skeleton" />
        </div>
      </div>
    );
  }

  // Show login button if no user
  if (!user) {
    return (
      <div className="user-button-menu" onClick={() => setShowLoginState('login')}>
        Login
      </div>
    );
  }

  // Optional chaining for all profile access
  return (
    <CDropdown className="user-button-menu" variant="nav-item" alignment={'end'}>
      <CDropdownToggle caret={false}>
        <UserAvatar
          src={user?.shredProfile?.profile_picture || undefined}
          alt={user.username || 'User avatar'}
        />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem onClick={() => setMembershipVisible(!membershipVisible)}>
          Membership (Tier {user?.shredProfile?.member_tier || 'Free'})
        </CDropdownItem>
        <CDropdownItem onClick={handleViewProfile}>
          View Profile ({user.username})
        </CDropdownItem>
        {user?.shredProfile?.preferred_sport && (
          <CDropdownItem>
            Sport: {user.shredProfile.preferred_sport}
          </CDropdownItem>
        )}
        {user?.shredProfile?.skill_level && (
          <CDropdownItem>
            Skill Level: {user.shredProfile.skill_level}
          </CDropdownItem>
        )}
        <CDropdownItem onClick={handleLogout}>Logout</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default UserProfileMenu;
