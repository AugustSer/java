let newGameButton = document.getElementById('game');

let newButtonClicked = true;


newGameButton.onclick = start;


let moveCounter = 0;
let gameTime = 0;
let total = 0
let regame = window.document.querySelector('#regame')



function start() {
    let dif = document.querySelector('[name="game-difficulty"]:checked').value;
        document.querySelector('#game2').onclick = function(){
            window.location.reload()}
    if (newButtonClicked) {
        startGame(dif);
        field.style.display = "block";
        startResults();
        newButtonClicked = false; 
        difficulty.style.display = "none";
        result.style.display = "block";

    }
}

function startGame(dif) {

    const field = document.querySelector('.field');


    const cellSize = 70;

    const cells = [];

    const numbers = [...Array(dif * dif - 1).keys()].sort(() => Math.random() - 0.5);

    for (let i = 0; i <= dif * dif - 2; i++) {
       
        const cell = document.createElement('div');
        const value = numbers[i] + 1;
        cell.className = 'cell';

        cell.innerHTML = value;

     
        const left = i % dif;
  
        const top = (i - left) / dif;

  
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell
        });

  
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        field.append(cell);


        cell.addEventListener('click', () => {
            move(i);
        })
    }


    const empty = {
        value: dif * dif,
        top: dif - 1,
        left: dif - 1,
    }

    cells.push(empty);


    function move(index) {

        const cell = cells[index];

  
        const leftDiff = Math.abs(empty.left - cell.left);
        const topDiff = Math.abs(empty.top - cell.top);

   
        if (leftDiff + topDiff > 1) {
            return;
        }
        moveCounter++;
     
        cell.element.style.left = `${empty.left * cellSize}px`;
        cell.element.style.top = `${empty.top * cellSize}px`;

     
        const emptyLeft = empty.left;
        const emptyTop = empty.top;

    
        empty.left = cell.left;
        empty.top = cell.top;

     
        cell.left = emptyLeft;
        cell.top = emptyTop;

  
        const isFinished = cells.every(cell => {
        
            return cell.value === cell.top * dif + cell.left + 1;
        });

        if (isFinished) {

            document.write("<span style='color:green;font:70px Tahoma;'>Вы собрали паззл за ",gameTime," секунд и ",moveCounter," ходов</span>")

            setTimeout(function(){
                window.location.reload();
            }, 3000)

        }
    }

}



function startResults() {
    const moveContainer = document.querySelector('.move-text');
    const timeContainer = document.querySelector('.time-text');
    moveContainer.innerHTML = '' + moveCounter;
    timeContainer.innerHTML = '' + gameTime;

    const movesUpdate = setInterval(
        () => {
            moveContainer.innerHTML = '' + moveCounter;
        },
        100);

    const gameInterval = setInterval(
        () => {
            timeContainer.innerHTML = '' + ++gameTime;
        },
        1000);
}
