const isDebug = true
  ? document.location.search.split("debug=")[1].split("&")[0] === "true"
  : false;
