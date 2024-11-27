export interface User {
  username: string;
  first_name: string;
  last_name: string;
}

export interface ShredProfile {
  user: User;
  member_tier: number;
  preferred_sport: string;
  skill_level: string;
  years_experience: number;
  favorite_resort: string;
  current_resort_location: string;
  visited_resorts: string[];
  preferred_terrain: string[];
  preferred_resort_type: string;
  equipment_brand: string;
  owns_equipment: boolean;
  season_pass_type: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  bio: string;
  profile_picture: string;
  preferred_lessons: string[];
  interested_in_competitions: boolean;
  achievements: string[];
}

export interface UserProfile {
  id?: string;
  first_name?: string;
  email?: string;
  username?: string;
  shredProfile: ShredProfile;
}

export interface UserProfileType {
  id: string;
  username: string;
  email: string;
  profile_picture?: string;
  member_tier?: string;
  preferred_sport?: string;
  skill_level?: string;
  years_experience?: number;
  favorite_resort?: string;
  current_resort_location?: string;
  visited_resorts?: string[];
  preferred_terrain?: string[];
  preferred_resort_type?: string;
  equipment_brand?: string;
  owns_equipment?: boolean;
  season_pass_type?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  bio?: string;
  preferred_lessons?: string[];
  interested_in_competitions?: boolean;
  achievements?: string[];
  shredProfile?: {
    id?: string;
    member_tier?: string;
    preferred_sport?: string;
    skill_level?: string;
    profile_picture?: string;
    [key: string]: any;  // For other possible fields
  };
}
