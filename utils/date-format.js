export const DateFormat = (event) => {

  const dateTimeOptions = { 
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const locale = "en-CA";

  const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
    ...dateTimeOptions,
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Montreal",
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    ...dateTimeOptions,
    timeZone: "UTC",
  });

  var html = "";
  if (event) {
    if (event.length > 10) {
      html += dateTimeFormatter.format(new Date(event));
    } else {
      html += dateFormatter.format(new Date(event));
    }
  }
 
   
  return html;
};
