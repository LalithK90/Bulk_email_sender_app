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
function insertAfter(insertObject) {
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
    textEditorSize();
})

$(document).ready(function () {
    textEditorSize();
})

function textEditorSize() {
    let html = $("#textEditor").html();
    if (html.length === 0) {
        $("#textEditor").attr("class", "textEditor")
    } else {
        $("#textEditor").removeAttr("class")
    }
}

let email_list = [];

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

(function ($) {
    $.fn.multipleInput = function () {
        return this.each(function () {
            // list of email addresses as unordered list
            $list = $('<ul/>');
            // input
            var $input = $('<input type="email" id="email_search" class="email_search multiemail"/>').keyup(function (event) {
                if (event.which === 13 || event.which === 32 || event.which === 188) {
                    if (event.which === 188) {
                        var val = $(this).val().slice(0, -1);// remove space/comma from value
                    } else {
                        var val = $(this).val(); // key press is space or comma
                    }
                    if (validateEmail(val)) {
                        // append to list of emails with remove button
                        $list.append($('<li class="multipleInput-email"><span>' + val + '</span></li>')
                            .append($('<a href="#" class="multipleInput-close" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">\n' +
                                '  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>\n' +
                                '  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\n' +
                                '</svg></a>')
                                .click(function (e) {
                                    let email_lists = [];

                                    let click = $(this).parent()[0].innerHTML;
                                    let first_part = click.split(`</span>`)[0];
                                    let second_part = first_part.split('>')[1];

                                    for (let i = 0; i < email_list.length; i++) {
                                        if (email_list[i] !== second_part) {
                                            email_lists.push(email_list[i]);
                                        }
                                    }

                                    email_list = null;
                                    email_list = email_lists;

                                    emailListCreate();
                                    $(this).parent().remove();
                                   e.preventDefault();
                                })
                            )
                        );
                        $(this).attr('placeholder', 'Enter email');
                        let email = $(this).val();
                        email_list.push(email.split(',')[0]);
                        emailListCreate();
                        // empty input
                        $(this).val('');
                    } else {
                        swal({
                            title: "Check Again!",
                            text: "Please enter valid email id, Thanks!",
                            icon: "error",
                        });
                    }
                }
            });
            // container div
            var $container = $('<div class="multipleInput-container" />').click(function () {
                $input.focus();
            });
            // insert elements into DOM
            $container.append($list).append($input).insertAfter($(this));
            return $(this).hide();
        });
    };
})(jQuery);
$('#recipient_email').multipleInput();

function emailListCreate() {
    $('#created_email').val(email_list);
}