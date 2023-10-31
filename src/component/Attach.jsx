import React from "react";
import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Facture.css";

import html2canvas from "html2canvas";

import { SharedContext } from "./SharedContext";

const Attach = (props) => {
  console.log(props.client.nom);
  ////////
  const { ready, handleReady } = useContext(SharedContext);
  ///////
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
        a.download = "div_capture.png";
        a.click();
      });
    }
  };
  ////
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

  console.log(props.produits[0].prix);
  const qt = 9;
  const totalHT = props.produits.reduce(function (total, objet) {
    return total + parseInt(objet.prix, 10) * parseInt(objet.qt, 10);
  }, 0);
  const tva = 19;
  const totalTTC = totalHT + (totalHT * tva) / 100;

  ///
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  ///
  const cellData = Array(31).fill(null);
  ///
  function handleTotal() {
    var somme = 0;
    props.attach.map((val) => {
      if (val == 1) somme += 1;
      if (val == 0.5) somme += 0.5;
    });
    return somme;
  }
  var sommeJours = handleTotal();
  return (
    <div className="flex flex-col    items-center justify-center py-10 ">
      <div ref={divRef} className="bloc mt-10 bg-white pb-40 px-20  gap-20">
        <img alt="con" src={require("../img/contract.png")} />
        <div className="flex text-sm justify-end mb-3 mt-2  underline">
          TIZI OUZOU Le,{dateFormatee}
        </div>
        <div className="flex mt-2 mb-5 justify-start  font-bold text-xl">
          ATTACHEMENT N°:{" "}
          <span className="ml-1 text-red-500">
            {props.facture}/{dateActuelle.getFullYear()}
          </span>
        </div>
        <div className="flex mt-2 mb-2 justify-start text-red-500 font-bold text-sm">
          CONTRACT N°: {props.client.contract}
        </div>
        <div className="flex mt-2 mb-2 justify-start  font-bold text-sm">
          IMMAT CAMION: {props.produits[0].mat}
        </div>

        <div className=" w-[1300px]  flex py-2 px-2  flex-col gap-1 justify-center items-center  border-2 border-slate-900">
          <div className="text-red-500">
            {props.month}/{dateActuelle.getFullYear()} DU 01/
            {allMonths.indexOf(props.month) + 1}/{dateActuelle.getFullYear()} AU{" "}
            {props.attach.length}/{allMonths.indexOf(props.month) + 1}/
            {dateActuelle.getFullYear()}
          </div>
          <table>
            <thead>
              <tr>
                <td>Jours</td>
                {props.attach.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr>
                <td>Jours</td>
                {props.attach.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td className="w-auto py-1 px-1 h-10">Jours</td>
                {props.attach.map((value, index) => (
                  <td key={index} className="w-auto">
                    {value}
                  </td>
                ))}
              </tr>
            </thead>
          </table>
          <table className="mt-4">
            <thead>
              {/* <tr>
                <td className="w-auto py-1 px-2">Jours</td>
                {cellData.map((_, index) => (
                  <td key={index} className="w-auto">
                    <input
                      maxLength={3}
                      type="text"
                      className="border-0 outline-0 w-4 text-center"
                    />
                  </td>
                ))}
              </tr> */}
            </thead>
          </table>
          <div className="border-2 p-2 border-slate flex justify-end mt-4 text-red-500 text-center font-bold">
            TOTAL <br /> {sommeJours} <br /> JOURS
          </div>
        </div>

        <div className="flex justify-between px-10  mt-10 font-bold text-lg ">
          <div>{props.client.nom}</div>
          <div>LE LOUEUR</div>
        </div>
      </div>
      <div className="flex justify-center gap-5 items-center">
        <button
          onClick={handleReady}
          className="h-10 w-40 mt-5 bg-red-500 text-white"
        >
          <Link
            className="h-10 w-30 mt-5 bg-white rounded-lg text-red-500 px-10 py-2"
            to="/"
          >
            Retour
          </Link>
        </button>

        {/* <Link to="/">Retour</Link> */}
        <button
          className="h-10 w-40 mt-5 bg-white rounded-lg text-red-500"
          onClick={handleCapture}
        >
          Exporter en PDF
        </button>
      </div>
    </div>
  );
};

export default Attach;
