export const referenceHtml = (entity) => {
  console.log(entity);

  let key =  Math.random()*100000;
  let num = "1 reference";
  if (Array.isArray(entity)) {
    num = `${entity.length} references`;
  }

  
  let html = `
  <div class="reference accordion" style="--bs-accordion-btn-padding-y: 5px;--bs-accordion-border-width: 0px;" id="accordionFlushExample">
    <div class="accordion-item">
      <h6 class="accordion-header">
        <button class="accordion-button btn-sm collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${key.toFixed(0)}" aria-expanded="false" aria-controls="flush-collapseOne">
          ${num}
        </button>
      </h6>
      <div id="collapse${key.toFixed(0)}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body"> `;

  if (Array.isArray(entity)) {
    entity.forEach((reference) => {
     
      html += `<div class="reference-individual">${entity.id}</div>`
    });
  } else {
   
    html += `<div class="reference-individual">${entity.id}</div>`
  }
    html += ` </div> </div></div> </div>`
    return html;
  };