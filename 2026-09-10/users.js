const users = [
{ id: 1, name: "Mari", age: 22, active: true, address: { city:"Tallinn"} }, // Lisatud aadress 3.10. täitmiseks
{ id: 2, name: "Jüri", age: 17, active: false },
{ id: 3, name: "Kati", age: 31, active: true },
{ id: 4, name: "Martin", age: 19, active: false },
{ id: 5, name: "Laura", age: 26, active: true }
]

console.log("3.1.: ", users); // Kuvab kõik kasutajad

const activeUsers = users.filter(user => user.active); // Filtreerib aktiivsed kasutajad uude massiivi
console.log("3.2.: ", activeUsers);

const adultUsers = users.filter(user => user.age >= 18); // Kontrollib, kas kasutaja on üle 18-aastane ja lisab need uude massiivi
console.log("3.3.: ", adultUsers);

const userNames = users.map(user => user.name); // Loob uue massiivi kasutajate nimedega
console.log("3.4.: ", userNames);

const thirdIdUser = users.find(user => user.id === 3); // Otsib kasutajat, kelle id on 3
console.log("3.5.: ", thirdIdUser);

function getUserStatus(user) { // Funktsioon, mis tagastab kasutaja staatuse
    if (user.active == true) { // Kontrollib, kas kasutaja on aktiivne
        return "Aktiivne"; // Kui on, tagastab "Aktiivne"
    } else { 
        return "Mitteaktiivne"; // Kui pole, tagastab "Mitteaktiivne"
    }
}
console.log("3.6.: ", getUserStatus(users[0]));

const getGreeting = (user) => { // Noolfunktsioon, mis tagastab kasutaja tervituse
    return `Tere, ${user.name}! Sa oled ${user.age} aastat vana.`; // Tagastab tervituse koos kasutaja nime ja vanusega
}
console.log("3.7.: ", getGreeting(users[2]));

const {name, age} = users[2]; // Destruktureerimine, et saada kasutaja nimi ja vanus
console.log("3.8.: ", `Kasutaja nimi on ${name} ja ta on ${age} aastat vana.`);

const newUser = { id: 6, name: "Karl", age: 24, active: true }; // Uue kasutaja objekt
const updatedUsers = [...users, newUser]; // Loob uue massiivi, kus on eelmine massiiv ja uus kasutaja
console.log("3.9.: ", updatedUsers);

console.log("3.10.: ", users[0].address?.city ?? "Linn puudub"); // Kuvab aadressi, kui on olemas

console.log("3.11.:");
users.forEach(user => { // Käib läbi kõik kasutajad
    console.log(`${user.name} - ${user.active ? "Aktiivne" : "Mitteaktiivne"}`); // Kuvab kasutaja nime ja staatuse
});

console.log("3.12.:", users.sort((a, b) => a.age - b.age)); // Sorteerib kasutajad vanuse järgi kasvavas järjekorras