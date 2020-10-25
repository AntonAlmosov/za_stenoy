export const addMiddlename = (author, nameIsInTitle) => {
  if(nameIsInTitle){
  const splittedName = author.title
    .split(" ")
    .filter((name) => (name === "undefined" ? false : true));
  if (author.middlename !== null && author.middlename !== '')
    splittedName.splice(1, 0, author.middlename || "");
  return splittedName.join(' ')
}
const splittedName = author.name
    .split(" ")
    .filter((name) => (name === "undefined" ? false : true));
  if (author.middlename !== null && author.middlename !== '')
    splittedName.splice(1, 0, author.middlename || "");
  return splittedName.join(' ')
}