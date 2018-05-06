import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';
import { meetups, meetupsHasErrored, meetupsIsLoading } from './meetups/meetups';
import { meetup, meetupHasErrored, meetupIsLoading } from './meetups/meetup';
import { counter } from './counter';
import { messages } from './messages';
import { articles } from './articles';
import { session } from './session';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    counter,
    session,
    meetups,
    meetupsHasErrored,
    meetupsIsLoading,
    meetup,
    meetupHasErrored,
    meetupIsLoading,
    messages
});
