var type = document.querySelector('body > main > section#type');
var scope = document.querySelector('body > main > section#scope');
var summary = document.querySelector('body > main > section#summary');
var body = document.querySelector('body > main > section#body');
var footer = document.querySelector('body > main > section#footer');
var significantChange = document.querySelector('body > main > section#significantChange');
var result = document.querySelector('body > main > section#result');


for (let checkBox of type.querySelectorAll('form > div > label > input')) {

    checkBox.onchange = function() {

        if (this.value == 'other') {

            if (!type.querySelector('form > div > label[for="other"] > span > input')) {

                type.querySelector('form > div > label[for="other"] > span').innerHTML = '<input type="text" name="otherType" pattern="[a-zA-Z]+" placeholder="Insert the new type" required>';
                type.querySelector('form > div > label[for="other"] > span > input').focus();

            }

        } else {

            type.querySelector('form > div > label[for="other"] > span').innerHTML = "<strong>other</strong>: Doesn't fit any of the suggested types?";

        }

    };

}