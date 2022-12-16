export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroCreated = (newHero) => {
  return {
    type: "HERO_CREATED",
    payload: newHero,
  };
};

export const heroDelete = (id) => {
  return {
    type: "HERO_DELETED",
    payload: id,
  };
};

export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    payload: filters,
    type: "FILTERS_FETCHED",
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const filterActive = (name) => {
  return {
    type: "FILTER_ACTIVE",
    payload: name,
  };
};
