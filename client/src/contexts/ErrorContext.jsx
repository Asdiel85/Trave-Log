import { createContext, useState } from "react";

export const ErrorContext = createContext(null)

export default function ErrorProvider({children}) {
    const [errorMessage, setErrorMessage] = useState(null)

    return (
        <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
            {children}
        </ErrorContext.Provider>
    )
}