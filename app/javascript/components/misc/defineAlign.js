export default (data) => {
  const settings = ["alignLeft", "alignCenter", "alignRight"];
  let choosenTune = "";
  settings.forEach((tune) => {
    if (data[tune]) {
      choosenTune = tune;
    }
  });
  return choosenTune;
};
