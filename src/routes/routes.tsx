import React from "react";
import { GameInfo } from "../pages/GameInfo";
import { Main } from "../pages/Main";
import { MAIN_ROUTE, GAME_INFO_ROUTE} from "./consts";
import { ErrorPage } from "../pages/ErrorPage";

interface Path {
    path: string
    element: React.ReactNode,
}

export const publicRoutes: Path[] = [
    {
        path: MAIN_ROUTE,
        element: <Main/>
    },
    {
        path: GAME_INFO_ROUTE + '/:id',
        element: <GameInfo/>
    },
    {
        path: '/*',
        element: <ErrorPage/>
    }
]
