function laskeMuunnos() {
    const syote = document.getElementById("syote").value.trim();
    const suunta = document.getElementById("suunta").value;
    const tarkkuus = Number(document.getElementById("tarkkuus").value);
    const vastausElementti = document.getElementById("vastaus");

    vastausElementti.className = "p-3 rounded d-none";

    if (syote === "") {
        Tulos("Virhe: Anna lämpötila", "alert-danger");
        return;
    }

    const lampotila = Number(syote.replace(",", "."));

    if (isNaN(lampotila)) {
        Tulos("Virhe: Vain numeroita", "alert-danger");
        return;
    }

    if (suunta === "c-f") {
        if (lampotila < -273.15) {
            Tulos("Virhe: Syöte ei voi olla alle absoluuttisen nollapisteen (-273,15 °C)!", "alert-danger");
            return;
        }
        const fahrenheit = (lampotila * 9 / 5) + 32;
        Tulos(lampotila + " °C = " + fahrenheit.toFixed(tarkkuus) + " °F", "alert-info");
    } else {
        if (lampotila < -459.67) {
            Tulos("Virhe: Syöte ei voi olla alle absoluuttisen nollapisteen (-459,67 °F)!", "alert-danger");
            return;
        }
        const celsius = (lampotila - 32) * 5 / 9;
        Tulos(lampotila + " °F = " + celsius.toFixed(tarkkuus) + " °C", "alert-info");
    }
}

function Tulos(teksti, luokka) {
    const vastausElementti = document.getElementById("vastaus");
    vastausElementti.innerText = teksti;
    vastausElementti.classList.remove("d-none");
    vastausElementti.classList.add("alert", luokka);
}
document.addEventListener("DOMContentLoaded", function() {
    const syoteKentta = document.getElementById("syote");
    if (syoteKentta) {
        syoteKentta.addEventListener("keydown", function(tapahtuma) {
            if (tapahtuma.key === "Enter") {
                tapahtuma.preventDefault();
                laskeMuunnos();
            }
        });
    }
});