// indicateur de validité
let valid = true;
let messageShown = false;

// Pour les moyennes pondérées
let notes = [];
let coefs = [];


function convert(){
    // Récupérer les points pour le bac
    let pointsBac = conversionPremiere() + conversionTerminale() + conversionDeuxAnnées();

    // Vérifier si les notes saisies sont valides ( 0 <= note <= 20)
    if(isNaN(pointsBac)){
        showAlert("Veuillez entrer des valeurs numériques valides !");
        return;
    }

    // Calculer la mention
    let mention = calculerMention(pointsBac);

    // Calculer la moyenne générale
    let moyenneGenerale = pointsBac / 100;

    // Afficher les résultats
    afficherPopupResultats(mention, moyenneGenerale);

    // Remettre les valeurs par défaut
    resetInputs();
    valid = true;
    messageShown = false;
}

function reset(){
    // Demander une confirmation
    let confirmation = showConfirmation("Voulez-vous vraiment tout effacer ?");
}

function erase(){
    document.getElementById("noteInput").value = "";
    document.getElementById("coefUnput").value = "";

    // Vider les tableaux
    notes = [];
    coefs = [];
}

function addNote(){
    // Récupérer les notes
    let note = parseFloat(document.getElementById("noteInput").value);
    let coef = parseFloat(document.getElementById("coefInput").value);

    console.log(note, coef);

    // Vérifier si la note et le coef sont valides
    if((isNaN(note) || note < 0 || note > 20) && (isNaN(coef) || coef < 0)){
        showAlert("Veuillez entrer une note valide !");
        return;
    }

    // Ajouter la note et le coef aux tableaux
    notes.push(note);
    coefs.push(coef);
}

function calculate(){
    // Initialisations
    let sommeNotes = 0;
    let sommeCoefs = 0;

    console.log(notes, coefs);

    // Parcourir le tableau
    for(let i = 0; i < notes.length; i++){
        sommeNotes += notes[i] * coefs[i];
        sommeCoefs += coefs[i];
    }

    // Afichiezr les résultats
    console.log(sommeNotes, sommeCoefs);

    // Calculer la moyenne pondérée
    let moyennePonderee = parseFloat(sommeNotes / sommeCoefs);

    // Afiicher la moyenne pondérée
    afficherPopUpMoyenne(moyennePonderee);

    // Afficher la moyenne pondérée
    afficherPopUpMoyenne(moyennePonderee);
}

/****************************************************
Fonction pour afficher le popup de la note de passage
****************************************************/

function afficherPopupResultats(mention = "", moyenneGenerale = 0) {
    document.querySelector('.result').style.display = 'block';
    // Afficher la mention
    document.querySelector('#mention').textContent = mention;
    document.querySelector('#moyenne').textContent = moyenneGenerale;
}

// Fonction pour masquer le pop-up de résultats
function masquerPopupResultats() {
    document.querySelector('.result').style.display = 'none';

    // Remettre les valeurs par défaut
    document.querySelector('#mention').textContent = "";
    document.querySelector('#moyenne').textContent = "";

    // Remettre les valeurs par défaut
    resetInputs();
}

function afficherPopUpMoyenne(moyennePonderee = 0){
    document.querySelector('#moyPond').style.display = 'block';

    // Afficher la moyenne pondérée
    document.querySelector('#moyPonderee').textContent = moyennePonderee;
}

function masquerPopupMoyPond() {
    document.getElementById('moyPond').style.display = 'none';
    document.getElementById('moyennePond').textContent = "";

    // Remettre les valeurs par défaut
    erase();
}



/******************************************************
 * Fonction pour réinitialiser les valeurs des inputs
******************************************************/

function resetInputs(){
    // Premiere
    document.getElementById("EcritFr").value = "";
    document.getElementById("oralFr").value = "";
    document.getElementById("spePrem").value = "";
    document.getElementById("gdOral").value = "";
    document.getElementById("angPrem").value = "";
    document.getElementById("espPrem").value = "";
    document.getElementById("esPrem").value = "";
    document.getElementById("hisPrem").value = "";
    document.getElementById("emcPrem").value = "";


    // Terminale
    document.getElementById("spe1").value = "";
    document.getElementById("spe2").value = "";
    document.getElementById("angTerm").value = "";
    document.getElementById("espTerm").value = "";
    document.getElementById("esTerm").value = "";
    document.getElementById("histTerm").value = "";
    document.getElementById("emcTerm").value = "";
    document.getElementById("philo").value = "";
    document.getElementById("sportTerm").value = "";
}

/******************************************************* 
Fonctions de conversion des notes en points pour le bac 
*******************************************************/


