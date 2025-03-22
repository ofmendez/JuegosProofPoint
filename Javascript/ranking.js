import {getAllUsers} from "../Javascript/database.js";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Pantalla de Ranking cargada");
    getAllUsers().then((users) => {
        console.log(users); 
        // users is an object
        const rankingList = document.getElementById('ranking-list');
        const sortedUsers = Object.values(users).sort((a, b) => {
          return gTotal(b) - gTotal(a);
        });

        
        const rankingItems = Object.values(sortedUsers).map((user, index) => {
          const total = gTotal(user)
            return `
              <tr>
                  ${getTag(index+1)}
                  <td>${user.name}</td>
                  <td>${total}</td>
              </tr>
            `;
        });
        rankingList.innerHTML = rankingItems.join('');
    });
});

function getTag(index){
    if(index == 1){
      return `<td class="posicion-top"><img src="../images/oro.svg" alt="1er lugar" class="ranking-icon"></td>`;
    }
    if(index == 2){
      return `<td class="posicion-top"><img src="../images/plata.svg" alt="2do lugar" class="ranking-icon"></td>`;
    }
    if(index == 3){
      return `<td class="posicion-top"><img src="../images/bronce.svg" alt="3er lugar" class="ranking-icon"></td>`;
    }
    return `<td>${index}</td>`;
}

function gTotal(user){
  const game1 = parseInt(user.g01) > 0 ? parseInt(user.g01) : 0;
  const game2 = parseInt(user.g02) > 0 ? parseInt(user.g02) : 0;
  const game3 = parseInt(user.g03) > 0 ? parseInt(user.g03) : 0;
  return game1 + game2 + game3;
}

function volverAlInicio() {
    window.location.href = "../index.html"; // Ajusta la ruta según la estructura del proyecto
}
