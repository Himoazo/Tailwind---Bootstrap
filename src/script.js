"use strict";

addEventListener("DOMContentLoaded", loadData); //Read data onload
window.onload = () => {
    document.getElementById("theForm").addEventListener("submit", formData);
}

const tailTable = document.getElementById("tail"); 

let frameArr = [];

//load saved rows
function loadData() {
    frameArr = [];  
    const tbody = tailTable.querySelector('tbody');
    tbody.innerHTML = ""; 

    frameArr = JSON.parse(localStorage.getItem("frameworkArr")) || []; // Get data from localStorage

     //Print data into tabel
    for (let [index, item] of frameArr.entries()) {
        const tr = tbody.insertRow();
        tr.insertCell(0).textContent = item.frameName;
        tr.insertCell(1).textContent = item.type;
        tr.insertCell(2).textContent = item.language;
        tr.insertCell(3).textContent = item.usage;

        
        //Delete button
        const newBtn = document.createElement("button");
        newBtn.classList.add("deleteRowBtn", "bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-1", "px-2", "rounded");
        newBtn.value = index;
        newBtn.textContent = "X";
        const btn = tr.insertCell(4);
        btn.appendChild(newBtn);

        //Delete Row
        newBtn.addEventListener("click", () => {
            frameArr.splice(newBtn.value, 1);
            localStorage.setItem("frameworkArr", JSON.stringify(frameArr));
            loadData();
        });
    }
}

// Data object
let frameObj = {
    frameName: "",
    type: "",
    language: "",
    usage: ""
};

//Add rows to table
function formData(event) {
    event.preventDefault(); 
    
    let nameFromForm = document.getElementById("frameWork").value;
    let typeFromForm = document.getElementById("type").value;
    let langFromForm = document.getElementById("lang").value;
    let usageFromForm = document.getElementById("usage").value;

    frameObj = {
        frameName: nameFromForm,
        type: typeFromForm,
        language: langFromForm,
        usage: usageFromForm
    }
    
    frameArr.push(frameObj);

    //Save and load data
    localStorage.setItem("frameworkArr", JSON.stringify(frameArr));
    loadData();
}

