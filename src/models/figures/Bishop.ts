import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FiguresNames } from './Figure'
import whitelogo from '../../assets/white-bishop.png'
import blacklogo from '../../assets/black-bishop.png'

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo
    this.name = FiguresNames.BISHOP
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true
    }

    return false
  }
}
