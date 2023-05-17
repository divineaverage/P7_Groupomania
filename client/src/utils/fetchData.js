import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [dataUser, setDataUser] = useState([])
    const LStoken = localStorage.getItem('token')
    const userId = localStorage.getItem('id')
    const [dataUserId, setDataUserId] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3001/api/user/${userId}`)
            .then((response) => {
                console.log(response.data)
                setDataUserId(response.data.id)
                setDataUser(response.data)
            })
    }, [])

    return (
        <DataContext.Provider value={{
            dataUser, LStoken, dataUserId
        }}>
            {children}
        </DataContext.Provider>
    )
}



export default DataContext;