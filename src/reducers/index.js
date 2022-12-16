const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filtersLoadingStatus: "idle",
  filteredHeroes: [],
  activeFilter: "all",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
        filteredHeroes:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter(
                (item) => item.element === state.activeFilter
              ),
      };
    

    case "HERO_CREATED":
      let newCreatedHeroesList = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newCreatedHeroesList,
        filteredHeroes:
          state.activeFilter === "all"
            ? newCreatedHeroesList
            : newCreatedHeroesList.filter(
                (item) => item.element === state.activeFilter
              ),
      };

      
    case "HERO_DELETED":
      const newHeroList = state.heroes.map(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        heroes: newHeroList,
        filteredHeroes:
          state.activeFilter === "all"
            ? newHeroList
            : newHeroList.filter((item) => item.element === state.activeFilter),
      };

    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "FILTER_ACTIVE":
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((item) => item.element !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
