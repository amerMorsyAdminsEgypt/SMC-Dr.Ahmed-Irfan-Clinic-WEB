export default {
  state: {
    reservations: {
      clientToken: null,
      followToreseRvationToken: null,
      reservationTypeToken: null,
    },
    payments: {
      clientToken: null,
      reservationToken: null,
    },
    wallets: {
      clientToken: null,
      reservationToken: null,
    },
    points: {
      clientToken: null,
    },
    historicalPlans: {
      clientToken: null,
      reservationToken: null,
    },
    servicesReservationAddedServices: {
      clientToken: null,
      reservationToken: null,
    },
  },
  getters: {
    reservations: (state) => state.reservations,
    payments: (state) => state.payments,
    wallets: (state) => state.wallets,
    points: (state) => state.points,
    historicalPlans: (state) => state.historicalPlans,
    servicesReservationAddedServices: (state) =>
      state.servicesReservationAddedServices,
  },
  mutations: {
    //#region reservations
    UPDATE_RESERVATIONS_CLIENT_TOKEN: (state, clientToken) => {
      state.reservations.clientToken = clientToken;
    },
    UPDATE_RESERVATIONS_FOLLOW_TO_RESERVATION_TOKEN: (
      state,
      followToreseRvationToken
    ) => {
      state.reservations.followToreseRvationToken = followToreseRvationToken;
    },
    UPDATE_RESERVATIONS_TYPE_TOKEN: (state, reservationTypeToken) => {
      state.reservations.reservationTypeToken = reservationTypeToken;
    },
    //#endregion reservations

    //#region payments
    UPDATE_PAYMENTS_CLIENT_TOKEN: (state, clientToken) => {
      state.payments.clientToken = clientToken;
    },
    UPDATE_PAYMENTS_RESERVATION_TOKEN: (state, reservationToken) => {
      state.payments.reservationToken = reservationToken;
    },
    //#endregion payments

    //#region wallets
    UPDATE_WALLETS_CLIENT_TOKEN: (state, clientToken) => {
      state.wallets.clientToken = clientToken;
    },
    UPDATE_WALLETS_RESERVATION_TOKEN: (state, reservationToken) => {
      state.wallets.reservationToken = reservationToken;
    },
    //#endregion wallets

    //#region points
    UPDATE_POINTS_CLIENT_TOKEN: (state, clientToken) => {
      state.points.clientToken = clientToken;
    },
    //#endregion points

    //#region historicalPlans
    UPDATE_HISTORICAL_PLANS_CLIENT_TOKEN: (state, clientToken) => {
      state.historicalPlans.clientToken = clientToken;
    },
    UPDATE_HISTORICAL_PLANS_SURGERY_PLACE_TYPE_TOKEN: (
      state,
      surgeryPlaceTypeToken
    ) => {
      state.historicalPlans.surgeryPlaceTypeToken = surgeryPlaceTypeToken;
    },
    UPDATE_HISTORICAL_PLANS_RESERVATION_TOKEN: (state, reservationToken) => {
      state.historicalPlans.reservationToken = reservationToken;
    },
    //#endregion historicalPlans

    //#region servicesReservationAddedServices
    UPDATE_ADDED_SERVICES_CLIENT_TOKEN: (state, clientToken) => {
      state.servicesReservationAddedServices.clientToken = clientToken;
    },
    UPDATE_ADDED_SERVICES_RESERVATION_TOKEN: (state, reservationToken) => {
      state.servicesReservationAddedServices.reservationToken =
        reservationToken;
    },
    //#endregion servicesReservationAddedServices
  },
  actions: {
    //#region reservations
    updateReservationsClientToken(context, clientToken) {
      context.commit("UPDATE_RESERVATIONS_CLIENT_TOKEN", clientToken);
    },
    updateReservationsfollowToReservationToken(
      context,
      followToreseRvationToken
    ) {
      context.commit(
        "UPDATE_RESERVATIONS_FOLLOW_TO_RESERVATION_TOKEN",
        followToreseRvationToken
      );
    },
    updateReservationsTypeToken(context, reservationTypeToken) {
      context.commit("UPDATE_RESERVATIONS_TYPE_TOKEN", reservationTypeToken);
    },
    //#endregion reservations

    //#region payments
    updatePaymentsClientToken(context, clientToken) {
      context.commit("UPDATE_PAYMENTS_CLIENT_TOKEN", clientToken);
    },
    updatePaymentsReservationToken(context, reservationToken) {
      context.commit("UPDATE_PAYMENTS_RESERVATION_TOKEN", reservationToken);
    },
    //#endregion payments

    //#region wallets
    updateWalletsClientToken(context, clientToken) {
      context.commit("UPDATE_WALLETS_CLIENT_TOKEN", clientToken);
    },
    updateWalletsReservationToken(context, reservationToken) {
      context.commit("UPDATE_WALLETS_RESERVATION_TOKEN", reservationToken);
    },
    //#endregion wallets

    //#region points
    updatPointsClientToken(context, clientToken) {
      context.commit("UPDATE_POINTS_CLIENT_TOKEN", clientToken);
    },
    //#endregion points

    //#region historicalPlans
    updateHistoricalPlansClientToken(context, clientToken) {
      context.commit("UPDATE_HISTORICAL_PLANS_CLIENT_TOKEN", clientToken);
    },
    updateHistoricalPlansSurgeryPlaceTypeToken(context, surgeryPlaceTypeToken) {
      context.commit(
        "UPDATE_HISTORICAL_PLANS_SURGERY_PLACE_TYPE_TOKEN",
        surgeryPlaceTypeToken
      );
    },
    updateHistoricalPlansReservationToken(context, reservationToken) {
      context.commit(
        "UPDATE_HISTORICAL_PLANS_RESERVATION_TOKEN",
        reservationToken
      );
    },
    //#endregion historicalPlans

    //#region servicesReservationAddedServices
    updateServicesReservationAddedServicesClientToken(context, clientToken) {
      context.commit("UPDATE_ADDED_SERVICES_CLIENT_TOKEN", clientToken);
    },
    updateServicesReservationAddedServicesReservationToken(
      context,
      reservationToken
    ) {
      context.commit(
        "UPDATE_ADDED_SERVICES_RESERVATION_TOKEN",
        reservationToken
      );
    },
    //#endregion servicesReservationAddedServices
  },
  modules: {},
};
