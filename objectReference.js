import { referenceHtml } from "./reference.js";

export const objectReferenceHtml = (entityPair) => {
  let html = "";
  html += `<div class="statement-object">`;

  // object value

  let entity = entityPair[0];
  if (entity.constructor.name === "Object") {
    const keys = Object.keys(entity);
    keys.forEach((key, index) => {
      html += entity[key];
      if (index < keys.length - 1) {
        html += ": ";
      }
    });
  } else {
    if (entity[0] !== "_") {
      html += entity;
    }
  }

  // references or qualifiers
  entity = entityPair[1];
  if (entity.constructor.name === "Object") {
    const keys = Object.keys(entity);
    keys.forEach((key, index) => {
      if (key === "prov:wasDerivedFrom") {
        html += referenceHtml(entity[key]);
      } else if (Array.isArray(entity[key])) {
        html += "<p class='small-text'>" + key + " ";
        entity[key].forEach((qualifer) => {
          html += JSON.stringify(qualifer) + ", ";
        });
        html += "</p>";
      } else {
        html +=
          "<p class='small-text'>" +
          key +
          " " +
          JSON.stringify(entity[key]) +
          "</p>";
      }
    });
  } else {
    if (entity[0] !== "_") {
      html += entity;
    }
  }

  html += `</div>`;

  return html;
};
