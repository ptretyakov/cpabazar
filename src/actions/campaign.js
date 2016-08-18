import $ from 'jquery'

import {
  SWITCH_DIALOG,
  SEND_PROFFER_DATA,
  SEND_PROFFER_DATA_URL,
  SEND_PROFFER_DATA_FAIL,
  SEND_PROFFER_DATA_SUCCESS,
} from '../constants/campaign';

export function switchDialog() {
  return {
    type: SWITCH_DIALOG,
  }
}

export function sendProfferData(profferState) {
  return (dispatch) => {

    dispatch({
      type: SEND_PROFFER_DATA,
    })

    return $.post(SEND_PROFFER_DATA_URL, {
      name: profferState.name,
      email: profferState.email,
      skype: profferState.skype,
      message: profferState.message,
      proffcommission: profferState.proffcommission,
    })
      .done(res => {
        console.log('Success send', res);
        dispatch({
          type: SEND_PROFFER_DATA_SUCCESS,
        })
      })
      .fail(res => {
        console.log('Error send', res);
        dispatch({
          type: SEND_PROFFER_DATA_FAIL,
        })
      })
  }
}
