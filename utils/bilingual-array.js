export const DisplayList = (list) => {
  var html = "";
  if (Array.isArray(list)) {
    list.forEach((item) => {
      if (item.name != undefined) {
      html += `${item.name.fr || item.name.en || ""} (${item.uri.split('/').at(-1)}) <br>  `;
    }
    });
  
  } else {
    html += `${list?.fr || list?.en ||  list?.["@none"] + " (missing lang)" || ""}   `;
  }

  return html;
};
