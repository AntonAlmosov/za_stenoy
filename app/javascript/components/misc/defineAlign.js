export default (data) => {
  const settings = ["alignLeft", "alignCenter", "alignRight", "alignJustify", "textIdent"];
  let choosenTune = "";
  settings.forEach((tune) => {
    if (data[tune]) {
      choosenTune = tune;
    }
  });
  return choosenTune;
};
