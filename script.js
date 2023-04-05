//Функции
//Установка пометки
function placeMarker(index){
    //Определение колонки
    let col = index % 3;
    //Определение строки
    let row = (index - col) / 3;
    //Проверка на возможность установления маркера в этом месте
    if (boardData[row][col] == 0 && gameOver == false){
        //Заполнение клетки
        boardData[row][col] = player;
        //Переход хода
        player *= -1;
        //Поставить значек на доску
        drawMarkers();
        // Проверить результат
        checkResult();
    };
};
//Постановка значка
function drawMarkers(){
    //Проверка таблицы
    for (let col = 0; col < 3; col++){
        for (let row = 0; row < 3; row++){
            if (boardData[row][col] == 1){
                //Постановка крестика
                cellElements[(row * 3) + col].classList.add('cross')
            } else if (boardData[row][col] == -1){
                //Постановка нолика
                cellElements[(row * 3) + col].classList.add('circle')
            }
        }
    }
}
//Проверка результата
function checkResult(){
    for (let i = 0; i < 3; i++){
        //Проверка строк и колонок на выйгрыш
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2]
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i]
        //Если три крестика в ряд то
        if (colSum == 3 || rowSum == 3){
            endGame(1);
            return
        //Если три нолика в ряд то
        } else if (colSum == -3 || rowSum == -3){
            endGame(2);
            return
        };
    };
    //Проверка диагоналей на выйгрыш
    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2]
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0]
    //Если три крестика в ряд то
    if (diagonalSum1 == 3 || diagonalSum2 == 3){
        endGame(1);
        return
    //Если три нолика в ряд то
    } else if (diagonalSum2 == -3 || diagonalSum2 == -3){
        endGame(2);
        return
    };
    //Проверка на ничью
    if (boardData[0].indexOf(0) == -1 && boardData[1].indexOf(0) == -1 && boardData[2].indexOf(0) == -1){
        endGame(0)
        return
    };
};
//Завершение игры
function endGame(winner){
    let h1 = document.createElement('h1')
    let div = document.createElement('div')
    div.className = 'button'
    div.innerHTML = 'Restart game'
    gameOver = true;
    //0 = ничья
    if (winner == 0){
        console.log('Draw')
        h1.innerHTML = 'Draw'
        document.body.prepend(h1)
        document.body.appendChild(div)
    } else {
        console.log(`Player ${winner} wins!!!`)
        h1.innerHTML = `Player ${winner} wins!!!`
        document.body.prepend(h1)
        document.body.appendChild(div)
    }
    let restart = document.querySelector('.button');
    //перезагрузка игры
    restart.addEventListener('click', () => {
        //все приводится в изначальное состояние
        player = 1;
        gameOver = false;
        boardData = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        //очищается доска
        cellElements.forEach(cell => {
            cell.classList.remove('cross', 'circle');
        })
        //убирается кнопка и надпись
        let h1remove = document.querySelector('h1');
        let parent = h1remove.parentNode;
        let buttonremove = document.querySelector('.button');
        let parent2 = buttonremove.parentNode;
        parent.removeChild(h1remove);
        parent2.removeChild(buttonremove);
    });
};

// Основная программа
let player = 1;
let gameOver = false;
//База данных игры
let boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
//Подключение ячеек
const cellElements = document.querySelectorAll('.cell');
//К каждой ячейке применить
cellElements.forEach((cell, index) => {
    //Добавить событие нажатия
    cell.addEventListener('click', () => {
        placeMarker(index);
    });
});