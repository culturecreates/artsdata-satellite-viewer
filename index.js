import "./place-vignette.js";
import "./people-org-vignette.js";
import "./event-vignette.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get("graph")) {
  searchMintPotential(urlParams.get("graph"), urlParams.get("class"));
}

function custom_sort(a, b) {
  return new Date(a.startDate["@value"]).getTime() - new Date(b.startDate["@value"]).getTime();
}

async function searchMintPotential(graph, classToMint) {
  document.getElementById("buttonSpinner").classList.remove("visually-hidden");
  document.getElementById("buttonReady").classList.add("visually-hidden");

  const main = document.querySelector("main");

  // const api = "https://api.artsdata.ca/query";
  const api = "http://localhost:3003/query";


  let sparql, vignette, frame;

  if (classToMint === "schema:Place") {
    sparql = "mint/places";
    vignette = "place-vignette";
    frame="mint/footlight";
  } else if (classToMint === "schema:Person") {
    sparql = "mint/people";
    vignette = "people-org-vignette";
    frame="mint/footlight";
  } else if (classToMint === "schema:Organization") {
    sparql = "mint/organizations";
    vignette = "people-org-vignette";
    frame="mint/footlight";
  } else if (classToMint === "schema:Event") {
    sparql = "mint/events";
    vignette = "event-vignette";
    frame="mint/footlight_event";
  }

  const payload = {
    format: "json",
    frame: frame,
    sparql: sparql,
    graph: graph,
  };
  const urlParams = new URLSearchParams(payload);
  const url = `${api}?${urlParams}`;
  console.log(url);
  const res = await fetch(url);
  const json = await res.json();

  if (classToMint == "schema:Event") {
    console.log("sorting...")
    json.data = json.data.sort(custom_sort)
  }

  const displayQuery = document.querySelector("query");
  displayQuery.innerHTML = json.data.length + " Results for " + classToMint + "<br>in graph " + graph + "...";


  console.log(json);
  json.data.forEach((entity) => {
      const el = document.createElement(vignette);
      el.entity = entity;
      main.appendChild(el);
  });

  document.getElementById("buttonSpinner").classList.add("visually-hidden");
  document.getElementById("buttonReady").classList.remove("visually-hidden");
}
