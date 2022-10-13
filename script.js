// ini API nya
let api_key = "e55f1d1d76eef97665e9fa685e42e012";
let img_url = "https://image.tmdb.org/t/p/w500";
let discover = "https://api.themoviedb.org/3/discover/movie?";
let search = "https://api.themoviedb.org/3/search/movie?";
// Example API Request
// https://api.themoviedb.org/3/movie/550?api_key=e55f1d1d76eef97665e9fa685e42e012

let currentPage = 1;
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const searchbar = document.getElementById("search");
currentPage == 1 ? (prev.style.visibility = "hidden") : (prev.style.visibility = "");
//main prev
prev.onclick = () => {
  search_term = searchbar.value.toLowerCase();
  if (search_term != "") {
    currentPage--;
    search_term = searchbar.value.toLowerCase();
    if (currentPage == 0) {
      currentPage = 1;
    }
    currentPage == 1 ? (prev.style.visibility = "hidden") : (prev.style.visibility = "");
    // Jika search bar tidak memiliki value
    search_term = searchbar.value.toLowerCase();
    if (search_term == "") {
      return false;
    }
    // get data
    fetch(
      search +
        new URLSearchParams({
          api_key: api_key,
          query: search_term,
          page: currentPage,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        makeElement(data);
        if (currentPage != data.total_pages) {
          next.style.visibility = "";
        }
      });
  } else {
    currentPage--;
    if (currentPage == 0) {
      currentPage = 1;
    }
    currentPage == 1 ? (prev.style.visibility = "hidden") : (prev.style.visibility = "");
    // Jika search bar tidak memiliki value
    search_term = searchbar.value.toLowerCase();
    if (search_term != "") {
      return false;
    }

    // get data
    fetch(
      discover +
        new URLSearchParams({
          api_key: api_key,
          sort_by: "popularity.desc",
          page: currentPage,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        makeElement(data);
      });
  }
};

//Next Button
next.onclick = () => {
  search_term = searchbar.value.toLowerCase();
  if (search_term != "") {
    currentPage++;
    search_term = searchbar.value.toLowerCase();
    currentPage > 1 ? (prev.style.visibility = "") : (prev.style.visibility = "hidden");

    fetch(
      search +
        new URLSearchParams({
          api_key: api_key,
          query: search_term,
          page: currentPage,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        makeElement(data);
        if (currentPage == data.total_pages) {
          next.style.visibility = "hidden";
        }
      });
  } else {
    currentPage++;
    search_term = searchbar.value.toLowerCase();
    currentPage > 1 ? (prev.style.visibility = "") : (prev.style.visibility = "hidden");

    fetch(
      discover +
        new URLSearchParams({
          api_key: api_key,
          sort_by: "popularity.desc",
          page: currentPage,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        makeElement(data);
      });
  }
};

// get main data
fetch(
  discover +
    new URLSearchParams({
      api_key: api_key,
      sort_by: "popularity.desc",
      page: currentPage,
    })
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    makeElement(data);
  });

searchbar.addEventListener("keyup", (event) => {
  search_term = event.target.value.toLowerCase();
  currentPage = 1;
  // menghendel jika search bar kosong
  if (search_term == "") {
    fetch(
      discover +
        new URLSearchParams({
          api_key: api_key,
          sort_by: "popularity.desc",
          page: currentPage,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        makeElement(data);
      });
  } else {
    fetch(
      search +
        new URLSearchParams({
          api_key: api_key,
          query: search_term,
          page: currentPage,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.total_pages);
        makeElement(data);
        if (currentPage != data.total_pages) {
          next.style.visibility = "";
        }
        if (currentPage == data.total_pages) {
          next.style.visibility = "hidden";
        }
        currentPage == 1 ? (prev.style.visibility = "hidden") : (prev.style.visibility = "");
      });
  }
});

// ini cardnya
const makeElement = (data) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  data.results.forEach((item, i) => {
    let tanggal = item.release_date.split("-");
    var month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let bulan = month.find((item, index) => index + 1 == tanggal[1]);
    main.innerHTML += `
    <div class="card-movie">
    <div class="card-img"></div>
    <img src="${item.poster_path != null ? img_url + item.poster_path : ""}" alt="Image Not Found" />
    <div class="card-info">
    <p class="judul">${item.original_title}</p>
    
    <p class="tanggal">${`${tanggal[2]} ${bulan},  ${tanggal[0]}`}</p>
    <p class="rating"> <iconify-icon icon="bxs:star" style="color: black; margin-right:5px;"></iconify-icon>
    ${item.vote_average}</p>
    </div>
    </div>
    `;
  });
};
