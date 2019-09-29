import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import storage from './storage'
Vue.use(Vuex)

storage.init(1, "6ixtizen");

export default new Vuex.Store({
  state: {
    datePr: null,
    dateFirstEntry: null,
    trips: []
  },
  getters: {
    tripsCompareToPr: state => comparison => {
      return state.trips
        .filter(t => {
          if (
            (state.pr < t.to && comparison === "after") ||
            (state.pr > t.to && comparison === "before")
          )
            return true;

          return false;
        })
        .sort((trip1, trip2) => {
          return trip1.from <= trip2.from;
        });
    },

    nbDaysAbroadBeforePr(state) {
      if (!state.datePr) {
        return [];
      }
      return state.trips
        .map(curr => nbTripDaysBeforeAndAfterDate(curr, state.datePr))
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.before,
          0
        );
    },
    nbDaysAbroadAfterPr(state) {
      if (!state.datePr) {
        return [];
      }
      return state.trips
        .map(curr => nbTripDaysBeforeAndAfterDate(curr, state.datePr))
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.after,
          0
        );
    },
    daysBeforeApplication(state, getters) {
      if (!state.datePr) {
        return null;
      }
      let today = moment();
      let pr = moment(state.datePr);
      let firstEntry = moment(state.dateFirstEntry);
      let daysBetweenFirstEntryAndPr =
        pr.diff(firstEntry, "days") - getters.nbDaysAbroadBeforePr;
      // every days spent in Canada after the date of first entry and before becoming a PR is discounted, with a max of 365 days
      let bonusFirstEntryDays =
        daysBetweenFirstEntryAndPr > 365 ? 365 : daysBetweenFirstEntryAndPr;
      let defaultNUmberOfDays = 1096; // three years
      let daysSincePr = today.diff(pr, "days");

      return (
        defaultNUmberOfDays -
        daysSincePr -
        bonusFirstEntryDays +
        getters.nbDaysAbroadAfterPr
      );
    }
  },
  mutations: {
    updateState(state, value) {
      try {
        console.log(value);

        state = Object.assign(state, value)
      } catch (error) {
        console.error("in mutation/updateState", error);
      }
    }
  },
  actions: {
    changeStore({ dispatch, commit }, value) {
      try {
        commit("updateState", value);
        dispatch("saveCalendarToDb")
      } catch (error) {
        console.error("in actions/changeStore", error);
      }

    },

    async saveCalendarToDb({ state }) {
      try {
        await storage.db.calendar.where("code").equals("datePr").modify({ value: state.datePr });
        await storage.db.calendar.where("code").equals("dateFirstEntry").modify({ value: state.dateFirstEntry });
        return;
      } catch (error) {
        console.error(error);

      }
    },

    async loadFromDb({ commit }) {
      try {
        let settings = await storage.db.setting.toArray();
        if (settings.length === 0) {
          await storage.insertDefault();
        }
        else {
          let calendar = await storage.db.calendar.toArray();

          commit("updateState", calendar.reduce((accumulator, currentValue) => {
            accumulator[currentValue.code] = currentValue.value;

            return accumulator;
          }, {}));

          let trips = await storage.db.trip.toArray();
          commit("updateState", { trips: trips });
        }
        return;
      } catch (error) {
        console.error(error);
        throw "error while loading your data"
      }

    }
  }
})

function nbTripDaysBeforeAndAfterDate(trip, limitDate) {
  let from = moment(trip.from);
  let to = moment(trip.to);
  let limit = moment(limitDate);
  if (limit >= to) {
    return { before: to.diff(from, "days"), after: 0 };
  } else if (limit <= from) {
    return { before: 0, after: to.diff(from, "days") };
  } else {
    return {
      before: limit.diff(from, "days"),
      after: to.diff(limit, "days")
    };
  }
}