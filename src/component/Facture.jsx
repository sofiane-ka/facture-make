import React, { useEffect } from "react";
import { useRef, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Facture.css";
import jsPDF from "jspdf";
import { NumberToLetter } from "convertir-nombre-lettre";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js/dist/html2pdf.js";
import { SharedContext } from "./SharedContext";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
function Facture(props) {
  //////// states
  const [suprim, setSuprim] = useState(false);
  const [factureNum, setFactureNum] = useState("");
  const [produits, setProduits] = useState([]);
  const [client, setClient] = useState("");

  /////
  const location = useLocation();

  console.log(props.produits === undefined);

  ////////
  const { ready, handleReady } = useContext(SharedContext);
  ///////
  useEffect(() => {
    if (props.produits === undefined) {
      setFactureNum(location.state.factures.factureNum);
      setClient(location.state.factures.client);
      setProduits(location.state.factures.produits);
      setSuprim(true);
    } else {
      setFactureNum(props.facture);
      setClient(props.client);
      setProduits(props.produits);
    }
  }, []);

  const dateActuelle = new Date();

  const jour = dateActuelle.getDate();

  const mois = dateActuelle.getMonth() + 1; // Les mois sont indexés à partir de 0
  const annee = dateActuelle.getFullYear();
  console.log(jour * 10);

  const dateFormatee =
    jour < 10 ? `0${jour}/${mois}/${annee}` : `${jour}/${mois}/${annee}`;

  console.log(dateFormatee);

  const divRef = useRef(null);

  const handleCapture = () => {
    if (divRef.current) {
      html2canvas(divRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "FACTURE N° " + factureNum.toString() + ".png";
        a.click();
      });
    }
    localStorage.setItem(
      "facture" + factureNum.toString(),
      JSON.stringify({
        factureNum: factureNum,
        produits: produits,
        client: client,
      })
    );
  };
  ////

  ////
  const nombreEnLettresFR = (nombre) => {
    const unites = [
      "",
      "un",
      "deux",
      "trois",
      "quatre",
      "cinq",
      "six",
      "sept",
      "huit",
      "neuf",
    ];
    const dizaines = [
      "",
      "dix",
      "vingt",
      "trente",
      "quarante",
      "cinquante",
      "soixante",
      "soixante-dix",
      "quatre-vingts",
      "quatre-vingt-dix",
    ];
    const exceptions = {
      11: "onze",
      12: "douze",
      13: "treize",
      14: "quatorze",
      15: "quinze",
      16: "seize",
    };

    if (nombre in exceptions) {
      return exceptions[nombre];
    }

    const unite = nombre % 10;
    const dizaine = Math.floor((nombre % 100) / 10);
    const centaine = Math.floor(nombre / 100);

    let resultat = "";

    if (centaine > 0) {
      if (centaine === 1) {
        resultat += "cent";
      } else {
        resultat += unites[centaine] + " cents";
      }
    }

    if (dizaine > 1) {
      resultat += " " + dizaines[dizaine];
      if (unite > 0) {
        resultat += "-" + unites[unite];
      }
    } else if (dizaine === 1) {
      resultat += " " + exceptions[nombre % 100];
    } else if (unite > 0) {
      resultat += " " + unites[unite];
    }

    return resultat;
  };
  function extrairePartieFractionnaire(nombre) {
    // Convertir le nombre en chaîne de caractères
    const nombreEnChaine = nombre.toString();

    // Diviser la chaîne de caractères à partir du point décimal
    const parties = nombreEnChaine.split(".");

    // Si le nombre n'a pas de partie fractionnaire
    if (parties.length === 1) {
      return "00";
    }

    // Sinon, extraire la partie fractionnaire et la formater en deux chiffres
    const partieFractionnaire = parties[1].substring(0, 2);

    return partieFractionnaire.padEnd(2, "0"); // Ajouter '0' à droite si nécessaire
  }
  const handleSupp = () => {
    localStorage.removeItem("facture" + factureNum.toString());
    alert("La facture a été bien supprimée");
  };

  const qt = 9;
  const totalHT = produits.reduce(function (total, objet) {
    return total + parseInt(objet.prix, 10) * parseInt(objet.qt, 10);
  }, 0);
  const tva = 19;
  const totalTTC = totalHT + (totalHT * tva) / 100;
  return (
    <div className="flex flex-col min-h-screen gap-2">
      <div className=" flex flex-col items-center justify-center py-0">
        {props.produits === undefined && <Navbar />}
        <div ref={divRef} className="bloc px-5 bg-white pt-0 pb-40  gap-20">
          <img alt="con" src={require("../img/contract.png")} />
          <div className="flex text-sm justify-end mb-3 mt-2  underline">
            TIZI OUZOU Le,{dateFormatee}
          </div>

          <div className="flex justify-between items-center px-10">
            <div className="flex flex-col justify-center items-center gap-4 ">
              <div className="text-red-500 font-bold text-4xl">FACTURE</div>
              <div className="text-xl font-bold">N° {factureNum}/2023</div>
            </div>
            <div className="h-40 w-60 bg-slate-200 rounded-lg p-3 text-sm">
              Doit: <br />
              {/* COSIDER-TP-PROJET T131 */}
              {client.nom}
              <br />
              {client.adresse}
              <br />
              RC / N°{client.rc}
              <br />
              NIF / N°{client.nif}
              <br />
              AI / N° {client.ai}
              <br />
            </div>
          </div>
          <div className="flex mt-2 mb-2 justify-start text-red-500 font-bold text-md">
            CONTRACT N°: {client.contract}
          </div>

          <table className="table-auto">
            <thead>
              <tr>
                <th>N°</th>
                <th id="design">DESIGNATION</th>
                <th>UNITEE</th>
                <th>QT</th>
                <th>P.U HT</th>
                <th>MONTANT HT</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
              <td>01</td>
              <td className="text-start">
                LOCATION D'UN (<span className="font-bold">01</span>) CAMION
                LEGER SANS CHAUFFEUR.
                <br />
                CAMION
                <span className="font-bold px-1">JMC</span>
                <br /> IMMAT:
                <span className="font-bold px-1">04413-316-15.</span>
                Période du<span className="font-bold px-1">
                  21/06/2023
                </span> au <span className="font-bold px-1">20/07/2023</span>
              </td>
              <td className="text-lg">Jour</td>
              <td className="text-lg">{qt}</td>
              <td className="text-lg">{puHT.toLocaleString()},00</td>
              <td className="text-lg">{(puHT * qt).toLocaleString()},00</td>
            </tr> */}
              {produits.map((row, index) => (
                <tr key={index}>
                  <td>
                    {index < 10 ? "0" + (index + 1).toString() : index + 1}
                  </td>

                  <td className="text-start">
                    {row.nom}.
                    <br />
                    CAMION
                    <span className="font-bold px-1">{row.vehicule}</span>
                    <br /> IMMAT:
                    <span className="font-bold px-1">{row.mat}.</span>
                    Période du
                    <span className="font-bold px-1">
                      {row.debutPeriode}
                    </span>{" "}
                    au <span className="font-bold px-1">{row.finPeriode}</span>
                  </td>
                  <td className="text-lg">{row.unitee}</td>
                  <td className="text-lg">{row.qt}</td>
                  <td className="text-lg">
                    {parseInt(row.prix, 10).toLocaleString()},00
                  </td>
                  <td className="text-lg">
                    {(parseInt(row.prix, 10) * row.qt).toLocaleString()},00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="flex mt-2 justify-end border-0">
            {/* <thead>
            <th>11</th>
            <th>11</th>
          </thead> */}
            <tbody>
              <tr>
                <td>TOTAL HT</td>
                <td className="text-lg py-2 px-2">
                  {Math.round(parseFloat(totalHT)).toLocaleString()},
                  {extrairePartieFractionnaire(totalHT)}
                </td>
              </tr>
              <tr>
                <td>TVA {tva}%</td>
                <td className="text-lg py-2 px-2">
                  {Math.round(
                    parseFloat((totalHT * tva) / 100)
                  ).toLocaleString()}
                  ,{extrairePartieFractionnaire((totalHT * tva) / 100)}
                </td>
              </tr>
              <tr>
                <td>TOTAL TTC</td>
                <td cla>
                  <p className="text-lg py-2 px-2 font-bold">
                    {Math.round(parseFloat(totalTTC)).toLocaleString()},
                    {extrairePartieFractionnaire(totalTTC)}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex mt-5 justify-start  font-bold text-md">
            Arrêtée de cette présente facture à la somme de :
          </div>
          <div className="flex  justify-start text-red-500 font-bold text-md">
            {NumberToLetter(Math.round(parseFloat(totalTTC)))} dinars algérien
            <br /> et {extrairePartieFractionnaire(totalTTC)} CTS
          </div>
          <div className="flex justify-end pr-20  mt-2 font-bold text-lg ">
            Le gérant
          </div>
        </div>

        <div className="flex justify-center gap-5 items-center">
          {props.produits === undefined && (
            <button className="h-10 w-40 mt-5 bg-red-500 text-white">
              <Link
                className="h-10 w-30 mt-5 px-10 py-2 bg-white rounded-lg text-red-500"
                to="/factures"
              >
                Retour
              </Link>
            </button>
          )}
          {props.produits !== undefined && (
            <button
              onClick={handleReady}
              className="h-10 w-40 mt-5 bg-red-500 text-white"
            >
              <Link
                className="h-10 w-30 mt-5 px-10 py-2 bg-white rounded-lg text-red-500"
                to="/"
              >
                Retour
              </Link>
            </button>
          )}

          {/* <Link to="/">Retour</Link> */}
          <button
            className="h-10 w-40 mt-5 bg-white rounded-lg text-red-500"
            onClick={handleCapture}
          >
            Exporter en PDF
          </button>

          {suprim && (
            <button
              className="h-10 w-40 mt-5 bg-white rounded-lg text-red-500"
              onClick={handleSupp}
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
      {props.produits === undefined && <Footer />}
    </div>
  );
}

export default Facture;
