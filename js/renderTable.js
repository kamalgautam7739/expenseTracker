import { store } from "./store.js";
import { table_body,budgetAmount,incomeAmount,expenseAmount,editForm ,alertDiv} from "./uiElements.js";


export default function render(){

    if(store.isGreaterThanDailyLimit()[0]){
      
        let alertElem = document.createElement("div")
        alertElem.classList.add("alert" , "alert-danger")
        alertElem.setAttribute("role","alert")
        // If is written so many times inorder to execite this line in time
        alertDiv.innerHTML=""
        alertElem.innerText=`Daily limit exceed by ${store.isGreaterThanDailyLimit()[1]}`
        alertDiv.appendChild(alertElem)
    
    
    if(store.isGreaterThanMonthlyLimit()[0]){
        let alertElem = document.createElement("div")
        alertElem.classList.add("alert" , "alert-danger")
        alertElem.setAttribute("role","alert")
        alertElem.innerText=`Monthly limit exceed by ${store.isGreaterThanMonthlyLimit()[1]}`
        alertDiv.appendChild(alertElem)
    }
}
if(store.isGreaterThanMonthlyLimit()[0]){
    let alertElem = document.createElement("div")
    alertElem.classList.add("alert" , "alert-danger")
    alertElem.setAttribute("role","alert")
    alertDiv.innerHTML=""
    alertElem.innerText=`Monthly limit exceed by ${store.isGreaterThanMonthlyLimit()[1]}`
    alertDiv.appendChild(alertElem)

    if(store.isGreaterThanDailyLimit()[0]){
      
        let alertElem = document.createElement("div")
        alertElem.classList.add("alert" , "alert-danger")
        alertElem.setAttribute("role","alert")  
        alertElem.innerText=`Daily limit exceed by ${store.isGreaterThanDailyLimit()[1]}`
        alertDiv.appendChild(alertElem)

    }
}



    if(!store.isGreaterThanDailyLimit()[0] && !store.isGreaterThanMonthlyLimit()[0]){
        let alertElem = document.createElement("div")
        alertElem.classList.add("alert" , "alert-success")
        alertElem.setAttribute("role","alert")
        alertDiv.innerHTML=""
        alertElem.innerText=`No limits Exceed`
        alertDiv.appendChild(alertElem)

    }


    let tIncome=store.getIncomeAmount();
    let tExpense = store.getExpenseAmount();
    let tBudget= store.getTotalAmount(tIncome,tExpense);
    budgetAmount.innerText=`${tBudget}`
    incomeAmount.innerText=`${tIncome}`
    expenseAmount.innerText=`${tExpense}`
    table_body.innerHTML="";
    store.getFilteredData().forEach(element => {
    let elementToAppend = element.addDataToTable();
    table_body.appendChild(elementToAppend)

});
}

export function initializeModalForm(id){
    $('#exampleModalCenter').modal("toggle")
    let dataToInitialize = store.amount.find((value)=>{
        return value.id == id;
    }
    )
    editForm.id.value=dataToInitialize.id;
   
    editForm.amount_edit.value=dataToInitialize.amount;
    editForm.type_edit.value=dataToInitialize.type;
    editForm.amount_category_edit.value=dataToInitialize.amount_category;
    let year=dataToInitialize.date.getFullYear()
    let month=dataToInitialize.date.getMonth()+1
    let day = dataToInitialize.date.getDate()
    //Making date as it is represented in the form
    editForm.date_edit.value=`${year}-${month<10 ? "0"+month : month}-${day<10 ? "0"+day : day}`
    editForm.description_edit.value=dataToInitialize.description;
    
}
