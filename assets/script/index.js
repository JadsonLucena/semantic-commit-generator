var type = document.querySelector('body > main > section#type');
var scope = document.querySelector('body > main > section#scope');
var summary = document.querySelector('body > main > section#summary');
var body = document.querySelector('body > main > section#body');
var footer = document.querySelector('body > main > section#footer');
var significantChange = document.querySelector('body > main > section#significantChange');
var result = document.querySelector('body > main > section#result');
let sections = Array.from(document.querySelectorAll('main > section'));


var currentTarget = type;
window.onresize = () => {

    currentTarget.scrollIntoView({
        behavior: 'smooth'
    });

};


function waitTransition(section) {

    return new Promise((resolve, reject) => {

        try {

            sections.forEach(element => element.classList.add('visible'));

            let loop = setInterval(() => {

                if (
                    Math.round(document.body.scrollLeft) == section.offsetLeft
                    && Math.round(document.body.scrollTop) == section.offsetTop
                ) {

                    clearInterval(loop);

                    sections.forEach(element => (element.id != section.id) && element.classList.remove('visible'));

                    resolve();

                }

            }, 1);

        } catch(err) {

            reject(err);

        }

    })

}


if (location.hash) {

    let section = document.querySelector(`body > main > section${location.hash}`);

    if (section) {

        waitTransition(section);

    }

}


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

        body.querySelector('form > nav > button.finish').style.display = 'none';

        footer.querySelector('form > div > label[for="refs"] > a').href = 'https://docs.github.com/en/github/writing-on-github/autolinked-references-and-urls#commit-shas';
        footer.querySelector('form').refs.pattern = '^((,\\s*)?([A-Za-z0-9][+A-Za-z0-9._-]*(\\/.+)?@)?([A-Fa-f0-9]{7}|[A-Fa-f0-9]{40}))*$';
        footer.querySelector('form').refs.placeholder = 'a5c3785, jlord@a5c3785, jlord/sheetsee.js@a5c3785, ...';
        footer.querySelector('form').refs.required = true;

        currentTarget = summary;
        summary.scrollIntoView({
            behavior: 'smooth'
        });

        waitTransition(summary).then(() => summary.querySelector('form').summary.focus());

    } else {

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

        waitTransition(scope).then(() => scope.querySelector('form').scope.focus());

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

    currentTarget = summary;
    summary.scrollIntoView({
        behavior: 'smooth'
    });

    waitTransition(summary).then(() => summary.querySelector('form').summary.focus());

};
scope.querySelector('form').onreset = function() {

    currentTarget = type;
    type.scrollIntoView({
        behavior: 'smooth'
    });

    waitTransition(type).then(() => type.querySelector('input[checked]').focus());

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

        significantChange.querySelector('form').significantChange.checked = false;

        currentTarget = significantChange;
        significantChange.scrollIntoView({
            behavior: 'smooth'
        });

        waitTransition(significantChange).then(() => significantChange.querySelector('form').significantChange.focus());

    } else {

        currentTarget = body;
        body.scrollIntoView({
            behavior: 'smooth'
        });

        waitTransition(body).then(() => body.querySelector('form').body.focus());

    }

};
summary.querySelector('form').onreset = function() {

    if (type.querySelector('form').type.value == 'revert') {

        currentTarget = type;
        type.scrollIntoView({
            behavior: 'smooth'
        });

        waitTransition(type).then(() => type.querySelector('input[checked]').focus());

    } else {

        currentTarget = scope;
        scope.scrollIntoView({
            behavior: 'smooth'
        });

        waitTransition(scope).then(() => scope.querySelector('form').scope.focus());

    }

};


body.querySelector('form').onsubmit = function(e) { e.preventDefault();

    if (e.submitter.classList.contains('finish')) {

        significantChange.querySelector('form').significantChange.checked = false;

        currentTarget = significantChange;
        significantChange.scrollIntoView({
            behavior: 'smooth'
        });

        waitTransition(significantChange).then(() => significantChange.querySelector('form').significantChange.focus());

    } else {

        currentTarget = footer;
        footer.scrollIntoView({
            behavior: 'smooth'
        });

        if (type.querySelector('form').type.value == 'revert') {

            waitTransition(footer).then(() => footer.querySelector('form').refs.focus());

        } else {

            waitTransition(footer);

        }

    }

};
body.querySelector('form').onreset = function() {

    currentTarget = summary;
    summary.scrollIntoView({
        behavior: 'smooth'
    });

    waitTransition(summary).then(() => summary.querySelector('form').summary.focus());

};


