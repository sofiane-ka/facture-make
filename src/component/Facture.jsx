import React from "react";
import { useRef } from "react";
import "./Facture.css";
import jsPDF from "jspdf";
import { NumberToLetter } from "convertir-nombre-lettre";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js/dist/html2pdf.js";

const Facture = () => {
  const dateActuelle = new Date();

  // Obtenez les composants de date (jour, mois, année)
  const jour = dateActuelle.getDate();
  const mois = dateActuelle.getMonth() + 1; // Les mois sont indexés à partir de 0
  const annee = dateActuelle.getFullYear();

  // Formatez la date dans le format souhaité (jour/mois/année)
  const dateFormatee = `${jour}/${mois}/${annee}`;
  console.log(dateFormatee);
  // const pdfRef = useRef();
  // const downloadPDF = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "o4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 30;
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );
  //     pdf.save("invoice.pdf");
  //   });
  // };

  // const reportTemplateRef = useRef(null);

  // const handleGeneratePdf = () => {
  //   const doc = new jsPDF({
  //     format: "a3",
  //     unit: "px",
  //   });

  //   // Adding the fonts.
  //   doc.setFont("Inter-Regular", "normal");

  //   doc.html(reportTemplateRef.current, {
  //     async callback(doc) {
  //       await doc.save("document");
  //     },
  //   });
  // };
  // const pdfRef = useRef(null);

  // const handleDownload = () => {
  //   const content = pdfRef.current;

  //   const doc = new jsPDF();
  //   doc.html(content, {
  //     callback: function (doc) {
  //       doc.save("sample.pdf");
  //     },
  //     x: 100,
  //     y: 100, // <- here
  //   });
  // };

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
  const totalTTC = 48195;
  return (
    <div className="flex flex-col items-center justify-center py-0">
      <div ref={divRef} className="bloc px-5 pt-0 pb-12 border-2 gap-20">
        <img alt="con" src={require("../img/contract.png")} />
        <div className="flex text-sm justify-end mb-3 mt-2 text-red-500 underline">
          TIZI OUZOU Le,{dateFormatee}
        </div>

        <div className="flex justify-between items-center px-10">
          <div className="flex flex-col justify-center items-center gap-4 ">
            <div className="text-red-500 font-bold text-4xl">FACTURE</div>
            <div className="text-xl font-bold">N° 88/2023</div>
          </div>
          <div className="h-40 w-60 bg-slate-200 rounded-lg p-3 text-sm">
            Doit: <br />
            COSIDER-TP-PROJET T131
            <br />
            OUZELLAGUEN-W-BEJAIA
            <br />
            RC / N°99B0009368-00/16
            <br />
            NIF / N°099916000936842
            <br />
            AI / N° 06360038285
            <br />
          </div>
        </div>
        <div className="flex mt-2 mb-2 justify-start text-red-500 font-bold text-md">
          CONTRACT N°: STL/505/23/P/T131
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
            <tr>
              <td>01</td>
              <td>
                LOCATION D'UN (01) CAMION LEGER SANS CHAUFFEUR. CAMION JMC
                IMMAT: 04413-316-15. Période DU 21/06/2023 AU 20/07/2023
              </td>
              <td>Jour</td>
              <td>09</td>
              <td>4500,00</td>
              <td>40500,00</td>
            </tr>
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
              <td>40500,00</td>
            </tr>
            <tr>
              <td>TVA 19%</td>
              <td>7695,00</td>
            </tr>
            <tr>
              <td>TOTAL TTC</td>
              <td cla>
                <p className="text-red-500">{totalTTC},00</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex mt-5 justify-start  font-bold text-md">
          Arrêtée de cette présente facture à la somme de :
        </div>
        <div className="flex  justify-start text-red-500 font-bold text-md">
          {NumberToLetter(totalTTC)}
        </div>
        <div className="flex justify-end  mt-2 font-bold text-lg ">
          Le gérant
        </div>
      </div>
      <button
        className="h-20 w-40 mt-5 bg-red-500 text-white"
        onClick={handleCapture}
      >
        Exporter en PDF
      </button>
    </div>
  );
};

export default Facture;
