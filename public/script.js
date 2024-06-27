// script.js

// Funktion zum Filtern der Tabelle
function filterTable() {
    let inputCountry = document.getElementById('input-country').value.toUpperCase();
    let inputCompany = document.getElementById('input-company').value.toUpperCase();
    let table = document.getElementById('emissions-table');
    let rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        let country = rows[i].getElementsByTagName('td')[0];
        let company = rows[i].getElementsByTagName('td')[1];
        
        if (country && company) {
            let countryText = country.textContent || country.innerText;
            let companyText = company.textContent || company.innerText;
            
            if (countryText.toUpperCase().indexOf(inputCountry) > -1 && companyText.toUpperCase().indexOf(inputCompany) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Event Listener für die Filter-Inputs
document.getElementById('input-country').addEventListener('input', filterTable);
document.getElementById('input-company').addEventListener('input', filterTable);

// Funktionen für die Sortierung (Beispiel)
let sortColumn = 0; // Index der Spalte, nach der sortiert werden soll
let sortOrder = 1; // 1 für aufsteigend, -1 für absteigend

function sortTable() {
    let rowsArray = Array.from(document.getElementById('emissions-table').getElementsByTagName('tr')).slice(1); // Konvertiere die Zeilen in ein Array, exklusive der Header-Zeile

    rowsArray.sort((rowA, rowB) => {
        let cellA = rowA.getElementsByTagName('td')[sortColumn].textContent.trim();
        let cellB = rowB.getElementsByTagName('td')[sortColumn].textContent.trim();

        if (sortColumn === 2 || sortColumn === 3) { // Wenn nach Zahlen sortiert wird (z.B. CO²-Emissionen oder Jahr)
            return (parseInt(cellA, 10) - parseInt(cellB, 10)) * sortOrder;
        } else { // Standard-Sortierung für Text
            return cellA.localeCompare(cellB) * sortOrder;
        }
    });

    // Entferne alle Zeilen aus der Tabelle
    while (document.getElementById('emissions-table').rows.length > 1) {
        document.getElementById('emissions-table').deleteRow(1);
    }

    // Füge die sortierten Zeilen zurück in die Tabelle ein
    rowsArray.forEach(row => {
        document.getElementById('emissions-table').appendChild(row);
    });
}

// Beispiel: Sortieren nach CO²-Emissionen bei Klick auf die entsprechende Spaltenüberschrift
document.getElementById('emissions-table').getElementsByTagName('th')[2].addEventListener('click', function() {
    sortColumn = 2; // Index der Spalte für CO²-Emissionen
    sortOrder *= -1; // Ändere die Sortierreihenfolge (aufsteigend/absteigend)
    sortTable();
});

// Weitere Funktionen und Event-Listener hier hinzufügen, je nach Anforderungen