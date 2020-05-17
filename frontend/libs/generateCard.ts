import shuffle from '../utils/shuffle'

const number = [1,2,3,4,5,6]

const generateCard = (): any[] => { 
    return shuffle([...number, ...number]).map((x, i) => ({
        id: i,
        value: x,
        isOpen: false
    }))
}

export default generateCard