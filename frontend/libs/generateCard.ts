import { v4 as uuidv4 } from 'uuid'
import shuffle from '../utils/shuffle'
import { ICard } from "../types"

const number = [1,2,3,4,5,6]

const generateCard = (): ICard[] => { 
    const cards: any[] = [...number, ...number].map((x: number) => ({
        id: uuidv4(),
        value: x,
        isOpen: false
    }))
    return shuffle(cards)
}

export default generateCard