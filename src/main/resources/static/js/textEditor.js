//internal variables
var show = false;

//textAreaSelector
const textAreaSelector = document.getElementById('text-editor');

//buttonsToolbar
var buttonsToolbar = document.createElement('div');
buttonsToolbar.setAttribute('id', 'buttonsToolbar');
///buttonsToolbar

//textEditor
var textEditor = document.createElement('div');
textEditor.setAttribute('id', 'textEditor');
textEditor.setAttribute('contentEditable', 'true');
///textEditor

//functions
function insertAfter (insertObject) {
    insertObject.forEach(insertObj => {
        insertObj.reference.parentNode.insertBefore(insertObj.new, insertObj.reference.nextSibling);
    });
}

var buttons = [
    {
        name: 'alignLeft',
        cmd: 'justifyLeft',
        icon: 'fas fa-align-left'
    },
    {
        name: 'alignCenter',
        cmd: 'justifyCenter',
        icon: 'fas fa-align-center'
    },
    {
        name: 'alignJustify',
        cmd: 'justifyFull',
        icon: 'fas fa-align-justify'
    },
    {
        name: 'alignRight',
        cmd: 'justifyRight',
        icon: 'fas fa-align-right'
    },
    {
        name: 'bold',
        cmd: 'bold',
        icon: 'fas fa-bold'
    },
    {
        name: 'italic',
        cmd: 'italic',
        icon: 'fas fa-italic'
    },
    {
        name: 'underline',
        cmd: 'underline',
        icon: 'fas fa-underline'
    },
    {
        name: 'insertOrderedList',
        cmd: 'insertOrderedList',
        icon: 'fas fa-list-ol'
    },
    {
        name: 'insertUnorderedList',
        cmd: 'insertUnorderedList',
        icon: 'fas fa-list-ul'
    },
    {
        name: 'insertImage',
        cmd: 'insertImage',
        icon: 'fas fa-image'
    },
    {
        name: 'insertLink',
        cmd: 'createLink',
        icon: 'fas fa-link'
    },
    {
        name: 'showCode',
        cmd: 'showCode',
        icon: 'fas fa-code'
    },
];

buttons.forEach(button => {
    //buttonElement
    let buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.setAttribute('id', button.name);
    ///buttonElement

    //buttonIcon
    let buttonIcon = document.createElement('i');
    buttonIcon.setAttribute('class', button.icon);
    ///buttonIcon

    buttonElement.addEventListener('click', () => {
        let current = document.getElementsByClassName('active');

        if (current.length > 0) {
            current[0].classList.remove('active');
        }

        buttonElement.classList.add('active');

        switch (button.cmd) {
            case 'insertImage':
                url = prompt('Enter image link here: ', '');
                if (url) {
                    document.execCommand(button.cmd, false, url);
                }

                const images = textEditor.querySelectorAll('img');

                images.forEach(img => {
                    img.style.maxWidth = '500px';
                });
                break;

            case 'createLink':
                url = prompt('Enter URL link here: ', '');
                text = prompt('Enter link text here: ', '');
                if (url && text) {
                    document.execCommand(
                        'insertHTML',
                        false,
                        `<a href=${url} target='_blank'>${text}</a>`
                    );
                }

                const links = textEditor.querySelectorAll('a');

                links.forEach(lnk => {
                    lnk.target = '_blank';

                    lnk.addEventListener('mouseover', () => {
                        textEditor.setAttribute('contentEditable', 'false');
                    });

                    lnk.addEventListener('mouseout', () => {
                        textEditor.setAttribute('contentEditable', 'true');
                    });
                });
                break;

            case 'showCode':
                if (show) {
                    buttonElement.classList.remove('active');
                    textEditor.innerHTML = textEditor.textContent;
                    show = false;
                } else {
                    textEditor.textContent = textEditor.innerHTML;
                    show = true;
                }
                break;

            default:
                document.execCommand(button.cmd, false, null);
                break;
        }
    });

    buttonElement.appendChild(buttonIcon);
    buttonsToolbar.appendChild(buttonElement);
});

insertAfter([
    {
        reference: textAreaSelector,
        new: textEditor
    },
    {
        reference: textAreaSelector,
        new: buttonsToolbar
    }
]);

textAreaSelector.remove();


function clearFunction() {
    $("#messageValue").val('');
}

$("#textEditor").keyup(function () {
    clearFunction();
    $("#messageValue").val($(this).html())
})
