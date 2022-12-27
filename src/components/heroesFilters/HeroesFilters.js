import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilters } from "../../actions";
import { filterActive } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";

const HeroesFilters = () => {
  const { activeFilter, filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0)
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;

    return arr.map(({ name, label, className }) => {
      const btnClass = classNames("btn", className, {
        active: activeFilter === name,
      });
      return (
        <button
          key={name}
          className={btnClass}
          onClick={() => dispatch(filterActive(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
