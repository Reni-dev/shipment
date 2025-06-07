/*
*  File: app.js
*  Author: Hanák Renáta
*  Copyright: 2025, Hanák Renáta
*  Group: Szoft 1/N
*  Date: 2025-06-07
*  Github: https://github.com/reni-dev/
*  Licenc: MIT
*/


const tbody = document.querySelector('#tbody')

const url = 'http://localhost:8000/api/shipments'

async function getShipments() {
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Hiba a lekérés során!")
        }
        const shipments = await response.json();
        return shipments
    } catch (error) {
        console.error("Hiba a lekérés során!", error)
        return []
    }
    
}

function renderShipments(shipments) {
  tbody.innerHTML = '';

  shipments.forEach(shipment => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${shipment.id}</td>
      <td>${shipment.shipmentId}</td>
      <td>${shipment.sentDate}</td>
      <td>${shipment.endDate}</td>
      <td>${shipment.adresse}</td>
      <td>${shipment.targetCity}</td>
    `;

    tbody.appendChild(row);
  });
}

async function init() {
  const shipmentsResponse = await getShipments();
  const shipments = shipmentsResponse.data;
  renderShipments(shipments);
}

document.addEventListener('DOMContentLoaded', init);
