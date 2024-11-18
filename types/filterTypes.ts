import React from "react";

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

export const ResortTypeFilters = [
  'traditional_ski_resort',
  'helicopter',
  'dry_slope',
  'indoor',
  'cross_country_skiing',
  'cat_skiing',
  'sand_skiing',
] as const;

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
