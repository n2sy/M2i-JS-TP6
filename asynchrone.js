fetch("http://localhost:3000/tasks/2")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("Erreur avec FETCH");
  });
// fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then((res) => {
//     console.log(res);
//     res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     document.getElementById("result").innerHTML = `
//     <h2>${data.name}</h2>
//     <p>${data.email}</p>`;
//   })
//   .catch((err) => {
//     console.log("Erreur avec FETCH");
//   });

// let p = new Promise((resolve, reject) => {
//   let a = prompt("Veuillez saisir un entier");
//   setTimeout(() => {
//     if (Number(a) > 10) resolve("Bon choix");
//     else reject(new Error("Mauvais choix"));
//   }, 2000);
// });

// p.then((result) => {
//   console.log("Damien reçoit ", result);
// }).catch((err) => {
//   console.log("Damien error", err.toString());
// });
