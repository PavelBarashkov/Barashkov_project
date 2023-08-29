import { IGame } from "./IGame";

export interface IGameInfo extends IGame {
    status: string,
    minimum_system_requirements: {
        os: string,
        processor: string,
        memory: string,
        graphics : string,
        storage: string
    },
    screenshots: [{
        id: number,
        image: string
    }]
}