let input1 = document.getElementById("i1");
let rowContainer = document.getElementById("r1");
let addNotesButton = document.getElementById("but1");
let saveButton = document.getElementById("s1");
let searchEl = document.getElementById("se1");

function getLocal() {
    if (localStorage.getItem("notes") === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem("notes"));
    }
}

function searchNotes(event) {
    if (event.key === "Enter" && event.target.value !== "") {
        let ps;
        for (let j of con) {
            if (j.inputQ.startsWith(event.target.value)) {
                ps = document.getElementById(j.unique1);
                ps.style.backgroundColor = "green";
            } else if (j.inputQ.startsWith(event.target.value) === false) {
                ps = document.getElementById(j.unique1);
                ps.style.backgroundColor = "white";
            }

        }
    }
}
searchEl.addEventListener("keydown", searchNotes);


let con = getLocal();
let item = con.length;
console.log(con)

function deleteItem(l) {
    let m = con.findIndex(function(y) {
        if (y.unique === l) {
            return true;
        } else {
            return false;
        }
    });
    con.splice(m, 1);
}

function buildNotes(x) {
    let uniqId = x.unique;
    let uniqId1 = x.unique1;
    let item1 = document.createElement("div");
    item1.classList.add("col-6", "c1");
    item1.id = uniqId1;
    rowContainer.appendChild(item1);

    let item2 = document.createElement("h1");
    item2.id = uniqId;
    item2.classList.add("head");
    item2.textContent = x.inputQ;
    item1.appendChild(item2);

    let item3 = document.createElement("button");
    item3.classList.add("btn", "btn-primary");
    item3.textContent = "delete";
    item3.onclick = function() {
        rowContainer.removeChild(item1);
        deleteItem(uniqId);
    };
    item1.appendChild(item3);

}
for (let i of con) {
    buildNotes(i);
}

function addNotes() {
    item = item + 1;
    let newItem = {
        unique: "p" + item,
        unique1: "x" + item,
        inputQ: input1.value
    };
    con.push(newItem);
    input1.value = "";
    buildNotes(newItem);
}
addNotesButton.addEventListener("click", addNotes);

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(con));
}
saveButton.addEventListener("click", saveNotes);