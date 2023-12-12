document.getElementById('eventInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addEvent();
    }
});

function addEvent() {
    var input = document.getElementById("eventInput");
    var newEvent = input.value;
    if (newEvent) {
        var li = document.createElement("li");
        var textSpan = document.createElement("span");
        textSpan.textContent = newEvent;
        li.appendChild(textSpan);

        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function() { editEvent(textSpan, this); };
        li.appendChild(editBtn);

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() { this.parentNode.remove(); };
        li.appendChild(deleteBtn);

        document.getElementById("eventList").appendChild(li);
        input.value = ""; // Clear the input
    }
}

function editEvent(textSpan, editBtn) {
    var currentText = textSpan.textContent;
    var input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    textSpan.parentNode.insertBefore(input, textSpan);
    textSpan.parentNode.removeChild(textSpan);
    
    editBtn.textContent = "Save";
    editBtn.onclick = function() { saveEvent(input, this); };
}

function saveEvent(input, editBtn) {
    var newEvent = input.value;
    var textSpan = document.createElement("span");
    textSpan.textContent = newEvent;

    input.parentNode.insertBefore(textSpan, input);
    input.parentNode.removeChild(input);

    editBtn.textContent = "Edit";
    editBtn.onclick = function() { editEvent(textSpan, this); };
}
