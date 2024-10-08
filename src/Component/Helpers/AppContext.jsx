'use client'

import React, {createContext, useContext, useState} from 'react'

const AppContext = createContext(); 

export const AppProvider = ({children})=>{
    const [showMenu, setShowMenu] = useState(false);
    return(
        <AppContext.Provider
        value={{
            showMenu, setShowMenu 
        }}
        >
            {children}
        </AppContext.Provider>
    )
}