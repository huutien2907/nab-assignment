import { createSelector } from 'reselect';

const userState = (state) => state.user;

const userSelector = createSelector(userState, (user) => {
  return user.currentUser;
});

export default userSelector;
