const users = [
{ id: 1, name: "Mari", age: 22, active: true },
{ id: 2, name: "Jüri", age: 17, active: false },
{ id: 3, name: "Kati", age: 31, active: true },
{ id: 4, name: "Martin", age: 19, active: false },
{ id: 5, name: "Laura", age: 26, active: true }
]

const activeUsers = users.filter(user => user.active);

console.log(activeUsers);