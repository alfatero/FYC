// scripts.js

// Filtrage des conférences sur conferences.html
function filterConfs() {
  var titleInput = document.getElementById("searchInput").value.toLowerCase();
  var themeInput = document.getElementById("themeInput").value.toLowerCase();
  var lieuInput = document.getElementById("lieuInput").value.toLowerCase();
  var dateInput = document.getElementById("dateInput").value;

  var cards = document.getElementsByClassName("conf-card");
  
  for (var i = 0; i < cards.length; i++) {
    // Dans <p> data-theme, data-lieu, data-date
    var pElement = cards[i].getElementsByTagName("p")[0];
    var confTitle = cards[i].getElementsByTagName("h2")[0].innerText.toLowerCase();
    var confTheme = pElement.getAttribute("data-theme") || "";
    var confLieu = pElement.getAttribute("data-lieu") || "";
    var confDate = pElement.getAttribute("data-date") || "";

    // Vérification titre
    var matchTitle = (confTitle.indexOf(titleInput) !== -1);
    // Vérification thème
    var matchTheme = (confTheme.toLowerCase().indexOf(themeInput) !== -1);
    // Vérification lieu
    var matchLieu = (confLieu.toLowerCase().indexOf(lieuInput) !== -1);
    // Vérification date
    var matchDate = true;
    if (dateInput) {
      matchDate = (confDate === dateInput);
    }

    if (matchTitle && matchTheme && matchLieu && matchDate) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

// Ajout d'une conférence (organisateur.html) au localStorage
function addConference(event) {
  event.preventDefault();
  
  var titre = document.getElementById("titre").value;
  var date = document.getElementById("date").value;
  var lieu = document.getElementById("lieu").value;
  var theme = document.getElementById("theme").value;
  var description = document.getElementById("description").value;
  var type = document.getElementById("type").value;

  // Construire un objet conférence
  var newConf = {
    titre: titre,
    date: date,
    lieu: lieu,
    theme: theme,
    description: description,
    type: type
  };

  // Récupérer la liste existante de confs
  var existingConfs = JSON.parse(localStorage.getItem("myConfs") || "[]");
  // Ajouter la nouvelle conf
  existingConfs.push(newConf);
  // Sauvegarder
  localStorage.setItem("myConfs", JSON.stringify(existingConfs));

  // Afficher dans la section "Mes conférences publiées"
  displayMyConfs();

  // Reset form
  document.querySelector(".conf-form").reset();
}

function displayMyConfs() {
  var container = document.getElementById("myConfList");
  if (!container) return; // si on n'est pas sur organisateur.html, ne rien faire
  
  var confs = JSON.parse(localStorage.getItem("myConfs") || "[]");
  
  if (confs.length === 0) {
    container.innerHTML = "<p>Aucune conférence pour le moment.</p>";
    return;
  }
  
  // Générer le HTML
  var html = "";
  confs.forEach(function(conf, index){
    html += '<div class="conf-card">';
    html += '<h2>' + conf.titre + '</h2>';
    html += '<p>Date: ' + conf.date + ' | Lieu: ' + conf.lieu + '</p>';
    html += '<p>Thème: ' + conf.theme + ' | Type: ' + conf.type + '</p>';
    html += '<p>' + conf.description + '</p>';
    html += '</div>';
  });
  
  container.innerHTML = html;
}

// Appeler displayMyConfs() sur organisateur.html
document.addEventListener("DOMContentLoaded", function(){
  displayMyConfs();
});

// Menu burger
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const topNav = document.getElementById("top-nav");

  if (menuToggle && topNav) {
    menuToggle.addEventListener("click", () => {
      topNav.classList.toggle("open");
    });
  }
});
