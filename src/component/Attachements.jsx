import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import Facture from "./Facture";

function Attachements() {
  const navigate = useNavigate();
  const handleFactureClick = () => {
    navigate(`/factures/${factures.factureNum}`, { state: { factures } });
  };
  const [readyFac, setReadyFac] = useState(false);
  const handleReadyFac = () => {
    setReadyFac(!readyFac);
    navigate(`/factures/${factures.factureNum}`, { state: { factures } });
  };
  const [factures, setFactures] = useState({
    factureNum: "",
    produits: [{}],
    client: {},
  });
  const [factureNum, setFactureNum] = useState("");
  const handleFactureSearch = (event) => {
    setFactureNum(event.target.value);
  };
  const handleFactureValid = () => {
    try {
      setFactures(
        JSON.parse(localStorage.getItem("facture" + factureNum.toString()))
      );
    } catch (e) {
      console.log("error");
    }

    console.log(factures);
  };

  return (
    <div id="factures" className="min-h-screen flex flex-col">
      <Navbar />
      {!readyFac && (
        <div className="flex p-5 border-2 border-red-500 flex-col my-10 gap-4 justify-center items-center bg-white rounded-3xl">
          <div className="flex justify-center items-center gap-5">
            <span className="text-red-500 font-bold text-2xl">
              Numero d'attachement
            </span>
            <input
              className="border-2 outline-none text-center border-red-500 p-1 rounded-lg"
              value={factureNum}
              onInput={(event) => handleFactureSearch(event)}
              type="number"
              maxLength={3}
              placeholder="tapez le num"
            />
            <button
              onClick={handleFactureValid}
              className="rounded-lg p-2 px-10 border-slate flex justify-end text-white text-center font-bold bg-red-500 outline-none"
            >
              Rechercher
            </button>
          </div>

          <table>
            <thead>
              <th>Facture</th>
              <th>Client</th>
              <th>Details</th>
            </thead>
            <tbody>
              <td>{factures.factureNum}</td>
              <td>{factures.client.nom}</td>
              <td>
                <button
                  onClick={handleReadyFac}
                  className="text-red-500 underlined"
                >
                  <Link to={`/factures/${factures.factureNum}`}>Voir</Link>
                </button>
              </td>
            </tbody>
          </table>
        </div>
      )}
      {readyFac && (
        <Facture
          facture={factures.factureNum}
          client={factures.client}
          produits={factures.produits}
        />
      )}

      <Footer />
    </div>
  );
}

export default Attachements;
