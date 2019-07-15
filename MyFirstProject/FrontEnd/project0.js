function makeDOM(here) {
    let elem = document.querySelector("#li-list");
    elem.remove();

    let list = document.getElementById('posts-menu');
    let span = document.getElementById('list');
    let ul = document.createElement('ul');
    ul.id = 'li-list';
    list.appendChild(ul).after(span);
    let form = document.getElementById('three');

    for (let i = 0; i < here.length; i++) {
        let li = document.createElement('li');
        li.className = "doubt";
        li.textContent = `${JSON.stringify(here[i])}`;
        ul.appendChild(li);

        li.addEventListener('click', function () {
            let four = document.getElementById('four');
            four.style.visibility = "hidden";
            let title = document.getElementById('reTitle');
            title.defaultValue = " ";
            let body = document.getElementById('reBody');
            body.defaultValue = " ";
            form.style.visibility = "visible";
            let sheet = document.getElementById('one');
            sheet.style.visibility = "hidden";
            let div = document.getElementById("EditDeleteSheet");
            div.textContent = `${JSON.stringify(here[i])}`;
        })
    }
}

function Menu(options) {
    options = document.getElementById('posts-menu');
    let elem = options;

    elem.onmousedown = function () {
        return false;
    };
    elem.onclick = function (event) {
        if (event.target.closest('.list')) {
            elem.classList.toggle('open');
        }
    }
}

function addPostAction() {
    let butt = document.getElementById('addPost');

    butt.addEventListener('click', function () {
        let addPost = document.getElementById('one');
        addPost.style.visibility = "visible";
    });

}

async function SaveActionPost() {
    let $save = document.getElementById('Save');

    $save.addEventListener('click', async function () {
        let title = document.getElementById("title").value;
        let body = document.getElementById("body").value;
        let show = document.getElementById('two');
        show.style.visibility = "visible";

        fetch(`http://localhost:4000/api/books`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body}),
        })
            .then(response => response.json())
            .then(response => {
                fetch(`http://localhost:4000/api/books`, {
                    method: 'GET',
                    mode: "cors",
                    cache: "default",
                    redirect: "follow",
                    referrer: 'no-referrer'
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {
                        makeDOM(response);
                    })
            })
    });
}

function DeleteEditIdHelper() {
    let content = document.getElementById('EditDeleteSheet');
    let xt = JSON.parse(content.textContent);
    console.log(xt);
    let ans;
    ans = xt.id;
    console.log(ans);
    return ans;
}

async function DeleteAction() {
    let del = document.getElementById('Delete');
    let div = document.getElementsByClassName('EditDeleteSheet');
    div.defaultValue = ' ';
    del.addEventListener('click', function () {
        let id = DeleteEditIdHelper();
        div.textContent = ' ';
        fetch(`http://localhost:4000/api/books/${id}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Content-Type': 'application.json'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                makeDOM(response);
            })
    })
}

async function EditAction() {
    let edit = document.getElementById('Edit');

    edit.addEventListener('click', function () {
        let sheet = document.getElementById('four');
        sheet.style.visibility = "visible";
        let id = DeleteEditIdHelper();

        fetch(`http://localhost:4000/api/books/${id}`, {
            method: 'GET',
            mode: "cors",
            cache: "default",
            redirect: "follow",
            referrer: 'no-referrer'
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                let a = JSON.stringify(response);
                let b = JSON.parse(a);
                let reTitle = document.getElementById('reTitle');
                let reBody = document.getElementById('reBody');
                reTitle.defaultValue = `${b.title}`;
                reBody.defaultValue = `${b.body}`;
            })
    });
}

function PutAction() {
    let put = document.getElementById('Put');
    let four = document.getElementById('four');
    let three = document.getElementById('three');

    put.addEventListener('click', function () {
        let id = DeleteEditIdHelper();
        four.style.visibility = "hidden";
        three.style.visibility = "hidden";
        let title = document.getElementById('reTitle').value;
        let body = document.getElementById('reBody').value;
        fetch(`http://localhost:4000/api/books/${id}`, {
            method: 'PUT',
            mode: "cors",
            cache: "default",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            referrer: 'no-referrer',
            body: JSON.stringify({title, body}),
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                makeDOM(response);
            })
    })
}

document.addEventListener("DOMContentLoaded", SaveActionPost);
document.addEventListener('DOMContentLoaded', Menu);
document.addEventListener('DOMContentLoaded', addPostAction);
document.addEventListener("DOMContentLoaded", EditAction);
document.addEventListener("DOMContentLoaded", DeleteAction);
document.addEventListener("DOMContentLoaded", PutAction);