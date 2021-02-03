describe("#makeBoard", function () {
    const completeBoard = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];///This array works for width = 7 and height = 6;
    const test_HEIGHT = 6;
    const test_WIDTH = 7;
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
        expect(test_board).toEqual(completeBoard);
    });
});





