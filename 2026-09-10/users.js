const users = [
{ id: 1, name: "Mari", age: 22, active: true, address: { city:"Tallinn"} },
{ id: 2, name: "Jüri", age: 17, active: false },
{ id: 3, name: "Kati", age: 31, active: true },
{ id: 4, name: "Martin", age: 19, active: false },
{ id: 5, name: "Laura", age: 26, active: true }
]

console.log("3.1.: ", users);

const activeUsers = users.filter(user => user.active);
console.log("3.2.: ", activeUsers);

const adultUsers = users.filter(user => user.age >= 18);
console.log("3.3.: ", adultUsers);

const userNames = users.map(user => user.name);
console.log("3.4.: ", userNames);

const thirdIdUser = users.find(user => user.id === 3);
console.log("3.5.: ", thirdIdUser);

function getUserStatus(user) {
    if (user.active == true) {
        return "Aktiivne";
    } else {
        return "Mitteaktiivne";
    }
}
console.log("3.6.: ", getUserStatus(users[0]));

const getGreeting = (user) => {
    return `Tere, ${user.name}! Sa oled ${user.age} aastat vana.`;
}
console.log("3.7.: ", getGreeting(users[2]));

const {name, age} = users[2];
console.log("3.8.: ", `Kasutaja nimi on ${name} ja ta on ${age} aastat vana.`);

const newUser = { id: 6, name: "Karl", age: 24, active: true };
const updatedUsers = [...users, newUser];
console.log("3.9.: ", updatedUsers);

console.log("3.10.: ", users[0].address?.city ?? "Linn puudub");

console.log("3.11.:");
users.forEach(user => {
    console.log(`${user.name} - ${user.active ? "Aktiivne" : "Mitteaktiivne"}`);
});

console.log("3.12.:", users.sort((a, b) => a.age - b.age));