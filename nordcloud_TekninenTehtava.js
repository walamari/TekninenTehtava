/*
Tämä ohjelma palauttaa tehokkaimman annettuja kordinaatteja vastaavan linkkiaseman. Jos yhtäkään linkkiasemaa ei löydy siitä kerrotaan. 
Ohjelman ajamiseen ohjeet löytyvät readme tiedostosta. 
*/

//Linkkiasemien kordinaatit ja kantomatka. 
const linkkiasemat = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];

var koordinaattit = process.argv.slice(2);


console.log("Antamasi koordinaatit:");
parasLinkkiasema(koordinaattit);
console.log("     ");

console.log("Tehtävänannossa annetut testi koordinaatit:");
parasLinkkiasema([0,0]);
parasLinkkiasema([100,100]);
parasLinkkiasema([15,10]);
parasLinkkiasema([18,18]);


//funktio palauttaa parhaimman linkkiaseman laitteelle parametrinä tulevista laitteen koordinaateista. 
function parasLinkkiasema(koordinaattit){

    //silmukka laskee voimalaskurin ja etäisyyslaskurin avulla tehon jokaista asemaa kohti ja lisää ne listaan
    var tehoLista = [];
    for(let i = 0; i<linkkiasemat.length;i++ ){

        let linkkiasema = linkkiasemat[i]; 
        tehoLista.push(voimaLaskuri(linkkiasema[2], etaisyysLaskuri(linkkiasema, koordinaattit)));

    }

    //silmukassa vertaillaan mikä listassa olevista tehoista on suurin ja mikä sen indeksi on
    let suurinTeho = 0;
    let indeksi = 0;
    for(let i = 0; i<tehoLista.length;i++ ){
        if(suurinTeho < tehoLista[i]){
            indeksi=i;
            suurinTeho = tehoLista[i];
        }
    }

    //luodaan parhaimmasta linkkiasemasta olio tietojen lisäämisen helpottamiseksi
    let parasLinkkiasema = linkkiasemat[indeksi];
    const tiedot = {x:parasLinkkiasema[0], y:parasLinkkiasema[1], power:suurinTeho}

    if (tiedot.power == 0){return console.log("No link station within reach for point " + koordinaattit[0]+","+ koordinaattit[1])} 
    else {console.log("Best link station for point " + koordinaattit[0]+","+ koordinaattit[1] + " is " + tiedot.x + "," + tiedot.y +  " with power " + tiedot.power)}

}


// etaisyysLaskuri laskee kahden pisteen välisen etäisyyden ja palauttaa sen
// AsemanPisteet ovat linkkiaseman koordinaatit
// pisteet ovat laitteen koordinaatit
function etaisyysLaskuri (AsemanPisteet, pisteet){

    var a = (AsemanPisteet[0] - pisteet[0]);
    var b = (AsemanPisteet[1] - pisteet[1]);
    let etaisyys = Math.sqrt(a*a + b*b);
    return etaisyys;

}


// voimalaskuri  laskee linkkiaseman tehon laitteen kohdalla ja palauttaa sen
// kantama on linkkiaseman kantomatka
// etäisyys on etäisyyslaskurilla saatu laitteen ja linkkiaseman etäisys
function voimaLaskuri(kantama, etaisyys ){
    let power = 0;
    if (etaisyys <= kantama){
        power = Math.pow(kantama - etaisyys, 2);
    }
    return power;
}
