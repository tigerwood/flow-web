import { handleActions } from 'redux-actions'

import { handleHttp } from '../util'

import { fromJS } from 'immutable'

import is from 'util/is'

import Types from './agentType'

const initialState = fromJS({
  list: [],
  ui: {},
})

const transformResponse = function (data) {
  if (is.array(data)) {
    data.forEach((d) => {
      d.id = d.zoneWithName
    })
  }
  return data
}

export const actions = {
  query: function () {
    return {
      url: '/agents',
      name: Types.query,
      transformResponse
    }
  },
}

export default handleActions({
  [Types.query]: handleHttp('QUERY', {
    success: function (state, { payload }) {
      return state.set('list', fromJS(payload))
    },
  }),
  [Types.freedAll]: function (state) {
    return initialState
  }
}, initialState)
