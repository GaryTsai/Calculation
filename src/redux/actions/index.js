import {
  CHANGE_CALCULATION_TYPE
} from "./action-types";

export const change_calculation_type = (type) => {
  return {
    type: CHANGE_CALCULATION_TYPE,
    payload: { calculation_type: type }
  }
}