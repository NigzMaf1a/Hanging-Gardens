function show()
{
    document.getElementById('Sidebar').classList.toggle('active');
}
const butSupply=document.getElementById('butSupply');
const butInvent=document.getElementById('butInvent');
const butInspect=document.getElementById('butInspect');
const butMcee=document.getElementById('butMcee');
const butBand=document.getElementById('butBand');
const butDj=document.getElementById('butDj');
const butIncome=document.getElementById('butIncome');
const butExpense=document.getElementById('butExpense');
const butBack=document.getElementById('butBack');
butSupply.addEventListener("click",function(){
	window.location.href='Supply.html';
});
butInvent.addEventListener("click",function(){
	window.location.href='Equipment.html';
});
butInspect.addEventListener("click",function(){
	window.location.href='Inspect.html';
});
butBand.addEventListener("click",function(){
	window.location.href='Band.html';
});
butMcee.addEventListener("click",function(){
	window.location.href='Mcee.html';
});
butDj.addEventListener("click",function(){
	window.location.href='Dj.html';
});
butIncome.addEventListener("click",function(){
	window.location.href='Income.html';
});
butExpense.addEventListener("click",function(){
	window.location.href='Expense.html';
});
butBack.addEventListener("click",function(){
	window.location.href='Reports.html';
});
