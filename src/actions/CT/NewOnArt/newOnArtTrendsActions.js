import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadNewOnArtTrends = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().newOnArtTrends.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txNew' && getState().ui.ctTab !== 'tOut') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchNewOnArtTrends());
    }
};

export const fetchNewOnArtTrends = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_NEW_ON_ART_TRENDS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/txNewTrends', params);
    dispatch({ type: actionTypes.CT_NEW_ON_ART_TRENDS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
