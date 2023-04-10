
import { QueryUrl } from "./api.js";
import "./statement.js";
import "./rdf-link.js";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);


if (urlParams.get("adid")) {
  document.getElementById('adid').innerHTML = urlParams.get("adid");
  view(urlParams.get("adid"));
}

async function view(adid) {
  
  const main = document.querySelector("main");

  const payload = {
    format: "json",
    frame: "viewer/viewer",
    sparql: "viewer/viewer",
    adid: adid
  };

  const urlParams = new URLSearchParams(payload);
  const url = `${QueryUrl}?${urlParams}`;
  console.log(url);
  const res = await fetch(url);
  const json = await res.json();

  // const displayQuery = document.querySelector("query");
  // displayQuery.innerHTML = json.data.length + " Results" ;


  console.log(json);
  const entity = json.data[0]
  const keys = Object.keys(entity);
  keys.forEach((key, index) => {
    if (key != "id") {
      const el = document.createElement("statement-component");
      el.entity =  [key, entity[key]];
      main.appendChild(el);
    }
      
  });

 
}