function conversionPremiere(){
    // Récupérer les valeurs des inputs et les convertir en nombres
    let frEcrit = parseFloat(document.getElementById("EcritFr").value);
    let frOral = parseFloat(document.getElementById("oralFr").value);
    let spePrem = parseFloat(document.getElementById("spePrem").value);

    // metytre les valeurs dans un tableau
    let notes = [frEcrit, frOral, spePrem];


    // Vérifier si les notes sont valides
    notes.forEach(note => {
        if (isNaN(note) || note < 0 || note > 20) {
            valid = false;
        }
    });

    // Vérifier si la situation est valide
    if(!valid && !messageShown){
        showAlert("Veuillez entrer des valeurs numériques valides");
        messageShown = true;
        return;
    }

    // Calculer les moyennes
    let moyenneFr = (frEcrit + frOral) / 2;

    // Calculer les points pour le bac
    let pointsBac = moyenneFr * 10 + spePrem * 8;

    return pointsBac;
}

function conversionTerminale(){
    // innitialiser l'indicateur de validité
    let valid = true;

    // Récupérer les valeurs des inputs et les convertir en nombres
    let spe1 = parseFloat(document.getElementById("spe1").value);
    let spe2 = parseFloat(document.getElementById("spe2").value);
    let philo = parseFloat(document.getElementById("philo").value);
    let eps = parseFloat(document.getElementById("sportTerm").value);
    let gdOral = parseFloat(document.getElementById("gdOral").value);

    // Mettre les valeurs dans un tableau
    let notes = [spe1, spe2, philo, eps, gdOral];

    // Vérifier si les notes sont valides
    notes.forEach(note => {
        if(isNaN(note) || (!(note >= 0 && note <= 20))){
            valid = false;
        }
    });

    // Vérifier si la situation est valide
    if(!valid && !messageShown){
        showAlert("Veuillez entrer des valeurs numériques valides");
        return;
    }

    // Calculer les points pour le bac
    let ptsTerminale = spe1*16 + spe2*16 + philo * 8 + eps * 6 + gdOral * 10;

    // Vérifier si les notes saisies sont valides ( 0 <= note <= 20)
    if(isNaN(ptsTerminale)){
        showAlert("Veuillez entrer des valeurs numériques valides");
        return;
    }


    return ptsTerminale;
}

function conversionDeuxAnnées(){
    // indicateur de validité 
    let valid = true; 

    // notes de première
    let angPrem = parseFloat(document.getElementById("angPrem").value);
    let espPrem = parseFloat(document.getElementById("espPrem").value);
    let esPrem = parseFloat(document.getElementById("esPrem").value);
    let histPrem = parseFloat(document.getElementById("hisPrem").value);
    let emcPrem = parseFloat(document.getElementById("emcPrem").value);

    // Notes de terminale
    let angTerm = parseFloat(document.getElementById("angTerm").value);
    let espTerm = parseFloat(document.getElementById("espTerm").value);
    let esTerm = parseFloat(document.getElementById("esTerm").value);
    let histTerm = parseFloat(document.getElementById("histTerm").value);
    let emcTerm = parseFloat(document.getElementById("emcTerm").value);

    // Faire les moyennes par matière
    let moyenneAng = (angPrem + angTerm) / 2;
    let moyenneEsp = (espPrem + espTerm) / 2;
    let moyenneEs = (esPrem + esTerm) / 2;
    let moyenneHist = (histPrem + histTerm) / 2;
    let moyenneEmc = (emcPrem + emcTerm) / 2;

    // Mettre les valeurs dans un tableau
    let notes = [moyenneAng, moyenneEsp, moyenneEs, moyenneHist, moyenneEmc];

    // Vérifier si les notes sont valides
    // Vérifier si les notes sont valides
    notes.forEach(note => {
        if(isNaN(note) || (!(note >= 0 && note <= 20))){
            valid = false;
        }
    });

    // Vérifier si la situation est valide
    if(!valid && !messageShown){
        showAlert("Veuillez entrer des valeurs numériques valides");
        return;
    }

    // Calculer les points pour le bac
    let pointsBac = moyenneAng * 6 + moyenneEsp * 6 + moyenneEs * 6 + moyenneHist * 6 + moyenneEmc * 2;

    return pointsBac;
}


function calculerMention(pointsBac){
    let mention = "";
    
    if(pointsBac >= 1800){
        mention = "Mention très bien";
    }
    else if(pointsBac >= 1600){
        mention = "mention Bien";
    }
    else if(pointsBac >= 1400){
        mention = "mention Bien";
    }
    else if(pointsBac >= 1200){
        mention = "Mention assez bien";
    }
    else if(pointsBac >= 1000){
        mention = "Sans mention";
    }
    else if(pointsBac >= 800){
        mention = "Repêche";
    }
    else{
        mention = "Echec";
    }
    return mention;
}


/* Fonction pour les alertes stylisées */
function showAlert(message) {
    // Utilise SweetAlert pour styliser les alertes
    swal({
        title: "Erreur",
        text: message,
        icon: "error",
        button: "OK",
    });
}

function showConfirmation(message, callback) {
    // Utilise SweetAlert pour styliser les confirmations avec retour utilisateur
    swal({
        title: "Confirmation",
        text: message,
        icon: "info",
        buttons: {
            cancel: "Annuler",
            confirm: "OK"
        }
    }).then((value) => {
        if (value) {
            resetInputs(); // Exécute la fonction callback si l'utilisateur clique sur "OK"
        }
    });
}

