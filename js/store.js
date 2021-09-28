import Amount from "./Amount.js";
import render from "./renderTable.js";


export let store = {
    amount: [],

    filter:{
        from:null,
        to:null,
        type:null,
        category:null,
        description:null
    },
    limit:{
        dailyLimit:0,
        monthlyLimit:0
    },
    getFilteredData(){
        let filterData=this.amount;
        if(this.filter.from){
         filterData = filterData.filter((value)=>{
            return value.date.getTime() >= this.filter.from.getTime();
        })
        }
        if(this.filter.to){
         filterData = filterData.filter((value)=>{
            return value.date.getTime() <= this.filter.to.getTime();
        })
        }
        if(this.filter.type){
         filterData = filterData.filter((value)=>{
            return value.type == this.filter.type
        })
        }
        if(this.filter.category){
         filterData = filterData.filter((value)=>{
            return value.amount_category == this.filter.category
        })
        }
        if(this.filter.description){
        filterData = filterData.filter((value)=>{
           let description = value.description.toLowerCase()
           return description.includes(this.filter.description.toLowerCase())
        })
        }
        return filterData;

    },
    isGreaterThanDailyLimit(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        month = month<10?"0"+month:month;
        day=day<10?"0"+day:day;
        date = new Date(year, month, day, 0, 0, 0, 0)

        let filterData=this.amount;
    
         filterData = filterData.filter((value)=>{
            return value.date.getTime() >= date.getTime();
        })
        
        
        let totalExpense = 0
        filterData.forEach((element) => {
            if (element.type == "Expendicture") {
                let expense = parseInt(element.amount)
                totalExpense += expense;
            }

        })
  
        return [ (this.limit.dailyLimit < totalExpense),totalExpense-this.limit.dailyLimit]

    },
    isGreaterThanMonthlyLimit(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = "01"
        month = month<10?"0"+month:month;
        date = new Date(year, month, day, 0, 0, 0, 0)

        let filterData=this.amount;
    
         filterData = filterData.filter((value)=>{
            return value.date.getTime() >= date.getTime();
        })
        
        
        let totalExpense = 0
        filterData.forEach((element) => {
            if (element.type == "Expendicture") {
                let expense = parseInt(element.amount)
                totalExpense += expense;
            }

        })

        return [ (this.limit.monthlyLimit < totalExpense),totalExpense-this.limit.monthlyLimit]


    },
    
    getIncomeAmount() {
        let totalIncome = 0
       
        this.getFilteredData().forEach((element) => {
            
            if (element.type == "Income") {
                let income=parseInt(element.amount)
                totalIncome += income;
                
            }

        })
        return totalIncome;
    },
    getExpenseAmount(){
        let totalExpense = 0
        this.getFilteredData().forEach((element) => {
            if (element.type == "Expendicture") {
                let expense = parseInt(element.amount)
                totalExpense += expense;
            }

        })
        return totalExpense;
    },
    getTotalAmount(totalIncome,totalExpense){
        return totalIncome-totalExpense;
    }
}

export function getnewId() {
    let id = parseInt(localStorage.id) || 0
    id++;
    localStorage.id = JSON.stringify(id);
    return id;
}
export function addAmounts(amount) {
    store.amount.push(amount)

    localStorage.amounts = JSON.stringify(store.amount);
}

export function initializeSite() {
    if(localStorage.limits){
        store.limit=JSON.parse(localStorage.limits)
    }
    if (localStorage.amounts) {
        let amounts = JSON.parse(localStorage.amounts)
        amounts.forEach((element) => {
            let { amount, type, amount_category, date, description, id } = element;
            let amountTopush = new Amount(amount, type, amount_category, date, description, id)
            store.amount.push(amountTopush)
        });
    }
}

export function deleteItem(id){
    store.amount=store.amount.filter((value)=>{
        return value.id != id;
    }
    )
    localStorage.amounts=JSON.stringify(store.amount)
    arrangeId()
    render()
    
}
function arrangeId(){
    let id=0;
    localStorage.id=id;
    store.amount.forEach((value)=>{
        id++
        value.id=id;
        localStorage.id=id;
    })
    localStorage.amounts=JSON.stringify(store.amount)
    
}


export function editItem(id,amount,type,amount_category,date,description){
    let index=store.amount.findIndex((value)=>{
        return value.id == id
    })
    store.amount[index].id=id,
        store.amount[index].amount =amount,
        store.amount[index].type=type,
        store.amount[index].amount_category=amount_category,
        store.amount[index].date=new Date(date),
        store.amount[index].description=description,
    localStorage.amounts = JSON.stringify(store.amount)
    $('#exampleModalCenter').modal("toggle")
    render()
}


export function filterForms(from,to,type,category,description){
    if(from){
    store.filter.from=new Date(from);
    }
    if(to){
    store.filter.to=new Date(to)
    }
    store.filter.type=type
    store.filter.category=category
    store.filter.description=description
    render()
}

export function resetingFilter(){
    store.filter.from=null;
    store.filter.to=null;
    store.filter.type=null;
    store.filter.category=null;
    store.filter.description=null;
    render()
}

export function setLimits(dLimit,mLimit){
    
    store.limit.dailyLimit=dLimit;
    store.limit.monthlyLimit = mLimit;
    localStorage.limits=JSON.stringify(store.limit)
    render()
}