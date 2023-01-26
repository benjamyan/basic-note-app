const err = (message: string): Error => {
    return Object.assign(new Error(message as string || 'Unknown error'));
}

export default err