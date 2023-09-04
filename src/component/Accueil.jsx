import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const Accueil = () => {
  const allClients = ["COSIDER-TP-PROJET T131", "SOCIETEE-TP-PROJET T131"];
  const allProducts = [
    "LOCATION D'UN (01) CAMION LEGER SANS CHAUFFEUR",
    "LOCATION D'UN (01) VOITURE LEGER SANS CHAUFFEUR",
  ]; // Remplacez ceci par vos options initiales
  const [AllClients, setAllClients] = useState(allClients);
  const [Products, setProducts] = useState(allProducts);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const handleClientSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredOptions = allClients.filter((option) =>
      option.toLowerCase().includes(searchTerm)
    );
    setAllClients(filteredOptions);
    setSelectedClient("");
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleProductSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredOptions = allProducts.filter((option) =>
      option.toLowerCase().includes(searchTerm)
    );
    setProducts(filteredOptions);
    setSelectedClient("");
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  /////////////////////////////
  const [clients, setClients] = useState([
    {
      nom: "COSIDER TP - PROJET T131",
      adresse: "OUZELLAGUEN - W- BEJAIA",
      rc: "99B0009368-00/16",
      nif: "099916000936842",
      ai: "06360038285",
      contract: "STL/505/23/P/T131",
    },
  ]);
  const [client, setClient] = useState({
    nom: "COSIDER TP - PROJET T131",
    adresse: "OUZELLAGUEN - W- BEJAIA",
    rc: "99B0009368-00/16",
    nif: "099916000936842",
    ai: "06360038285",
    contract: "STL/505/23/P/T131",
  });
  const [produis, setProduits] = useState([
    {
      nom: "LOCATION D'UN (01) CAMION LEGER SANS CHAUFFEUR.",
      unitee: "Jour",
      vehicule: "Camion JMC",
      mat: "04413-316-15",
      prix: "4500,00",
      debutPeriode: "21/06/2023",
      finPeriode: "20/07/2023",
    },
  ]);
  const [produit, useProduit] = useState({
    nom: "LOCATION D'UN (01) CAMION LEGER SANS CHAUFFEUR.",
    unitee: "Jour",
    vehicule: "Camion JMC",
    mat: "04413-316-15",
    prix: "4500,00",
    debutPeriode: "21/06/2023",
    finPeriode: "20/07/2023",
  });
  return (
    <div className="flex justify-center py-10">
      <div className="bloc gap-20">
        <img alt="con" src={require("../img/contract.png")} />
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col my-10 gap-4 justify-start items-start">
            <div className="flex flex-col items-start gap-5 mb-10 justify-start">
              <div className="flex justify-start items-start gap-20">
                <div>Client</div>
                <div className="flex justify-center items-center gap-5">
                  <select value={selectedClient} onChange={handleClientChange}>
                    <option value="">Sélectionnez une option</option>
                    {AllClients.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-red-500"> {selectedClient}</p>
            </div>
            <div className="flex flex-col items-start gap-5 mb-10 justify-start">
              <div className="flex justify-center items-center gap-20">
                <div>Produit</div>
                <div className="flex justify-center items-center gap-5">
                  <select
                    value={selectedProduct}
                    onChange={handleProductChange}
                  >
                    <option value="">Sélectionnez une option</option>
                    {Products.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-red-500"> {selectedProduct}</p>
            </div>
          </div>
          <Link className="mt-20 text-red-500" to="/facture">
            Valider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
