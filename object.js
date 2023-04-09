import { referenceHtml } from "./reference.js";

export const objectHtml = (entity) => {
  let html = "";
  if (entity.constructor.name === "Object") {
    const keys = Object.keys(entity);
    if (keys.length > 0) {
      html += `<div class="statement-object">`;
    }

    keys.forEach((key, index) => {
      if (key === "prov:wasDerivedFrom") {
        html += referenceHtml(entity[key]);
      } else {
        html += entity[key];
        if (index < keys.length - 1) { html += ": "; } 
      }
    });
    if (keys.length > 0) {
      html += `</div>`;
    }
  } else {
    if (entity[0] !== "_") {
      html += `
      <div class="statement-object">
        ${entity}
        </div>
    `;
    }
  }

  return html;
};
