import React from 'react'
import {Route, Routes} from "react-router-dom";
import {InvestmentPage} from "./pages/InvestmentsPage";
import {DetailPage} from "./pages/DetailPage";
import {CreatePage} from "./pages/CreatePage";
import {AuthPage} from "./pages/AuthPage";
import {ItemsPage} from "./pages/ItemsPage";

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated){
        return(
            <Routes>
                <Route path="investments" element={<InvestmentPage/>}/>
                <Route path="create" element={<CreatePage/>}/>
                <Route path="detail/:id" element={<DetailPage/>}/>
                <Route path="items" element={<ItemsPage/>}/>
                <Route path="*" element={<CreatePage/>}/>
            </Routes>
        )
    }else{
        return(
            <Routes>
                <Route path="*" element={<AuthPage/>}/>
            </Routes>
        )
    }
}