for (let text of footer.querySelectorAll('form > div > label > input[type="text"]')) {
            
    text.onblur = function() { // Standardize the message

        this.value = this.value.trim();

        this.value = this.value.split(',').map(e => e.trim()).filter(e => e).join(', ');

    };

}
footer.querySelector('form').onsubmit = function(e) { e.preventDefault();

    significantChange.querySelector('form').significantChange.checked = false;

    if (this.breakingChange.value.trim() != '')
        significantChange.querySelector('form').significantChange.checked = true;

    currentTarget = significantChange;
    significantChange.scrollIntoView({
        behavior: 'smooth'
    });

    waitTransition(significantChange).then(() => significantChange.querySelector('form').significantChange.focus());

};
footer.querySelector('form').onreset = function() {

    currentTarget = body;
    body.scrollIntoView({
        behavior: 'smooth'
    });

    waitTransition(body).then(() => body.querySelector('form').body.focus());

};


significantChange.querySelector('form').onsubmit = function(e) { e.preventDefault();

    let footerContent = [];

    if (footer.querySelector('form').closes.value.trim())
        footerContent.push(`Closes: ${footer.querySelector('form').closes.value.trim().replace(/,/g, ', closes:')}`);

    if (footer.querySelector('form').fixes.value.trim())
        footerContent.push(`Fixes: ${footer.querySelector('form').fixes.value.trim().replace(/,/g, ', fixes:')}`);

    if (footer.querySelector('form').resolves.value.trim())
        footerContent.push(`Resolves: ${footer.querySelector('form').resolves.value.trim().replace(/,/g, ', resolves:')}`);

    if (footer.querySelector('form').refs.value.trim())
        footerContent.push(`Refs: ${footer.querySelector('form').refs.value.trim()}`);

    if (footer.querySelector('form').coAuthoredBy.value.trim())
        footer.querySelector('form').coAuthoredBy.value.trim().split(', ').forEach(e => footerContent.push('Co-authored-by: '+ e))

    if (footer.querySelector('form').onBehalfOf.value.trim())
        footerContent.push('on-behalf-of: '+ footer.querySelector('form').onBehalfOf.value.trim());

    if (footer.querySelector('form').breakingChange.value.trim())
        footerContent.push(footer.querySelector('form').breakingChange.value.trim());

    result.querySelector('form').header.value = `${type.querySelector('form').type.value != 'other' ? type.querySelector('form').type.value : type.querySelector('form > div > label[for="other"] > span > input[name="otherType"]').value.trim()}${scope.querySelector('form').scope.value.trim() ? ' ('+ scope.querySelector('form').scope.value.trim() +')' : ''}${this.significantChange.checked ? '!' : ''}: ${summary.querySelector('form').summary.value.trim()}`;
    result.querySelector('form').description.innerHTML = `${body.querySelector('form').body.value.trim() ? body.querySelector('form').body.value.trim() : ''}${body.querySelector('form').body.value.trim() && footerContent.length ? '\n\n' : ''}${footerContent.length ? footerContent.join('\n') : ''}`.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>').replaceAll(' ', '&nbsp;');

    result.querySelector('form > div > fieldset > code > span.value').innerHTML = `${result.querySelector('form').header.value.trim()}${result.querySelector('form').description.innerHTML.trim() ? (!body.querySelector('form').body.value.trim() && (footer.querySelector('form').coAuthoredBy.value.trim() || footer.querySelector('form').onBehalfOf.value.trim()) ? '\n\n\n' : '\n\n') + result.querySelector('form').description.innerHTML.replaceAll('<br>', '\n') : ''}`.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>').replaceAll(' ', '&nbsp;');

    currentTarget = result;
    result.scrollIntoView({
        behavior: 'smooth'
    });

    waitTransition(result);

};
significantChange.querySelector('form').onreset = function() {

    currentTarget = footer;
    footer.scrollIntoView({
        behavior: 'smooth'
    });

    if (type.querySelector('form').type.value == 'revert') {

        waitTransition(footer).then(() => footer.querySelector('form').refs.focus());

    } else {

        waitTransition(footer);

    }

};


result.querySelector('form').onsubmit = function(e) { e.preventDefault();

    if (confirm('Do you really want to generate another commit?')) {

        type.querySelector('form > div > label[for="other"] > span').innerHTML = "<strong>other</strong>: Doesn't fit any of the suggested types?";
        type.querySelector('form').reset();
        scope.querySelector('form').reset();
        summary.querySelector('form').reset();
        body.querySelector('form').reset();
        footer.querySelector('form').reset();
        significantChange.querySelector('form').reset();

        currentTarget = type;
        type.scrollIntoView({
            behavior: 'smooth'
        });

        waitTransition(type).then(() => type.querySelector('input[checked]').focus());

    }

};
result.querySelector('form').onreset = function() {

    let checked = significantChange.querySelector('form').significantChange.checked;

    significantChange.querySelector('form').significantChange.checked = checked;

    currentTarget = significantChange;
    significantChange.scrollIntoView({
        behavior: 'smooth'
    });

    waitTransition(significantChange).then(() => significantChange.querySelector('form').significantChange.focus());

};