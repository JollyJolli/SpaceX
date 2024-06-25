// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.spacexdata.com/v5/launches/latest')
        .then(response => response.json())
        .then(data => displayLaunchInfo(data))
        .catch(error => console.error('Error fetching data:', error));

    fetch('https://api.spacexdata.com/v4/history')
        .then(response => response.json())
        .then(data => displayHistory(data))
        .catch(error => console.error('Error fetching history:', error));
});

function displayLaunchInfo(data) {
    document.getElementById('patch').src = data.links.patch.small;
    document.getElementById('mission-name').textContent = data.name;
    document.getElementById('date').textContent = `Fecha de lanzamiento: ${new Date(data.date_utc).toLocaleString()}`;
    document.getElementById('rocket').textContent = `Cohete: ${data.rocket}`;
    document.getElementById('launchpad').textContent = `Plataforma de lanzamiento: ${data.launchpad}`;

    const crewContainer = document.getElementById('crew');
    crewContainer.innerHTML = `<h3>Tripulación:</h3>`;
    data.crew.forEach(member => {
        const crewMember = document.createElement('p');
        crewMember.textContent = `${member.role}`;
        crewContainer.appendChild(crewMember);
    });

    document.getElementById('webcast').href = data.links.webcast;
    document.getElementById('wikipedia').href = data.links.wikipedia;
}

function displayHistory(data) {
    const historyContainer = document.getElementById('history');
    data.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('history-event', 'card');

        const title = document.createElement('h3');
        title.textContent = event.title;

        const date = document.createElement('p');
        date.textContent = `Fecha del evento: ${new Date(event.event_date_utc).toLocaleString()}`;

        const details = document.createElement('p');
        details.textContent = event.details;

        const articleLink = document.createElement('a');
        articleLink.href = event.links.article;
        articleLink.target = '_blank';
        articleLink.textContent = 'Leer más';

        eventElement.appendChild(title);
        eventElement.appendChild(date);
        eventElement.appendChild(details);
        eventElement.appendChild(articleLink);

        historyContainer.appendChild(eventElement);
    });
}
