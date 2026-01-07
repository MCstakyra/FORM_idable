/*
 * Fichier: scan.js
 * Rôle: Gère l'affichage de la webcam et met à jour l'interface
 * en fonction des données reçues (simulées pour l'instant).
 */

const videoElement = document.getElementById('webcamVideo');
const alertBox = document.getElementById('correctionAlertBox');
const correctionText = document.getElementById('correctionText');
const statusText = document.getElementById('statusText');

// --- 1. DÉMARRAGE DE LA WEBCAM ---
async function startWebcam() {
    try {
        // Demande l'accès à la caméra (vidéo uniquement)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Connecte le flux vidéo à l'élément HTML <video>
        videoElement.srcObject = stream;
        console.log("Webcam démarrée avec succès.");
    } catch (err) {
        console.error("Erreur d'accès à la webcam:", err);
        alert("Impossible d'accéder à la caméra. Vérifiez vos permissions.");
        statusText.textContent = " Erreur caméra";
    }
}

// --- 2. FONCTIONS DE MISE À JOUR DE L'INTERFACE (FRONT-END PURE) ---

// Fonction pour AFFICHER une alerte rouge
function showCorrection(message) {
    correctionText.textContent = "⚠️ " + message.toUpperCase();
    alertBox.style.display = 'block'; // Rendre visible
    statusText.textContent = " Correction en cours...";
    // Optionnel : ajouter un son ici
}

// Fonction pour CACHER l'alerte quand la posture est bonne
function clearCorrection() {
    alertBox.style.display = 'none'; // Cacher
    statusText.textContent = " Posture correcte. Continuez !";
}


// --- 3. SIMULATION DU BACK-END (À REMPLACER PAR TES COLLÈGUES) ---

/* * IMPORTANT POUR L'ÉQUIPE BACKEND :
 * Cette partie simule ce que votre code devra faire.
 * Au lieu d'un 'setInterval' aléatoire, votre code analysera les frames vidéo
 * et appellera `showCorrection(message)` ou `clearCorrection()` selon le résultat de l'IA.
 */

const exemplesDeCorrections = [
    "Redresser le dos",
    "Écarter plus les jambes",
    "Baisser les épaules",
    "Regarder droit devant",
    "Plier davantage les genoux"
];

function simulerBackendIA() {
    console.log("--- Simulation Backend ---");
    
    // 70% de chance que tout aille bien, 30% de chance d'avoir une correction
    const isPostureOK = Math.random() > 0.3;

    if (isPostureOK) {
        console.log("Backend dit: Posture OK");
        clearCorrection();
    } else {
        // Choisir une correction au hasard
        const randomIndex = Math.floor(Math.random() * exemplesDeCorrections.length);
        const message = exemplesDeCorrections[randomIndex];
        console.log("Backend dit: Correction nécessaire -> " + message);
        showCorrection(message);
    }
}


// --- INITIALISATION ---

// Lancer la webcam au chargement de la page
startWebcam();

// Lancer la simulation du backend (Toutes les 3 secondes pour le test)
// COMMENTER CETTE LIGNE QUAND LE VRAI BACKEND SERA CONNECTÉ
setInterval(simulerBackendIA, 3000);
