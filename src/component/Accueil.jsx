import React from "react";
import { Link } from "react-router-dom";
import { SharedContext } from "./SharedContext";
import { useState, useContext, useEffect } from "react";
import Facture from "./Facture";
import Attach from "./Attach";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import axios from "axios";
import data from "./data.json";

const Accueil = () => {
  useEffect(() => {
    setClients(data.clients);
    setProduits(data.produits);
  }, []);
  ///////////////
  const { ready, handleReady } = useContext(SharedContext);

  const [keyValid, setKeyValid] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const handleKeyInput = (event) => {
    setKeyInput(event.target.value);
  };
  const key = "ALG58TIZI15";
  const handleKey = () => {
    if (key === keyInput) {
      if (ready) handleReady();
      setKeyValid(true);
    }
  };
  const [factureNum, setFactureNum] = useState("");

  const [color, setColor] = useState("1");
  const handleFactureResult = () => {
    setColor("0");
  };
  const handleAttachResult = () => {
    setColor("1");
  };

  ///////////// options
  const allMonths = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const allQt = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  /////////////////// //,""
  const [dateDebut, setDateDebut] = useState("");
  const [datefin, setDateFin] = useState("");
  const [productsAdded, setProductsAdded] = useState(0);
  const [selectedPrix, setSelectedPrix] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQt, setSelectedQt] = useState("");
  //////////////////////////////
  ///

  let clientNv = {
    nom: "",
    adresse: "",
    rc: "",
    nif: "",
    ai: "",
    contract: "STL/505/23/P/T131",
    qt: "7",
  };
  let produitNv = {
    nom: "LOCATION D'UN (01) CAMION LEGER SANS CHAUFFEUR.",
    unitee: "Jour",
    vehicule: "Camion JMC",
    mat: "04413-316-15",
    prix: "4500",
    debutPeriode: "21/06/2023",
    finPeriode: "20/07/2023",
    qt: "7",
  };
  const handleReturnClient = () => {
    setClientSelected(false);
    setAttachValid(false);
  };
  const handleProductAdded = () => {
    if (!clientSelected) setClientSelected(true);
    else {
      clientNv = clients.find((item) => item.nom === selectedClient);

      clientPartage = clientNv;
      produitNv = produits.find((item) => item.nom === selectedProduct);

      produitNv.prix = selectedPrix;
      produitNv.debutPeriode = dateDebut;
      produitNv.finPeriode = datefin;
      console.log(dateDebut);
      console.log(produitNv);
      produitsPartagee.push(produitNv);

      produitsPartagee[produitsPartagee.length - 1].qt = selectedQt;

      setProduitsPartagee(produitsPartagee);

      setClientPartage(clientNv);

      setProductsAdded(productsAdded + 1);
    }
  };

  //////////////////////////////////////////
  const handleDateDebut = (event) => {
    setDateDebut(event.target.value);
  };
  const handleDateFin = (event) => {
    setDateFin(event.target.value);
  };
  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };
  const handlePrixChange = (event) => {
    setSelectedPrix(event.target.value);
  };
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  const handleQtChange = (event) => {
    setSelectedQt(event.target.value);
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    monthsValues.length = 0;
    setMonthsValues([]);
    for (
      let i = 0;
      i <
      daysInMonth(
        allMonths.indexOf(event.target.value),
        dateActuelle.getFullYear()
      );
      i++
    ) {
      monthsValues.push(1);
    }

    setMonthsValues(monthsValues);
  };
  const handleFactureChange = (event) => {
    console.log("cc" + event.target.value);
    setFactureNum(event.target.value);
  };
  const [factureValid, setFactureValid] = useState(false);

  const handleFactureCheck = () => {
    console.log(factureNum);
    if (localStorage.getItem("facture" + factureNum.toString()) === null)
      setFactureValid(true);
    else {
      setFactureValid(false);
      alert("Error : le numéro de facture existe déja");
    }
  };
  ///////////////////////////////////////////////
  const [clients, setClients] = useState([]);

  const [produits, setProduits] = useState([]);

  //////////////
  let [clientPartage, setClientPartage] = useState({
    nom: "",
    adresse: "",
    rc: "",
    nif: "",
    ai: "",
    contract: "",
  });
  const handleEffacer = () => {
    setProductsAdded(productsAdded - 1);
    produitsPartagee.pop();
  };

  const [produitsPartagee, setProduitsPartagee] = useState([]);

  const [clientSelected, setClientSelected] = useState(false);

  const handleChange = (v, index) => {
    const nvTab = [...monthsValues];
    nvTab[index] = v;
    console.log(nvTab);
    setMonthsValues(nvTab);
    console.log(monthsValues);
    console.log(v);
  };
  const dateActuelle = new Date();

  ///
  //////////////////////////////
  const [attachValid, setAttachValid] = useState(false);
  const handleAttachValid = () => {
    setAttachValid(true);
  };

  //////////////////////////////

  const daysInMonth = (m, y) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const [monthsValues, setMonthsValues] = useState([]);
  function handleTotal() {
    var somme = 0;
    monthsValues.map((val) => {
      if (val === 1) somme += 1;
      if (val === 0.5) somme += 0.5;
    });
    return somme;
  }
  var sommeJours = handleTotal();

  return (
    <div className="flex flex-col   min-h-screen">
      <Navbar />
      {!keyValid && (
        <div className="flex flex-1 bg-red-500 justify-center items-center  justify text-slate-700">
          <div className="flex-1 flex flex-col justify-center gap-10 items-center mx-80 h-80  bg-white rounded-xl">
            <span className="text-red-500 font-bold text-2xl">License Key</span>
            <input
              className="bg-red-500 h-20 text-white outline-none text-center text-xl rounded-lg"
              type="text"
              onChange={(event) => handleKeyInput(event)}
            />
            <button
              onClick={handleKey}
              className="rounded-lg p-2 px-10 border-slate flex justify-end mt-4 text-white text-center font-bold bg-red-500 outline-none"
            >
              {} Valider
            </button>
          </div>
        </div>
      )}
      {keyValid && (
        <div>
          {!ready && (
            <div className="flex justify-center mb-20 mt-20 items-center    bg-red-500">
              <div className="bloc gap-20 ">
                {/* <img alt="con" src={require("../img/contract.png")} /> */}

                <div className="flex flex-col justify-center items-center ">
                  {clientSelected && (
                    <div className="text-4xl text-white font-bold border-2 border-white py-8 px-20 rounded-lg">
                      Facture
                    </div>
                  )}
                  {clientSelected && (
                    <div className="flex flex-col items-start gap-auto mt-10 justify-start">
                      <div className="flex justify-center items-center ">
                        <div className="mr-10 font-bold text-white text-lg outline-none border-red-500 ">
                          Facture Num
                        </div>
                        <div className="flex justify-center items-center mr-2 ">
                          <input
                            className="border-none outline-none text-center border-red-500 p-1 rounded-lg"
                            value={factureNum}
                            onChange={handleFactureChange}
                            type="number"
                            maxLength={3}
                          />
                        </div>
                        {factureValid && (
                          <img
                            className="h-5 w-5 mr-10"
                            alt="con"
                            src={require("../img/correct.png")}
                          />
                        )}

                        <button
                          onClick={handleFactureCheck}
                          className="p-1 px-4  bg-white text-red-500 rounded-lg"
                        >
                          Valider
                        </button>
                      </div>
                      {/* <p className="text-red-500"> {selectedQt}</p> */}
                    </div>
                  )}
                  {/*xxxx */}

                  <div className="flex p-5 border-2 border-red-500 flex-col my-10 gap-4 justify-center items-center bg-white rounded-3xl">
                    {!clientSelected && (
                      <div className="flex flex-col items-start gap-5 mb-10 justify-start">
                        <div className="flex flex-col justify-start items-center gap-10">
                          <div className="font-bold">Client</div>
                          <div className="flex justify-center items-center gap-5">
                            <select
                              className="border-2 outline-none border-red-500 hover:border-red-500 rounded-xl p-2"
                              value={selectedClient}
                              onChange={handleClientChange}
                            >
                              <option value="">Sélectionnez une option</option>
                              {clients.map((option, index) => (
                                <option key={index} value={option.nom}>
                                  {option.nom}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* <p className="text-red-500"> {selectedClient}</p> */}
                      </div>
                    )}
                    {clientSelected && (
                      <div className="flex justify-center items-center gap-10">
                        <div className="flex flex-col justify-start items-start gap-14">
                          <div className="font-bold">Produit</div>

                          <div className="font-bold">Prix Unitaire</div>
                          <div className="font-bold">Quantité</div>
                          <div className="font-bold">Date Début</div>
                          <div className="font-bold">Date Fin</div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-10">
                          <div className="flex justify-center items-center ">
                            <select
                              className="border-2 border-red-500 p-1 rounded-lg"
                              value={selectedProduct}
                              onChange={handleProductChange}
                            >
                              <option value="">Sélectionnez une option</option>
                              {produits.map((option, index) => (
                                <option key={index} value={option.nom}>
                                  {option.nom}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex justify-center items-center ">
                            <input
                              className="border-2 border-red-500 p-1 rounded-lg"
                              value={selectedPrix}
                              onChange={handlePrixChange}
                              type="text"
                              maxLength={10}
                            />
                          </div>
                          <div className="flex justify-center items-center ">
                            <select
                              className="border-2 border-red-500 p-1 rounded-lg"
                              value={selectedQt}
                              onChange={handleQtChange}
                            >
                              <option value="">Sélectionnez une option</option>
                              {allQt.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex justify-center items-center ">
                            <input
                              className="border-2 border-red-500 p-1 rounded-lg"
                              type="date"
                              name="begin"
                              dir="rtl"
                              placeholder="dd-mm-yyyy"
                              value={dateDebut}
                              onChange={(event) => handleDateDebut(event)}
                            />
                          </div>
                          <div className="flex justify-center items-center ">
                            <input
                              className="border-2 border-red-500 p-1 rounded-lg"
                              type="date"
                              name="begin"
                              placeholder="dd-mm-yyyy"
                              value={datefin}
                              onChange={(event) => handleDateFin(event)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                          <div className="h-40 w-40 border-2 rounded-2xl border-red-500 flex justify-center items-center text-2xl">
                            {" "}
                            <p className="text-5xl font-bold">
                              {" "}
                              {productsAdded}{" "}
                            </p>
                          </div>
                          <div className="font-bold text-red-500">
                            Produits Ajoutés
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-center gap-5 items-center">
                      <button
                        onClick={
                          (selectedProduct !== "" && selectedQt !== "") ||
                          !clientSelected
                            ? handleProductAdded
                            : null
                        }
                        className="h-10 w-40 mt-5 bg-red-500 text-white rounded-lg"
                      >
                        Ajouter
                      </button>
                      <button
                        onClick={productsAdded > 0 ? handleEffacer : null}
                        className="h-10 w-40 mt-5 bg-red-500 text-white rounded-lg"
                      >
                        Effacer
                      </button>
                    </div>
                  </div>

                  {clientSelected && (
                    <div className="text-4xl text-white font-bold border-2 border-white py-8 px-20 rounded-lg">
                      Attachement
                    </div>
                  )}
                  {clientSelected && (
                    <div className="flex px-5 py-10 border-2 border-red-500 flex-col my-10 gap-4 justify-center items-center bg-white rounded-3xl mb-40">
                      <div className="flex flex-col items-center gap-20 mb-10 justify-start">
                        <div className="flex justify-center items-center gap-20">
                          <div className="font-bold">Mois</div>
                          <div className="flex justify-center items-center gap-5">
                            <select
                              value={selectedMonth}
                              onChange={handleMonthChange}
                            >
                              <option value="">Sélectionnez une option</option>
                              {allMonths.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className=" w-[1300px]  flex py-2 px-2  flex-col gap-1 justify-center items-center  border-2 border-red-500 rounded-lg">
                          <div className="text-red-500">
                            {selectedMonth}/{dateActuelle.getFullYear()} DU 01/
                            {allMonths.indexOf(selectedMonth) + 1}/
                            {dateActuelle.getFullYear()} AU{" "}
                            {monthsValues.length}/
                            {allMonths.indexOf(selectedMonth) + 1}/
                            {dateActuelle.getFullYear()}
                          </div>
                          <table>
                            <thead>
                              <tr>
                                <td>Jours</td>
                                {monthsValues.map((_, index) => (
                                  <td key={index}>{index + 1}</td>
                                ))}
                              </tr>
                              <tr>
                                <td>Jours</td>
                                {monthsValues.map((_, index) => (
                                  <td key={index}>{index + 1}</td>
                                ))}
                              </tr>
                              <tr>
                                <td></td>
                              </tr>
                              {!attachValid && (
                                <tr>
                                  <td className="w-auto py-1 px-1 h-10">
                                    Jours
                                  </td>
                                  {monthsValues.map((value, index) => (
                                    <td key={index} className="w-auto">
                                      <input
                                        placeholder={value}
                                        onInput={(e) =>
                                          handleChange(e.target.value, index)
                                        }
                                        maxLength={3}
                                        type="text"
                                        className="placeholder-black border-0 outline-0 w-4 text-center"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              )}
                              {attachValid && (
                                <tr>
                                  <td className="w-auto py-1 px-1 h-10">
                                    Jours
                                  </td>
                                  {monthsValues.map((value, index) => (
                                    <td key={index} className="w-auto">
                                      {value}
                                    </td>
                                  ))}
                                </tr>
                              )}
                            </thead>
                          </table>
                          {selectedMonth && (
                            <div>
                              {!attachValid && (
                                <button
                                  onClick={handleAttachValid}
                                  className="border-2 p-2 border-slate flex justify-end mt-4 text-red-500 text-center font-bold"
                                >
                                  {} Valider
                                </button>
                              )}
                            </div>
                          )}

                          <table className="mt-4">
                            <thead></thead>
                          </table>
                          <div className="border-2 p-2 border-slate flex justify-end mt-4 text-red-500 text-center font-bold">
                            TOTAL <br /> {sommeJours} <br /> JOURS
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/*XXX*/}
                  <div className="flex justify-center gap-5 items-center">
                    {clientSelected && (
                      <button
                        onClick={handleReturnClient}
                        className="h-10 w-40 mt-5 bg-red-500 text-white"
                      >
                        <Link
                          className="h-10 w-30 mt-5 bg-white rounded-lg text-red-500 px-10 py-2"
                          to="/"
                        >
                          Retour
                        </Link>
                      </button>
                    )}
                    {/* <Link to="/">Retour</Link> */}
                    {factureValid && (
                      <div>
                        {attachValid && (
                          <button
                            onClick={handleReady}
                            className="h-10 w-30 mt-5 bg-white rounded-lg text-red-500 px-10 py-2"
                          >
                            Facture
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/*XXX*/}
                </div>
              </div>
            </div>
          )}
          {ready && (
            <div className="flex justify-center items-center gap-10 ">
              <button
                onClick={handleFactureResult}
                className=" text-center w-40 py-2 mt-5 mb-20 bg-white text-red-500 font-bold rounded-lg"
              >
                Facture
              </button>
              <button
                onClick={handleAttachResult}
                className=" w-40 py-2 text-center w-40 mt-5 mb-20 bg-white text-red-500 font-bold rounded-lg"
              >
                Attachement
              </button>
            </div>
          )}
          {ready && (
            <div>
              {color === "0" && (
                <Facture
                  facture={factureNum}
                  client={clientPartage}
                  produits={produitsPartagee}
                />
              )}
              {color === "1" && (
                <Attach
                  month={selectedMonth}
                  facture={factureNum}
                  client={clientPartage}
                  produits={produitsPartagee}
                  attach={monthsValues}
                />
              )}
            </div>
          )}
          )
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Accueil;
