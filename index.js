import "./place-vignette.js";
import "./people-org-vignette.js";
import "./event-vignette.js";
import { QueryUrl } from "./Api.js";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

let i = 0;
if (urlParams.get("class") == "schema:Event") {
  i = 0;
} else if(urlParams.get("class") == "schema:Place") {
  i = 1;
} else if(urlParams.get("class") == "schema:Person") {
  i = 2;
} else if(urlParams.get("class") == "schema:Organization") {
  i = 3;
}
document.getElementById('class').selectedIndex  = i

if (urlParams.get("graph")) {
  document.getElementById('graphUri').value = urlParams.get("graph");
  searchMintPotential(urlParams.get("graph"), urlParams.get("class"));
}

function custom_sort(a, b) {
  return new Date(a.startDate["@value"]).getTime() - new Date(b.startDate["@value"]).getTime();
}

async function searchMintPotential(graph, classToMint) {
  document.getElementById("buttonSpinner").classList.remove("visually-hidden");
  document.getElementById("buttonReady").classList.add("visually-hidden");

  const main = document.querySelector("main");



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
    limit: 100,
  };
  const urlParams = new URLSearchParams(payload);
  const url = `${QueryUrl}?${urlParams}`;
  console.log(url);
  const res = await fetch(url);
  const json = await res.json();

  if (classToMint == "schema:Event") {
    console.log("sorting...")
    json.data = json.data.sort(custom_sort)
  }

  const displayQuery = document.querySelector("query");
  displayQuery.innerHTML = json.data.length + " Results" ;


  console.log(json);
  json.data.forEach((entity) => {
      const el = document.createElement(vignette);
      el.entity = entity;
      main.appendChild(el);
  });

  document.getElementById("buttonSpinner").classList.add("visually-hidden");
  document.getElementById("buttonReady").classList.remove("visually-hidden");
}
