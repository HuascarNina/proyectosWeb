function actualizarScore(){
    var operation=localStorage.getItem('operation');
    var local='Ale';
    var nombre = document.getElementById("name").value;
    var score = parseInt(localStorage.getItem("score"));
    if(operation=='s'){
        local='Suma';
        var top1 = parseInt(localStorage.getItem("topSuma1")) || 0;
        var top2 = parseInt(localStorage.getItem("topSuma2")) || 0;
        var top3 = parseInt(localStorage.getItem("topSuma3")) || 0;    
    }
    if(operation=='r'){
        local='Res';
        var top1 = parseInt(localStorage.getItem("topRes1")) || 0;
        var top2 = parseInt(localStorage.getItem("topRes2")) || 0;
        var top3 = parseInt(localStorage.getItem("topRes3")) || 0;    
    }
    if(operation=='m'){
        local='Mul';
        var top1 = parseInt(localStorage.getItem("topMul1")) || 0;
        var top2 = parseInt(localStorage.getItem("topMul2")) || 0;
        var top3 = parseInt(localStorage.getItem("topMul3")) || 0;    
    }
    if(operation=='a'){
        var top1 = parseInt(localStorage.getItem("topAle1")) || 0;
        var top2 = parseInt(localStorage.getItem("topAle2")) || 0;
        var top3 = parseInt(localStorage.getItem("topAle3")) || 0; 
    }
    
    if(score>top1){
        localStorage.setItem("top"+local+"3",localStorage.getItem("top"+local+"2"));
        localStorage.setItem("top"+local+"2",localStorage.getItem("top"+local+"1"));
        localStorage.setItem("top"+local+"1",score);
        localStorage.setItem("TOP"+local+"3", localStorage.getItem("TOP"+local+"2"));
        localStorage.setItem("TOP"+local+"2", localStorage.getItem("TOP"+local+"1"));
        localStorage.setItem("TOP"+local+"1", nombre +" "+ score);
        
    }else{
        if(score>top2){
            localStorage.setItem("top"+local+"3",localStorage.getItem("top"+local+"2"));
            localStorage.setItem("top"+local+"2",score);
            localStorage.setItem("TOP"+local+"3", localStorage.getItem("TOP"+local+"2"));
            localStorage.setItem("TOP"+local+"2", nombre +" "+ score);
        }else{
            if(score>top3){
                localStorage.setItem("top"+local+"3",score);
                localStorage.setItem("TOP"+local+"3", nombre +" "+ score);
            }
        }
    }
    localStorage.removeItem("score");
}
function reinicio() {
    actualizarScore();
    window.location.href='game.html';
}
function inicio() {
    actualizarScore();
    window.location.href='../index.html';
}