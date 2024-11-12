import React from 'react';
import { CFormLabel, CRow } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import FilterToggleButton from '../FilterToggleButton/FilterToggleButton';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { FilterGroup } from '../../types/filterTypes';
import DoubleRangeSlider from '../DoubleRangeSlider/DoubleRangeSlider';

interface FilterSectionProps {
  title: string;
  titleId: string;
  filters: FilterGroup[];
  showMore: boolean;
  onToggleShowMore: (value: boolean) => void;
  handleUpdateForm: (id: string, value: boolean) => Promise<void>;
  updateForm: (filterToggleButtonID: string, toggleOn: boolean, type_name: string, operator: string, value: string) => void;
  getFormValue: (filterToggleButtonID: string, type_name: string, operator: string) => string;
  filterDescriptionToolTip: (label: string) => JSX.Element;
  showMoreButtonText: string;
  showLessButtonText: string;
  useRangeSlider?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  titleId,
  filters,
  showMore,
  onToggleShowMore,
  handleUpdateForm,
  updateForm,
  getFormValue,
  filterDescriptionToolTip,
  showMoreButtonText,
  showLessButtonText,
  useRangeSlider = false,
}) => (
  <CRow>
    <CFormLabel className="form-label">
      <FormattedMessage
        id={titleId}
        defaultMessage={title}
      />
    </CFormLabel>
    <div className={`d-flex gap-2 ${useRangeSlider ? 'flex-column' : ''} flex-wrap mw-100`}>
      {filters?.map((item: FilterGroup, filterIndex: number) => (
        (showMore || filterIndex < 5) && (
          <FilterToggleButton
            key={item.filterToggleButtonID}
            label={item.label || ''}
            name={item.name}
            className="me-3"
            id={item.filterToggleButtonID}
            updateForm={handleUpdateForm}
            tooltip={filterDescriptionToolTip(item.label || '')}
            toggle={item.toggleOn}
            onChange={useRangeSlider ? undefined : (e) => {
              if (item.filters && item.filters[0]) {
                updateForm(
                  item.filterToggleButtonID,
                  item.toggleOn,
                  item.filters[0].type_name,
                  item.filters[0].operator,
                  e.target.value,
                );
              }
            }}
          >
            {useRangeSlider ? (id: string, toggleOn: boolean) => (
              item.filters && item.filters[0] && item.filters[1] && (
                <DoubleRangeSlider
                  title={item.label || ''}
                  name={item.filters[0].type_name}
                  unit={item.unit}
                  sliderMin={0}
                  sliderMax={item?.max_value || 100}
                  initialLowerVal={
                    parseInt(
                      getFormValue(id, item.filters[0].type_name, item.filters[0].operator),
                      10,
                    ) || 0
                  }
                  initialUpperVal={
                    parseInt(
                      getFormValue(id, item.filters[1].type_name, item.filters[1].operator),
                      10,
                    ) || 100
                  }
                  onChangeLower={(e) => {
                    updateForm(
                      id,
                      toggleOn,
                      item.filters[0].type_name,
                      item.filters[0].operator,
                      e.target.value,
                    );
                  }}
                  onChangeUpper={(e) => {
                    updateForm(
                      id,
                      toggleOn,
                      item.filters[1].type_name,
                      item.filters[1].operator,
                      e.target.value,
                    );
                  }}
                  useGraph
                />
              )
            ) : undefined}
          </FilterToggleButton>
        )
      ))}
    </div>
      {filters.length > 5 && (
        <ShowMoreButton
          showMore={showMore}
          onToggle={onToggleShowMore}
          showMoreText={showMoreButtonText}
          showLessText={showLessButtonText}
        />
      )}
  </CRow>
);

export default FilterSection;
