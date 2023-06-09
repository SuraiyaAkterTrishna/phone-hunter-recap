const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones , dataLimit) => {
  //   console.log(phones);
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = '';

  //   display only 10 phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

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
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });

  //   stop loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
  };

// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

// search input field enter key handler 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
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

// not the best way to load show all data
document
  .getElementById("btn-show-all").addEventListener("click", function () {
    processSearch();
  });

// phone details 
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = (phone) => {
    // console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "No Release Date Found.."}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No Storage Information found"}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : "No bluetooth information"}</p>
    `;
}
// loadPhones('iphone');
