import {objectHtml} from "./object.js";
import {objectReferenceHtml} from "./objectReference.js";

class Statement extends HTMLElement {
  set entity(entity) {
    let objHtml = "";
    const objects = entity[1]
    if (Array.isArray(objects)) {
      for (let i = 0; i < objects.length; i += 2) {
        objHtml += objectReferenceHtml([objects[i],objects[i + 1]])
      }
    } else {
        objHtml += objectHtml(objects);
    }

    this.innerHTML = `
    <div class="statement">
      <div class="statement-predicate">
      ${entity[0]}
      </div>
      <div class="statement-objects">
       ${objHtml}
      </div>
    </div>
    `;
  }
}
customElements.define("statement-component", Statement);
