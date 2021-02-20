var type = document.querySelector('body > main > section#type');
var scope = document.querySelector('body > main > section#scope');
var summary = document.querySelector('body > main > section#summary');
var body = document.querySelector('body > main > section#body');
var footer = document.querySelector('body > main > section#footer');
var significantChange = document.querySelector('body > main > section#significantChange');
var result = document.querySelector('body > main > section#result');


var currentTarget = type;


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
type.querySelector('form').onsubmit = function(e) { e.preventDefault();

    if (this.type.value == 'revert') {

        summary.querySelector('form > nav > button.finish').style.display = 'none';
        summary.querySelector('form').summary.parentNode.click();

        body.querySelector('form > nav > button.finish').style.display = 'none';

        footer.querySelector('form > div > label[for="refs"] > a').href = 'https://docs.github.com/en/github/writing-on-github/autolinked-references-and-urls#commit-shas';
        footer.querySelector('form').refs.pattern = '^((,\\s*)?([A-Za-z0-9][+A-Za-z0-9._-]*(\\/.+)?@)?([A-Fa-f0-9]{7}|[A-Fa-f0-9]{40}))*$';
        footer.querySelector('form').refs.placeholder = 'a5c3785, jlord@a5c3785, jlord/sheetsee.js@a5c3785, ...';
        footer.querySelector('form').refs.required = true;

        currentTarget = summary;
        summary.scrollIntoView({
            behavior: 'smooth'
        });

    } else {

        scope.querySelector('form').scope.parentNode.click();
        
        summary.querySelector('form > nav > button.finish').style.display = '';

        body.querySelector('form > nav > button.finish').style.display = '';

        footer.querySelector('form > div > label[for="refs"] > a').href = 'https://docs.github.com/en/github/writing-on-github/autolinked-references-and-urls';
        footer.querySelector('form').refs.pattern = '^((,\\s*)?(([A-Za-z0-9][+A-Za-z0-9._-]*\\/[A-Za-z0-9._-]+)?#\\d+|([A-Za-z0-9][+A-Za-z0-9._-]*(\\/[A-Za-z0-9._-]+)?@)?([A-Fa-f0-9]{7}|[A-Fa-f0-9]{40})))*$';
        footer.querySelector('form').refs.placeholder = '#26, a5c3785, github/linguist#4039, jlord@a5c3785, jlord/sheetsee.js#26, jlord/sheetsee.js@a5c3785, ...';
        footer.querySelector('form').refs.required = false;

        currentTarget = scope;
        scope.scrollIntoView({
            behavior: 'smooth'
        });

    }

};


scope.querySelector('form').scope.onfocus = function() {

    let typeSize = type.querySelector('form').type.value.length;
    let ornamentSize = (' ()!: ').length;

    let maxLength = 50 - typeSize - ornamentSize;

    this.maxLength = maxLength;

    scope.querySelector('form > div > label > small').innerHTML = this.value.length +' / '+ this.maxLength;

};
scope.querySelector('form').scope.oninput = function() {

    let small = scope.querySelector('form > div > label > small');

    if (this.value.length == 0) {

        small.className = '';
        small.title = '';

    } else if (this.value.length < (+this.maxLength / 3)) {

        small.className = 'good';
        small.title = 'Good';

    } else if (this.value.length < (+this.maxLength / 3) * 2) {

        small.className = 'caution';
        small.title = 'Extensive';

    } else {

        small.className = 'danger';
        small.title = 'Enormous';

    }

    small.innerHTML = this.value.length +' / '+ this.maxLength;

};
scope.querySelector('form').onsubmit = function(e) { e.preventDefault();

    summary.querySelector('form').summary.parentNode.click();

    currentTarget = summary;
    summary.scrollIntoView({
        behavior: 'smooth'
    });

};
scope.querySelector('form').onreset = function() {

    currentTarget = type;
    type.scrollIntoView({
        behavior: 'smooth'
    });

};


summary.querySelector('form').summary.onblur = function() { // Standardize the message

    this.value = this.value.trim();

    this.value = 
        this.value.slice(0, 1).toLocaleLowerCase() // Don't capitalize the first letter
        +
        this.value.slice(1).split('.').filter(e => e).join('.'); // No dot (.) at the end

};
summary.querySelector('form').summary.onfocus = function() {

    let typeSize = type.querySelector('form').type.value.length;
    let scopeSize = scope.querySelector('form').scope.value.trim().length;
    let ornamentSize = (scopeSize ? ' ()!: ' : '!: ').length;

    let maxLength = 50 - typeSize - scopeSize - ornamentSize;

    this.maxLength = maxLength;

    summary.querySelector('form > div > label > small').innerHTML = this.value.length +' / '+ this.maxLength + '<sub>50 - '+ (50 - this.maxLength) +'</sub>';

};
summary.querySelector('form').summary.oninput = function() {

    summary.querySelector('form > div > label > small').innerHTML = this.value.length +' / '+ this.maxLength + '<sub>50 - '+ (50 - this.maxLength) +'</sub>';

};
summary.querySelector('form').onsubmit = function(e) { e.preventDefault();

    if (e.submitter.classList.contains('finish')) {

        significantChange.querySelector('form').significantChange.parentNode.click();
        significantChange.querySelector('form').significantChange.checked = false;

        currentTarget = significantChange;
        significantChange.scrollIntoView({
            behavior: 'smooth'
        });

    } else {

        body.querySelector('form').body.parentNode.click();

        currentTarget = body;
        body.scrollIntoView({
            behavior: 'smooth'
        });

    }

};
summary.querySelector('form').onreset = function() {

    if (type.querySelector('form').type.value == 'revert') {

        currentTarget = type;
        type.scrollIntoView({
            behavior: 'smooth'
        });

    } else {

        scope.querySelector('form').scope.parentNode.click();

        currentTarget = scope;
        scope.scrollIntoView({
            behavior: 'smooth'
        });

    }

};


body.querySelector('form').onsubmit = function(e) { e.preventDefault();

    if (e.submitter.classList.contains('finish')) {

        significantChange.querySelector('form').significantChange.parentNode.click();
        significantChange.querySelector('form').significantChange.checked = false;

        currentTarget = significantChange;
        significantChange.scrollIntoView({
            behavior: 'smooth'
        });

    } else {

        currentTarget = footer;
        footer.scrollIntoView({
            behavior: 'smooth'
        });

        if (type.querySelector('form').type.value == 'revert')
            setTimeout(() => footer.querySelector('form button[type="submit"]').click(), 1000);

    }

};
body.querySelector('form').onreset = function() {

    summary.querySelector('form').summary.parentNode.click();

    currentTarget = summary;
    summary.scrollIntoView({
        behavior: 'smooth'
    });

};


for (let text of footer.querySelectorAll('form > div > label > input[type="text"]')) {
            
    text.onblur = function() { // Standardize the message

        this.value = this.value.trim();

        this.value = this.value.split(',').map(e => e.trim()).filter(e => e).join(', ');

    };

}