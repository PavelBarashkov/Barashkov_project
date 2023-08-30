import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "../routes/routes";
import { MAIN_ROUTE } from "../utils/consts";

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={MAIN_ROUTE} />} />
            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};
