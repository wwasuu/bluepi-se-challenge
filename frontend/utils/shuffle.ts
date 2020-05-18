import { ICard } from "../types"

function shuffle(array: ICard[]): ICard[] {
  return array.sort(() => Math.random() - 0.5);
}

export default shuffle
