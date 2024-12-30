// script.js

// Mock data
const validRegNumbers = ["KU001", "KU002", "KU003"];
const elections = [
  { id: 1, name: "Student Council Election" },
  { id: 2, name: "Class Representative Election" },
];
const candidates = {
  1: [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Smith" }],
  2: [{ id: 3, name: "Alice Brown" }, { id: 4, name: "Bob White" }],
};

// DOM elements
const pages = document.querySelectorAll(".page");
const loginForm = document.getElementById("login-form");
const regNumberInput = document.getElementById("reg-number");
const loginError = document.getElementById("login-error");
const electionList = document.getElementById("election-list");
const candidateList = document.getElementById("candidate-list");
const voteForm = document.getElementById("vote-form");
const referenceNumber = document.getElementById("reference-number");

// Helper functions
function showPage(id) {
  pages.forEach((page) => page.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function generateRandomRef() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Event listeners
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const regNumber = regNumberInput.value.trim();
  if (validRegNumbers.includes(regNumber)) {
    showPage("election-page");
    loadElections();
  } else {
    loginError.textContent = "Invalid Registration Number!";
  }
});

function loadElections() {
  electionList.innerHTML = "";
  elections.forEach((election) => {
    const li = document.createElement("li");
    li.textContent = election.name;
    li.addEventListener("click", () => {
      showPage("voting-page");
      loadCandidates(election.id);
    });
    electionList.appendChild(li);
  });
}

function loadCandidates(electionId) {
  candidateList.innerHTML = "";
  candidates[electionId].forEach((candidate) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="radio" name="candidate" value="${candidate.id}" id="candidate-${candidate.id}">
      <label for="candidate-${candidate.id}">${candidate.name}</label>
    `;
    candidateList.appendChild(li);
  });

  voteForm.onsubmit = (e) => {
    e.preventDefault();
    const selected = document.querySelector("input[name='candidate']:checked");
    if (selected) {
      referenceNumber.textContent = generateRandomRef();
      showPage("thank-you-page");
    } else {
      alert("Please select a candidate!");
    }
  };
}

// Initial page
showPage("login-page");
