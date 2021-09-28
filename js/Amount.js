import { deleteItem } from "./store.js";
import {initializeModalForm} from "./renderTable.js"
export default class Amount{ 
    constructor(amount,type,amount_category,date,description,id){
        this.id = id;
        this.amount=amount
        this.type=type
        this.amount_category=amount_category
        this.date=new Date(date)
        this.description=description
    }
    addDataToTable(){
        let tableRow=document.createElement("tr")
        if(this.type=="Income"){
            tableRow.classList.add("bg-success")
        }
        else{
            tableRow.classList.add("bg-danger")
        }
        tableRow.innerHTML=`
        <td>${this.id}</td>
        <td>${this.type}</td>
        <td>${this.amount_category}</td>
        <td>${this.description}</td>
        <td>NRS ${this.amount}</td>
        <td>${this.date.toDateString()}</td>`
        
        let editButton = document.createElement("button")
        editButton.classList.add("btn",  "btn-outline-light")
        editButton.innerText="Edit"
        editButton.addEventListener("click",(event)=> {
           
            // let {amount,type,amount_category,date,description} = event.target.parent.parent.elements;
            // console.log(amount.value,type.value,amount_category.value,date.value,description.value)
            initializeModalForm(this.id)
        })
        let edit_tableData = document.createElement("td")
        edit_tableData.appendChild(editButton)
        tableRow.appendChild(edit_tableData);
            

        let deleteButton = document.createElement("button")
        deleteButton.classList.add("btn",  "btn-outline-light")
        deleteButton.innerText="Delete"
        deleteButton.addEventListener("click",(event)=>
    {
        deleteItem(this.id)
    })
    let tableData = document.createElement("td")
    tableData.appendChild(deleteButton)
    tableRow.appendChild(tableData);
        
        return tableRow;
    }
}