const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};
const displayPhones = (phones) => {
  //   console.log(phones);
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerHTML = ``;
  //   display only 10 phones
  phones = phones.slice(0, 10);
  // no phone message
  const noMessage = document.getElementById("no-message");
  if (phones.length === 0) {
    noMessage.classList.remove("d-none");
  } else {
    noMessage.classList.add("d-none");
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Find here the list of all mobile phones brands of India and Worldwide, Also check latest smartphones from top & best company</p>
        </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
//   stop loader
toggleSpinner(false);
};
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);
});
// loading spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
// loadPhones();
