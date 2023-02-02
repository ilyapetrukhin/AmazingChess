import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FiguresNames } from './Figure'
import whitelogo from '../../assets/white-pawn.png'
import blacklogo from '../../assets/black-pawn.png'

export class Pawn extends Figure {
  isFirstStep = true
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo
    this.name = FiguresNames.PAWN
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true
    }

    return false
  }
}
