import React, {useMemo} from "react";

export interface FilterType {
  type_name: string;
  operator: string;
  value: string;
}

export interface LocationType {
  [key: string]: any;
}

export interface GroupedType {
  filterToggleButtonID: string;
  toggleOn: boolean;
  filters: FilterType[];
}

export interface FilterGroup {
  label?: string | undefined;
  filterToggleButtonID: string;
  toggleOn: boolean;
  filters: FilterType[];
  name?: string;
  max_value?: number | null;
  unit?: string;
}

export interface CurrentFilterState {
  groupedType: FilterGroup[];
  locationType: LocationType;
}

export interface Type {
  name: string;
  title: string;
  category: string;
  unit?: string;
  unit_id?: string;
  icon?: string | null;
  max_value?: number;
}

export interface FilterToggleButtonProps {
  id: string;
  label: string | undefined;
  name: string | undefined;
  tooltip: React.ReactNode;
  children?: React.ReactNode | ((id: string, toggleOn: boolean) => React.ReactNode);
  className?: string;
  updateForm: (id: string, value: boolean) => Promise<void>;
  onChange?: () => Promise<void>;
  toggle: boolean;
  isLocked?: boolean;
}

export interface FilterGroup {
  filterToggleButtonID: string;
  label?: string;
  name?: string;
  unit?: string;
  max_value?: number;
  toggleOn: boolean;
  filters: Filter[];
}

export interface IconSpriteQuery {
  iconSprite: string;
}

export const OrderBySortedLifeStyles = [
  // Very High Priority
  'skiable_terrain',          // Total skiable area
  'extreme_terrain',          // Extreme skiing opportunities
  'snow_quality',             // Quality of snow conditions
  'helicopter',               // Helicopter skiing access

  // High Priority
  'seasonal_worker',          // Seasonal employment opportunities
  'family_friendly',          // Family-friendly amenities
  'affordability',            // Cost-effectiveness
  'backcountry',             // Backcountry access
  'fresh_tracks',            // Access to untracked snow
  'uncrowded',               // Lower crowd levels
  'expert_terrain_score',    // Quality of expert terrain
  'terrain_park',            // Terrain park facilities
  'co-working',              // Co-working facilities
  'average_annual_snowfall', // Annual snowfall amount
  'elevation_peak',          // Peak elevation
  'number_of_lifts',         // Number of operational lifts
  'total_runs_distance',     // Total distance of all runs
  'vertical_drop',           // Vertical drop
  'beginner_terrain_score',  // Quality of beginner terrain
  'cultural_experience',     // Cultural experience opportunities
  'sand_skiing',             // Sand skiing opportunities

  // Medium Priority
  'slackcountry',            // Side-country access
  'nearby_sled_/_snowmobile_access', // Snowmobile accessibility
  'ski-in_ski-out',          // Ski-in/ski-out access
  'housing_availability',     // Housing options
  'summer_activities',        // Summer activity options
  'english_level',           // English language prevalence
  'apres',                   // After-ski activities
  'night_life',              // Nightlife options
  'longest_run',             // Length of longest run
  'base_elevation',          // Base elevation
  'restaurants_and_cafes',   // Dining options
  'snow_reliability',        // Snow reliability
  'off-piste',              // Off-piste opportunities
  'tree_skiing',            // Tree skiing opportunities

  // Low Priority
  'money_saving_potential',   // Potential for saving money
  'avalanche_safety',        // Avalanche safety measures
  'lift_access',             // Lift accessibility
  'livability',              // Long-term living conditions
  'job_availability',        // Job market
  'local_language_inessential', // Need for local language
  'lgbt_friendly',           // LGBT-friendliness
  'positive_vibes',          // General atmosphere
  'camper_friendly',         // Camping facilities
  'connectivity',            // Internet connectivity
  'number_of_runs',          // Number of runs
  'terrain_expert',          // Expert terrain availability
  'terrain_intermediate',    // Intermediate terrain
  'terrain_beginner',        // Beginner terrain
  'dry_slope',              // Dry slope facilities
  'snow_making',            // Snow-making capabilities
  'customer_service',        // Quality of customer service
  'day_care',               // Day care facilities

  // Very Low Priority
  'cannabis_friendly',        // Cannabis accessibility
  'international_ratio',      // International visitor ratio
  'gender_ratio',            // Gender balance
  'navigation_signage',      // Quality of signage
  'parking_accessibility',    // Parking facilities

  // Not Rated or Missing Data
  'indoor',                  // Indoor facilities
  'cross_country_skiing',    // Cross-country skiing
  'night_skiing',            // Night skiing availability
  'skiable_terrain_(night)', // Night skiing area
  'snowmaking'              // Snow-making capabilities
] as const;

export const ResortTypeFilters = [
  'traditional_ski_resort',
  'helicopter',
  'dry_slope',
  'indoor',
  'cross_country_skiing',
  'cat_skiing',
  'sand_skiing',
] as const;

export const useLifestyleOptions = () => {
  return useMemo(() => {
    const baseOptions = [
      // Always keep total score first
      {
        value: 'total_score',
        label: 'Total Score'
      },
      // Map the rest of the lifestyle options
      ...OrderBySortedLifeStyles.map(value => ({
        value,
        // Convert snake_case to Title Case for labels
        label: value
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }))
    ].filter(option =>
      // Filter out any options that are marked as not rated or missing data
      !['indoor', 'cross_country_skiing', 'night_skiing', 'skiable_terrain_(night)', 'snowmaking'].includes(option.value)
    );

    return baseOptions;
  }, []);
};

// Statistical filters for resort metrics and measurements
export const StatisticTypeFilters = [
  'skiable_terrain',          // Total area available for skiing
  'vertical_drop',            // Maximum vertical descent
  'elevation_peak',           // Highest point of the resort
  'base_elevation',           // Base elevation of the resort
  'number_of_runs',          // Total number of marked runs
  'number_of_lifts',         // Total number of operational lifts
  'longest_run',             // Length of the longest run
  'total_runs_distance',     // Length of all the runs combined
] as const;

// Score-based filters for qualitative aspects of resorts
export const ScoreTypeFilters = [
  'expert_terrain',          // Rating for expert-level terrain
  'intermediate_terrain',    // Rating for intermediate-level terrain
  'beginner_terrain',       // Rating for beginner-level terrain
  'snow_quality',           // Rating for typical snow conditions
  'uncrowded',              // Rating for how uncrowded the resort typically is
  'affordability',          // Rating for overall cost and value
  'tree_skiing',            // Rating for tree skiing opportunities
  'apres',                  // Rating for after-ski activities
] as const;

// Type aliases for strict typing
export type ResortType = typeof ResortTypeFilters[number];
export type StatisticType = typeof StatisticTypeFilters[number];
export type ScoreType = typeof ScoreTypeFilters[number];

// This type alias makes it clear that FormData and CurrentFilterState are the same
export type FormData = CurrentFilterState;

// Helper type for all filter types combined
export type AllFilterTypes = ResortType | StatisticType | ScoreType;

// Helper function to check if a filter is a specific type
export const isStatisticFilter = (filter: string): filter is StatisticType =>
  StatisticTypeFilters.includes(filter as StatisticType);

export const isScoreFilter = (filter: string): filter is ScoreType =>
  ScoreTypeFilters.includes(filter as ScoreType);

export const isResortTypeFilter = (filter: string): filter is ResortType =>
  ResortTypeFilters.includes(filter as ResortType);
