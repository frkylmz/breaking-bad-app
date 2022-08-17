import { useEffect } from "react";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";

import { Link } from "react-router-dom";

function Home() {
  const characters = useSelector((state) => state.characters.items);
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return <Error message={error} />;
  }

  return (
    <div>
      <h1 className="text-center">Characters</h1>
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          {characters.map((character) => (
            <div
              className="card border border-1 p-2 m-3 text-center"
              style={{ width: "18rem", backgroundColor: "#369457" }}
              key={character.char_id}
            >
              <img
                alt={character.name}
                src={character.img}
                className="character"
              />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">{character.nickname}</p>
                <Link
                  to={`/char/${character.char_id}`}
                  className="btn"
                  style={{ backgroundColor: "#29773E", color: "white" }}
                >
                  Click for Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center p-3">
        {status === "loading" && <Loading />}
        {hasNextPage && status !== "loading" && (
          <button
            onClick={() => dispatch(fetchCharacters(nextPage))}
            className="btn btn-success text-center"
          >
            Load more ({nextPage})
          </button>
        )}
        {!hasNextPage && <div>There is nothing to be shown.</div>}
      </div>
    </div>
  );
}

export default Home;
