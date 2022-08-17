import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function Detail() {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { char_id } = useParams();

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${char_id}`)
      .then((res) => res.data)
      .then((data) => setChar(data[0]))
      .finally(() => setLoading(false));
  }, [char_id]);

  return (
    <div className="container p-2">
      <div className="row">
        {loading && <Loading />}
        {char && (
          <div>
            <h1 className="text-center">{char.name}</h1>
            <div className="text-center">
              <img className="" src={char.img} alt={char.name} />
            </div>
          </div>
        )}
        {char && (
          <div className="p-4">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    style={{ backgroundColor: "#29773E", color: "white" }}
                  >
                    Click for Details
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse "
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    className="accordion-body text-light"
                    style={{ backgroundColor: "#29773E" }}
                  >
                    <pre>{JSON.stringify(char, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
