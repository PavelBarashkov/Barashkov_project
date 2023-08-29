import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../routes/routes";

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};
