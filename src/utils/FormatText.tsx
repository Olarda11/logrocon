import React from 'react';

export const FormatText = (text: string) => {
    if (!text) {
        return
    }
    return text.split(' ').map(function (item, key,) {
        if (item.startsWith('<highlighttext')) {
            const newItem = item.replace(/<[A-z/][^>]*>/g, '');
            return <b key={key}>{newItem} </b>
        } else {
            return `${item} `
        }
    })
};
