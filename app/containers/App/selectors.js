import { createSelector } from 'reselect';

const selectLocationDomain = () => (state) => state.get('route');

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectRouteState = () => createSelector(
  selectLocationDomain(),
  (substate) => substate.getIn(['locationBeforeTransitions']),
);


export default {
  selectLocationState,
  selectRouteState,
};
