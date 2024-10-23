export interface UserProfileType {
  id?: string;
  username?: string;
  member_tier?: string;
  preferred_sport?: string;
  profile_picture?: string | null | undefined;
  member_points?: number;
  skill_level?: string;
  years_experience?: number;
  favorite_resort?: string;
  current_resort_location?: string;
  visited_resorts?: string[];
  preferred_terrain?: string;
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
}
