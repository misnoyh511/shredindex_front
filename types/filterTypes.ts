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
  icon?: string;
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

// This type alias makes it clear that FormData and CurrentFilterState are the same
export type FormData = CurrentFilterState;
