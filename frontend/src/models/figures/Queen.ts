import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FiguresNames } from './Figure'
import whitelogo from '../../assets/white-queen.png'
import blacklogo from '../../assets/black-queen.png'

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo
    this.name = FiguresNames.QUEEN
  }

  canMove (target: Cell): boolean {
    if(!super.canMove(target)) {
      return false 
    }

    if( this.cell.isEmptyVertical(target)) {
      return true    
    }

    if( this.cell.isEmptyHorizont(target)) {
      return true    
    }

    // if( this.cell.isEmptyDiagonal(target)) {
    //   return true    
    // }

    return false 
  }
}
