import { ThemeProvider } from 'styled-components/native'
import { night } from './night' 

export function ThemeContext({ children }){
    return (
        <ThemeProvider theme={night}>
            { children }
        </ThemeProvider>
    )
} 
