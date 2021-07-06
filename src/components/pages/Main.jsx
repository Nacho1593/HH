import React, { useState, useEffect } from "react";
import IconCard from "../IconCard";
import IconHome from "../IconHome";
import IconSuccess from "../IconSuccess";
import Success from "../Success";
import axios from "axios";

function Main() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [apiRespond, setApiRespond] = useState({});

  function handleChange(e) {
    setEmail(e.target.value);
  }

  async function handleClick() {
    try {
      const response = await axios.post(
        "https://api-demo-hh.vercel.app/api/send",
        null,
        {
          params: {
            email,
          },
        }
      );

      console.log(response);

      setApiRespond(response.data);
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <div className="container d-flex mt-5 wrapper ">
      <div className="row justify-content-md-center px-md-5 d-flex no-gutters">
        <div className="col-md-5 left">
          {Object.entries(apiRespond).length > 0 && apiRespond.error ? (
            <form>
              <h2 className="title-size">
                Para suscribirte completá el siguiente formulario
              </h2>
              <div className="mt-3">
                <label className="form-label mt-3 text-correo">
                  Correo electronico
                </label>
                <div className="form-group mb-3 ">
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className="form-control d-md-flex form-control-left"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
            </form>
          ) : Object.entries(apiRespond).length > 0 && !apiRespond.error ? (
            <div>
              <IconSuccess />
              <h2 className="mt-3 text-success-form">
                Gracias por completar nuestro formulario.{" "}
              </h2>
            </div>
          ) : (
            <form>
              <h2 className="title-size">
                Para suscribirte completá el siguiente formulario.
              </h2>
              <div className="mt-3">
                <label className="form-label mt-3 text-correo">
                  Correo electrónico
                </label>
                <div
                  className={`form-group mb-3 ${
                    isError && "border-danger border border-2 rounded"
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="juan@example.com"
                    className="form-control d-md-flex left-input"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
              {isError && (
                <p className="alert-text">
                  Por favor, ingresar un correo electronico valido.
                </p>
              )}
            </form>
          )}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
            <button
              type="button"
              className="btn btn-enviar"
              onClick={handleClick}
            >
              enviar
            </button>
          </div>
        </div>

        <div className="col-md-6 m-2 position-relative mx-auto">
          <IconHome />
          <div className="card mb-3">
            <img className="card-img-top right-card-img rounded-top" />
            <div className="card-body">
              <h5 className="card-title pt-2 fw-bold">lorem ipsum dolor</h5>
              <p className="card-text rigth-text text-size-form">
                Quis mollis nist nunc et massa vestibulum sed metus in lorem
                tristique
              </p>
              <ul className="pl-0">
                <li className="">
                  <IconCard />
                </li>
                <li className="">
                  <IconCard />
                </li>
              </ul>
              <a className="btn btn-outline-primary p-3 mx-auto right-btn-quiero fw-bold d-grid gap-2">
                lo quiero ya
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
