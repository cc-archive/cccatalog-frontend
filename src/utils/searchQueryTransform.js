import clonedeep from 'lodash.clonedeep';
import findIndex from 'lodash.findindex';
import { filterData } from '@/store/filter-store';
import getParameterByName from './getParameterByName';

const filterPropertyMappings = {
  licenses: 'license',
  licenseTypes: 'license_type',
  categories: 'categories',
  extensions: 'extension',
  aspectRatios: 'aspect_ratio',
  sizes: 'size',
  providers: 'source',
};

/**
 * joins all the filters which have the checked property `true`
 * to a string separated by commas.
 * eg: "by,nd-nc,nc-sa"
 * @param {array} filter
 */
const filterToString = filter =>
  filter
    .filter(f => f.checked)
    .map(filterItem => filterItem.code)
    .join(',');

/**
 * converts the filter store object to the data format accepted by the API,
 * which has slightly different property names
 * @param {object} filters object containing the filter data that comes from the filter store
 */
export const filtersToQueryData = (filters) => {
  const queryDataObject = {};
  Object.keys(filterPropertyMappings).reduce((queryData, filterDataKey) => {
    const queryDataKey = filterPropertyMappings[filterDataKey];
    // eslint-disable-next-line no-param-reassign
    queryData[queryDataKey] = filterToString(filters[filterDataKey]);
    return queryData;
  }, queryDataObject);

  queryDataObject.searchBy = filters.searchBy.creator ? 'creator' : '';

  return queryDataObject;
};

const parseQueryString = (queryString, queryStringParamKey, filterKey, data) => {
  const queryStringFilters = getParameterByName(queryStringParamKey, queryString).split(',');
  data[filterKey].forEach((filter) => {
    if (findIndex(queryStringFilters, f => f === filter.code) >= 0) {
      // eslint-disable-next-line no-param-reassign
      filter.checked = true;
    }
  });
};

/**
 * converts the browser filter query string into the internal filter store data format
 * @param {string} queryString browser filter query string
 */
export const queryToFilterData = (queryString) => {
  const filters = clonedeep(filterData);
  Object.keys(filterPropertyMappings).forEach((filterDataKey) => {
    if (filterDataKey === 'providers') {
      const providerParameter = getParameterByName(filterPropertyMappings.providers, queryString);
      filters.providers = providerParameter === '' ? [] : providerParameter.split(',').map(provider => ({
        code: provider,
        checked: true,
      }));
    }
    else {
      const queryDataKey = filterPropertyMappings[filterDataKey];
      parseQueryString(queryString, queryDataKey, filterDataKey, filters);
    }
  });

  const searchBy = getParameterByName('searchBy', queryString);
  if (searchBy === 'creator') {
    filters.searchBy.creator = true;
  }

  return filters;
};

export const queryStringToQueryData = (queryString) => {
  const queryDataObject = {};
  Object.keys(filterPropertyMappings).forEach((filterDataKey) => {
    const queryDataKey = filterPropertyMappings[filterDataKey];
    queryDataObject[queryDataKey] = getParameterByName(queryDataKey, queryString);
  });

  queryDataObject.q = getParameterByName('q', queryString);
  queryDataObject.searchBy = getParameterByName('searchBy', queryString);

  return queryDataObject;
};
