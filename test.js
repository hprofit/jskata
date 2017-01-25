/**
 * This is a function which creates `howManyToCreate` buttons on the page
 * Each button should have "i" as its text, where "i" is the order it was created in.
 * When clicked, each button should create an alert which says "Clicked button i!"
 * There is a bug in this code. Where is it and how can it be fixed?
 **/
function createButtons(howManyToCreate) {
    for(var i = 1; i <= howManyToCreate; i++) {
        var newButton = document.createElement('button');

        newButton.appendChild(document.createTextNode(i));

        newButton.addEventListener('click', (function(n) {
            alert('Clicked button ' + n + '!');
        }).bind(null, i));

        document.body.appendChild(newButton);
    }
}
createButtons(5);
