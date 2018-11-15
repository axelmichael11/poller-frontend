export default (state = 'desktop', { type, payload }) => {
    switch (type) {
    case 'update_pagetype':
      return payload
    default:
      return state
    }
  }