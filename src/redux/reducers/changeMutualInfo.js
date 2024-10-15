import {
    CHANGE_CALCULATION_TYPE,
  } from "../actions/action-types";

  const initialState = {
    calculation_type: 'balanceAveragePrice',
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case CHANGE_CALCULATION_TYPE:
        state.calculation_type = action.payload.calculation_type
        return Object.assign({}, state)
      default:
          return Object.assign({}, state)
    }
  }
  
