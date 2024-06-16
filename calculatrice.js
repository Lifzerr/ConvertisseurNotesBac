
calcul = ""
chaineAffichee = ""

// Fonctions de récupération des clics des boutons

function clearScreen() {
    majResult("");
    calcul = "";
    chaineAffichee = "";
}

function deleteAll() {
    document.getElementById("written").textContent = eval(calcul);
    calcul = "";
    result = 0;
    majResult(calcul);
    
}

function deleteChar() {
    calcul = calcul.slice(0, -1);
    majResult(calcul);
}

function insertNumber(nbr = 0){
    calcul += nbr.toString();
    chaineAffichee += nbr.toString();
    majResult(calcul);
}

function insertOperator(operator){
    // Si l'utilisateur veut élever au carré
    if(operator == "²")
    {
        let result = eval(calcul);
        result = (result * result).toFixed(2);
        chaineAffichee = calcul + "²";
        calcul = result;
        document.getElementById("written").textContent = chaineAffichee;
    }

    else {
        // Cas ou l'utilisateur veut ajouter un opérateur après un autre opérateur
        if(chaineAffichee.slice(-1) == "+" || chaineAffichee.slice(-1) == "-" || chaineAffichee.slice(-1) == "*" || chaineAffichee.slice(-1) == "/" || chaineAffichee.slice(-1) == "%")
        {
            calcul = calcul.slice(0, -1);
            calcul += operator;
            chaineAffichee = chaineAffichee.slice(0, -1);
            chaineAffichee += operator;
        }
        // Situation normale
        else
        {
            calcul += operator;
        }
    }
    
    majResult(calcul);
}

function calculate(){
    try{
        var result = eval(calcul).toFixed(2);
        majResult(result);
        document.getElementById("written").textContent = calcul;
        calcul = result;
    }
    catch(e){
        console.log(e);
        result = "Error";
        majResult(result);
    }

}

function majResult(chaine){
    document.getElementById("result").textContent = chaine;
}