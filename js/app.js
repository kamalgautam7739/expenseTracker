
import { form, filterForm,editForm,resetFilter,limitForm,dateElem,fromDateElem,toDateElem,editDateElem,limitDayElem,limitMonthElem } from "./uiElements.js"
import Amount from "./Amount.js"
import {getnewId, addAmounts, initializeSite,store, editItem,filterForms,resetingFilter,setLimits} from "./store.js"
import render from "./renderTable.js"

//seting max limit for date selection
{
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth()+1;
let day = date.getDate();
month = month<10?"0"+month:month;
day=day<10?"0"+day:day;
date = `${year}-${month}-${day}`
dateElem.setAttribute("max",date)
fromDateElem.setAttribute("max",date)
toDateElem.setAttribute("max",date)
editDateElem.setAttribute("max",date)
}
//Placeholder daily and monthly limit 


initializeSite();
 render();
 {
    limitDayElem.value=store.limit.dailyLimit
    limitMonthElem.value=store.limit.monthlyLimit
    }

form.addEventListener("submit",(event)=>
{
    event.preventDefault();
    let {amount,type,amount_category,date,description} = form.elements;
    let newDataItem = new Amount(amount.value,type.value,amount_category.value,date.value,description.value,getnewId())
    addAmounts(newDataItem)
    form.reset();
    render();

   
})


editForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    let{id,amount_edit,type_edit,amount_category_edit,date_edit,description_edit}=editForm.elements;
    editItem(id.value,amount_edit.value,type_edit.value,amount_category_edit.value,date_edit.value,description_edit.value)

})
filterForm.addEventListener("submit",(event)=> {
    event.preventDefault()
    let {filter_date_from,filter_date_to,type_filter,amount_category_filter,description_filter}=filterForm.elements;
    
  
    filterForms((filter_date_from.value) ? filter_date_from.value : null,(filter_date_to.value) ? filter_date_to.value : null,(type_filter.value) ? type_filter.value : null,(amount_category_filter.value) ? amount_category_filter.value : null,(description_filter.value) ? description_filter.value : null)
    
    //  filterForms(filter_date_from.value || null,filter_date_to.value || null,type_filter.value|| null,amount_category_filter.value || null,description_filter.value || null)
   
})

resetFilter.addEventListener("click",()=>{
    resetingFilter();
    filterForm.reset();
})


limitForm.addEventListener(("submit"),(event)=>{
    event.preventDefault()
    let{daily_limits,monthly_limits}=limitForm.elements;
    setLimits(daily_limits.value,monthly_limits.value);
    
})
