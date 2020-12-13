export const findStartingPositions = (board) => {
    const positions = []
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === 1) positions.push([i, 0])
    }
    return positions
}

const isValid = (i, j, board, visited) => {
    if(i < 0 || j < 0) return false
    if(i > 4 || j > 4) return false
    if (board[i][j] === 0) return false
    if (visited.has(`${i},${j}`)) return false
    return true
}

const addValidNeighbours = (current, board, queue, visited) => {
    if (isValid(current[0]+1, current[1], board, visited)) {
        queue.push([current[0]+1, current[1]])
        visited.add(`${current[0]+1},${current[1]}`)

    } 
    if (isValid(current[0]-1, current[1], board, visited)) {
        queue.push([current[0]-1, current[1]])
        visited.add(`${current[0]-1},${current[1]}`)

    } 
    if (isValid(current[0], current[1]+1, board, visited)) {
        queue.push([current[0], current[1]+1])
        visited.add(`${current[0]},${current[1]+1}`)

    } 
    if (isValid(current[0]+1, current[1]+1, board, visited)) {
        queue.push([current[0]+1, current[1]+1])
        visited.add(`${current[0]+1},${current[1]+1}`)
    }
    if (isValid(current[0]-1, current[1]+1, board, visited)) {
        queue.push([current[0]-1, current[1]+1])
        visited.add(`${current[0]-1},${current[1]+1}`)
    }
    if (isValid(current[0], current[1]-1, board, visited)) {
        queue.push([current[0], current[1]-1])
        visited.add(`${current[0]},${current[1]-1}`)
    }
    if (isValid(current[0]-1, current[1]-1, board, visited)) {
        queue.push([current[0]-1, current[1]-1])
        visited.add(`${current[0]-1},${current[1]-1}`)
    }
    if (isValid(current[0]+1, current[1]-1, board, visited)) {
        queue.push([current[0]+1, current[1]-1])
        visited.add(`${current[0]+1},${current[1]-1}`)
    }
}

export const pathExists = (board) => {
    const queue = []
    const visited = new Set()

    // Find a starting position
    queue.push(...findStartingPositions(board))
    if (queue.length === 0) return false

    let current = queue.pop()
    visited.add(`${current[0]},${current[1]}`)

    while (current !== undefined && current[1] !== 4) {
        addValidNeighbours(current, board, queue, visited)
        current = queue.pop() || undefined
    }

    return current !== undefined;
}