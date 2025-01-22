const section = document.querySelector("#customscript + p");
if (section) {
  section.innerHTML = "This was injected by the customscript addon";
}
else {
  console.log("Skipping CustomScript: section was not found.");
}
