import "./entity-vignette.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get("graph")) {
  searchMintPotential(urlParams.get("graph"), urlParams.get("classToMint"));
}

async function searchMintPotential(graph, classToMint) {
  document.getElementById("buttonSpinner").classList.remove("visually-hidden");
  document.getElementById("buttonReady").classList.add("visually-hidden");

  const main = document.querySelector("main");
  // const api = "https://api.artsdata.ca/query";
  const api = "http://localhost:3003/query";
  const payload = {
    format: "json",
    frame: "footlight",
    sparql: "mint/places",
    graph: graph,
  };
  const urlParams = new URLSearchParams(payload);
  const url = `${api}?${urlParams}`;

  const res = await fetch(url);
  const json = await res.json();

  console.log(json);
  const displayQuery = document.querySelector("query");
  displayQuery.innerHTML =
    "Results for " + graph + "...";
  json.data.forEach((entity) => {
      const el = document.createElement("entity-vignette");
      el.entity = entity;
      main.appendChild(el);
  });

  document.getElementById("buttonSpinner").classList.add("visually-hidden");
  document.getElementById("buttonReady").classList.remove("visually-hidden");
}
