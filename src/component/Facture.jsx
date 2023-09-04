import React from "react";
import { useRef } from "react";
import "./Facture.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js/dist/html2pdf.js";

const Facture = () => {
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "o4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div
      ref={pdfRef}
      className="flex flex-col items-center justify-center py-0"
    >
      <div className="bloc px-5 pt-0 pb-12 border-2 gap-20">
        <img alt="con" src={require("../img/contract.png")} />
        <div className="flex justify-end mb-5 mt-2 text-red-500 underline">
          TIZI OUZOU Le,03/09/2023
        </div>

        <div className="flex justify-between items-center px-10">
          <div className="flex flex-col justify-center items-center gap-4 ">
            <div className="text-red-500 font-bold text-4xl">FACTURE</div>
            <div className="text-xl font-bold">N° 88/2023</div>
          </div>
          <div className="h-40 w-60 bg-slate-200 rounded-lg p-5 text-sm">
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
        <div className="flex mt-5 justify-start text-red-500 font-bold text-md">
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
                <p className="text-red-500">48195,00</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex mt-5 justify-start  font-bold text-md">
          Arrêtée de cette présente facture à la somme de :
        </div>
        <div className="flex  justify-start text-red-500 font-bold text-md">
          Quarante huit mille , cent quatre vingt quinze dinars et zéro centime.
        </div>
        <div className="flex justify-end  mt-2 font-bold text-lg ">
          Le gérant
        </div>
      </div>
      <button className="h-20 w-40 bg-red-500 text-white" onClick={downloadPDF}>
        Exporter en PDF
      </button>
    </div>
  );
};

export default Facture;
