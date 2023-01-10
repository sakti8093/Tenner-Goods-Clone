export const setCart = (product) => {
    return {
        type: 'SET_PRODUCT',
        payload: product
    }
}

export const increaseCart = () => {
    return {
        type: 'INCREASE_PRODUCT',
    }
}

export const decreaseCart = () => {
    return {
        type: 'DECREASE_PRODUCT',
    }
}

export const startLoading = () => {
    return {
        type : 'START_LOADING'
    }
}

export const stopLoading =() => {
    return {
        type: 'STOP_LOADING'
    }
}