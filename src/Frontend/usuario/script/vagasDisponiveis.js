let userId = document.cookie.split("=")[1];

const criarCard = (index) => {
  $("#cards").append(`
  <div class="cardContainer">
    <h1 id="jobTitle${index}" class="jobTitle"></h1>
    <div class="descriptionBx">
      <h3>Descrição da Vaga</h3>
      <p id="description${index}" class="description"></p>
    </div>
    <div class="jobTypeBx">
      <h3>Tipo de trabalho</h3>
      <p id="jobType${index}" class="jobType"></p>
    </div>
    <div class="jobTimeBx">
      <h3>Turno</h3>
      <p id="jobTime${index}" class="jobTime"></p>
    </div>
    <div class="jobLocationBx">
      <h3>Local da vaga</h3>
      <p id="jobLocation${index}" class="jobLocation"></p>
    </div>
    <div class="hardSkillsBx">
      <h3>Hard Skills</h3>
      <p id="hardSkills${index}" class="hardSkills"></p>
    </div>
    <div class="matchBx">
      <h3>Match</h3>
      <p id="porcentagem${index}" class="porcentagem"></p>
    </div>
    <div class="btnBx">
      <button href="" type="button" class="btn btn-warning shadowBtn" onclick="apply(${arrVagas[i].id})"> Aplicar </button>
      <button
        type="button"
        class="btn btn-warning shadowBtn"
      >
        Ver Empresa
      </button>
   
  </div>
</div>`);
};

const getVagas = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/puxarVagas");
  const data = await response.json();
  return data;
};

const sendApply = (ID) => {
  infos = { userid: userId, vagaid: ID };
  alert(JSON.stringify(infos));
  const parameters = {
    method: "POST",
    body: JSON.stringify(infos),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://127.0.0.1:3030/api/apply", parameters);
};

getVagas().then((arrVagas) => {
  alert(JSON.stringify(arrVagas));
  for (let i in arrVagas) {
    let vaga = arrVagas[i];
    console.log(vaga);
    criarCard(i);
    $(`#jobTitle${i}`).text(vaga.jobTitle);
    $(`#jobType${i}`).text(vaga.jobType);
    $(`#jobTime${i}`).text(vaga.jobTime);
    $(`#hardSkills${i}`).text(vaga.hardSkills);
    $(`#porcentagem${i}`).text(vaga.porcentagem);
  }
});

//função executada quando o user clica para apllicar em uma vaga
const apply = (IDVaga) => {
  alert("USUario aplicou para a vaga " + IDVaga);
  sendApply(IDVaga);
};
