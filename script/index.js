// Init classes
class Element {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.display = true
    }
}

class Diamonds extends Element {
    constructor(x, y) {
        super(x, y)
        this.type = 1
    }
}
class Hearts extends Element {
    constructor(x, y) {
        super(x, y)
        this.type = 2
    }
}
class Spades extends Element {
    constructor(x, y) {
        super(x, y)
        this.type = 3
    }
}
class Clubs extends Element {
    constructor(x, y) {
        super(x, y)
        this.type = 4
    }
}

// Init object
function createElement(type, x, y) {
    switch (type) {
        case 1:
            return new Diamonds(x, y)
        case 2:
            return new Hearts(x, y)
        case 3:
            return new Spades(x, y)
        case 4:
            return new Clubs(x, y)
        default:
            return {}
    }
}

// Random type element
function generateTypeElement() {
    return Math.floor(Math.random() * 4) + 1
}

// HTML code
function addIconForElement(type) {
    if (type === 1) {
        return "&#9830;"
    } else if (type === 2) {
        return "&#9829;"
    } else if (type === 3) {
        return "&#9824;"
    } else if (type === 4) {
        return "&#9827;"
    }
}

// Remove neighbor elements
function pickElement(x, y, type, arr) {
    arr[x][y].display = false
    let elementDOM = document.querySelector(`td[x="${x}"][y="${y}"]`)
    elementDOM.id = "hide"

    if (x + 1 < arr.length) {
        if (arr[x + 1][y].type === type && arr[x + 1][y].display === true) {
            pickElement(x + 1, y, type, arr)
        }
    }
    if (x - 1 >= 0) {
        if (arr[x - 1][y].type === type && arr[x - 1][y].display === true) {
            pickElement(x - 1, y, type, arr)
        }
    }
    if (y + 1 < arr[0].length) {
        if (arr[x][y + 1].type === type && arr[x][y + 1].display === true) {
            pickElement(x, y + 1, type, arr)
        }
    }
    if (y - 1 >= 0) {
        if (arr[x][y - 1].type === type && arr[x][y - 1].display === true) {
            pickElement(x, y - 1, type, arr)
        }
    }
    return arr
}

// Render table in DOM
function renderTable(newPlayingField) {
    function createRow(x) {
        let tr = document.createElement('tr');
        tr.className = 'chess_row'
        return createColumn(x, tr)
    }

    function createColumn(x, rowElement) {
        for (let y = 0; y < 7; y++) {
            let td = document.createElement('td');
            td.setAttribute("x", x)
            td.setAttribute("y", y)
            td.innerHTML = addIconForElement(newPlayingField[x][y].type)
            td.addEventListener("click", (e) => {
                render(x, y)
            })
            rowElement.append(td)
        }
        return rowElement
    }

    // Create playing field
    let field = document.querySelector(".playing_field")

    for (let i = 0; i < newPlayingField.length; i++) {
        field.append(createRow(i));
    }

}

// Rerender table
function render(x, y) {
    playingField = pickElement(x, y, playingField[x][y].type, playingField)
}

// Init data

let playingField = new Array(6).fill(null).map(item => (new Array(7).fill(null)))

for (let i = 0; i < playingField.length; i++) {
    for (let j = 0; j < playingField[i].length; j++) {
        playingField[i][j] = createElement(generateTypeElement(), i, j)
    }
}

renderTable(playingField)
