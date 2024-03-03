import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FiguresNames } from './Figure'
import whitelogo from '../../assets/white-rock.png'
import blacklogo from '../../assets/black-rock.png'

export class Servant extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo
    this.name = FiguresNames.SERVANT
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    return true
  }
}
