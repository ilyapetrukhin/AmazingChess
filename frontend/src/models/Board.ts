import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";
import { QUEEN } from "./figures/Queen";

export class Board {
    cells: Cell[][] = []

    public initCells() {
        for (let i=0 ; i < 8; i++ ) {
            const row: Cell[] = []
            for (let j=0; j < 8; j++ ) {
                if (((i + j) % 2 !==0 )) {
                    row.push(new Cell(this,j,i,Colors.BLACK,null))
                } else {
                    row.push(new Cell(this,j,i,Colors.WHITE,null))
                }
            }
            this.cells.push(row)
        }
    }

    public getCell(x:number, y: number){
        return this.cells[y][x]
    }

    public addFigures() {
        // new QUEEN(Colors.WHITE, this.getCell(3,3)) 
        // new QUEEN(Colors.WHITE, this.getCell(3,6)) 
        // new Pawn(Colors.WHITE, this.getCell(3,4)) 
        this.addPawns()
    }

    private addPawns() {
        for(let i=0; i<8; i++){
            new Pawn(Colors.WHITE, this.getCell(i,6))
            new Pawn(Colors.BLACK, this.getCell(i,1))
        }
    }
}
