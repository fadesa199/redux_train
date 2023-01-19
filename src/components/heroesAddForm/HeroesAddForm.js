import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const filters = selectAll(store.getState());

  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescription,
      element: heroElement,
    };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then((res) => console.log(res, "Отправка завершена"))
      .then(dispatch(heroCreated(newHero)))
      .catch((err) => console.log(err));
    setHeroName("");
    setHeroDescription("");
    setHeroElement("");
    // eslint-disable-next-line
  };

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Идёт загрузка...</option>;
    } else if (status === "error") {
      return <option>Ошибка загрузки...</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === "all") {
          return;
        }
        return (
          <option value={name} key={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          value={heroName}
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          value={heroDescription}
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          onChange={(e) => setHeroDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option value="">Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
