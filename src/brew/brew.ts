const tdsInput: HTMLInputElement = document.getElementById(
  "tds",
) as HTMLInputElement;

const massInput: HTMLInputElement = document.getElementById(
  "mass",
) as HTMLInputElement;

const doseInput: HTMLInputElement = document.getElementById(
  "dose",
) as HTMLInputElement;

const result = document.getElementById("result");

let extractionYield: number;

const form = document.querySelector("form");

if (!form) {
  throw new Error("Calculation form not found.");
}

if (!result) {
  throw new Error("Result not found.");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dose = doseInput.valueAsNumber;
  const tds = tdsInput.valueAsNumber;
  const mass = massInput.valueAsNumber;

  extractionYield = (tds * mass) / dose;

  result.textContent = extractionYield.toString();
});
