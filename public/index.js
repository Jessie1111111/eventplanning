events = []
function displayEvents() {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";
    events.forEach((event, index) => {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = event;
        li.appendChild(textSpan);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function() { editEvent(index, textSpan); };
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() { deleteEvent(index); };
        li.appendChild(deleteBtn);

        eventList.appendChild(li);
    });
}

function addEvent() {
    const input = document.getElementById("eventInput");
    const newEvent = input.value.trim();
    if (newEvent) {
        fetch('/create-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ event: newEvent })
        })
        .then(response => response.json())
        .then(data => {
            events.push(data);
            displayEvents();
            input.value = "";
        })
        .catch(error => console.error('Error:', error));
    }
}

function editEvent(index, textSpan) {
    const currentText = events[index];
    const newEvent = prompt("Edit the event:", currentText);
    if (newEvent !== null) {
        fetch('/update-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ index: index, event: newEvent })
        })
        .then(response => response.json())
        .then(data => {
            events[index] = data;
            displayEvents();
        })
        .catch(error => console.error('Error:', error));
    }
}

function deleteEvent(index) {
    fetch('/delete-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: index })
    })
    .then(response => response.json())
    .then(data => {
        events.splice(index, 1);
        displayEvents();
    })
    .catch(error => console.error('Error:', error));
}
function getEvents() {
    fetch('/all-event')
        .then(response => response.json())
        .then(data => {
            events = data;
            console.log(events);
            displayEvents();
        })
        .catch(error => console.error('Error:', error));
}
getEvents();
