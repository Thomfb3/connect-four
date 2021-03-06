//Update to reflect main game variables
const test_HEIGHT = 6;
const test_WIDTH = 7;

describe("#makeBoard", function () {
    //update this const to reflect the main game variables
    let completeBoard_6x7 = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ];///This array works for width = 7 and height = 6;
    const test_board = [];

    //same function as makeBoard but this manipulates test variables
    function test_makeBoard() {
        const boardRow = Array(test_WIDTH).fill(null);
        for (let i = 0; i < test_HEIGHT; i++) {
            test_board.push(boardRow);
        }
    };

    test_makeBoard()

    it("should return board - an array of arrays containing nulls based on height and width variables", function () {
        expect(test_board).toEqual(completeBoard_6x7);
    });
});


describe("#makeHtmlBoard", function () {
    const tds = document.querySelectorAll("td");
    const tdArray = [...tds];
    const topRow = document.querySelector("tr");
    const topId = topRow.getAttribute("id");
    const lastCellId = `${test_HEIGHT - 1}-${test_WIDTH - 1}`;

    it("should find the top column id", function () {
        expect(topId).toEqual("column-top");
    });

    it("should return the right number of board cells", function () {
        expect(tdArray.length).toEqual((test_HEIGHT + 1) * test_WIDTH);
    });

    it("should return the right id for the first cell", function () {
        expect(tdArray[0].getAttribute("id")).toEqual("0");
    });

    it("should return the right id for the last", function () {
        expect(tdArray[tdArray.length - 1].getAttribute("id")).toEqual(lastCellId);
    });
});


describe("#placeInTable", function () {
    const x = 6;
    const y = 5;
    const cell = document.getElementById(`${y}-${x}`);
    placeInTable(y, x);

    it("should detect childNode in appropriate cell", function () {
        expect(cell.childNodes.length).toEqual(1);
    });
});


describe("#checkBoardIsFull", function () {
    let testBoard_allNulls = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ];
    let testBoard_oneNull = [
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", null, "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"]
    ];
    let testBoard_firstNull = [
        [null, "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"]
    ];
    let testBoard_lastNull = [
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", null]
    ];
    let testBoard_noNulls = [
        ["hi", "null", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "null", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"],
        ["hi", "null", "hi", "world", "hi", "world"],
        ["hi", "world", "hi", "world", "hi", "world"]
    ];

    it("should return false because array contains null", function () {
        expect(checkBoardIsFull(testBoard_allNulls)).toEqual(false);
    });

    it("should return false because array contains null", function () {
        expect(checkBoardIsFull(testBoard_oneNull)).toEqual(false);
    });

    it("should return false because array contains null", function () {
        expect(checkBoardIsFull(testBoard_firstNull)).toEqual(false);
    });

    it("should return false because array contains null", function () {
        expect(checkBoardIsFull(testBoard_lastNull)).toEqual(false);
    });

    it("should return true because array does not contain null", function () {
        expect(checkBoardIsFull(testBoard_noNulls)).toEqual(true);
    });
});


describe("#findSpotForCol", function () {
    let testBoard_allNulls = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]
    let testBoard_someNums = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, 1, null, 2],
        [2, null, 1, null, 2, 1, 1]
    ]
    //// Test version of findSpotForCol
    function test_findSpotForCol(x, boardArray) {
        let y = null;

        for (let i = HEIGHT - 1; i >= 0; i--) {
            if (boardArray[i][x] === null) {
                y = i;
                break;
            }
        }
        return y;
    } 

    it("should detect childNode in appropriate cell", function () {
        expect(test_findSpotForCol(1, testBoard_allNulls)).toEqual(5);
    });
    it("should detect childNode in appropriate cell", function () {
        expect(test_findSpotForCol(3, testBoard_allNulls)).toEqual(5);
    });
    it("should detect childNode in appropriate cell", function () {
        expect(test_findSpotForCol(6, testBoard_someNums)).toEqual(3);
    });
    it("should detect childNode in appropriate cell", function () {
        expect(test_findSpotForCol(0, testBoard_someNums)).toEqual(4);
    });
});














