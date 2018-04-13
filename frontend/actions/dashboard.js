import { showModalLoader, hideModalLoader, loading, stopLoading, requestUsers, receiveUsers } from './';
import { fetchHelper, getAPIToken, DEFAULT_HEADERS } from './util';

import * as types from './types';

const DEFAULT_CARDS = [
  {
    content: null,
    title: 'Users',
    url: 'users'
  },
  {
    content: null,
    title: 'Events',
    url: 'events'
  }
];

export function updateDashboardCards(cards) {
  return {
    type: types.UPDATE_DASHBOARD_CARDS,
    cards: cards
  }
}

function formatCards(cards) {
  return dispatch => {
    if (cards) {
      const formatted = [ // TODO: Scrap these.
			  {
			    content: Object.values(cards.users).reduce((a, b) => a + b),
			    title: 'Users',
			    url: '/users'
			  },
			  {
			    content: cards.events,
			    title: 'Events',
			    url: '/events'
			  },
			  {
			    content: cards.users.participant,
			    title: 'Participants',
			    url: '/users'
			  },
			  {
			    content: cards.users.volunteer,
			    title: 'Volunteers',
			    url: '/users'
			  },
			  {
			    content: cards.users.admin,
			    title: 'Admins',
			    url: '/users'
			  }
      ];
      dispatch(updateDashboardCards(formatted));
    } else {
      return {
        type: types.API_ERROR,
        error: 'An error occurred pulling that information'
      }
    }
  }
}

export function loadAdminDashboardCards() {
  return (dispatch, getState) => {
    dispatch(loading());
    dispatch(updateDashboardCards(DEFAULT_CARDS));
    return fetchHelper(`/api/dashboard`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => { console.log(json); return json.cards})
      .then(cards => dispatch(formatCards(cards)))
      .then(() => dispatch(stopLoading()));
  }
}
