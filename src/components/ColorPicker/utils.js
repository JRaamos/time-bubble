const normalizeHex = value => {
    if (typeof value !== 'string') {
        return null
    }

    const sanitized = value.trim().replace('#', '')

    if (!/^[0-9a-fA-F]{6}$/.test(sanitized)) {
        return null
    }

    return `#${ sanitized.toUpperCase() }`
}

export const sanitizeHexColor = input => {
    return normalizeHex(input) || '#171C27'
}
