export const updatePageType = (pageType) => {
    console.log('setting Page size!', pageType)
    return {type: 'update_pagetype', payload: pageType}
}