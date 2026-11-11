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

  //input validation
  const valid =
    Number.isFinite(dose) &&
    dose > 0 &&
    dose < 5000 &&
    Number.isFinite(tds) &&
    tds > 0 &&
    tds <= 5 &&
    Number.isFinite(mass) &&
    mass > 0 &&
    mass <= 5000;

  if (valid) {
    extractionYield = (tds * mass) / dose;

    result.textContent = extractionYield.toString();
  } else {
    throw new Error(
      "One of the inputs (tds, dose, mass) is not a valid number based on expected brew values",
    );
  }
});
