interface IData {
    value: string,
    data: string
}

export const listPlatform: IData[] = [
    {
        value: 'PC (Windows)',
        data: 'pc'
    },
    {
        value: 'Web Browser',
        data: 'browser'
    }
];

export const listCotegory: IData[] = [
    {
        value: 'Shooter',
        data: 'shooter'
    },
    {
        value: 'MMOARPG',
        data: 'action-rpg'
    },
    {
        value: 'ARPG',
        data: 'action-rpg'
    },
    {
        value: 'Strategy',
        data: 'strategy'
    },
    {
        value: 'MMORPG',
        data: 'mmorpg'
    },
    {
        value: 'Fighting',
        data: 'fighting'
    },
    {
        value: 'Action RPG',
        data: 'action-rpg'
    },
    {
        value: 'Battle Royale',
        data: 'battle-royale'
    },
    {
        value: 'MOBA',
        data: 'moba'
    },
    {
        value: 'Sports',
        data: 'sports'
    },
    {
        value: 'Racing',
        data: 'racing'
    },
    {
        value: 'Card',
        data: 'card'
    },
];


export const ListSortBy: IData[] = [
    {
        value: 'Release date',
        data: 'release-date'
    },
    {
        value: 'Popularity',
        data: 'popularity'
    },
    {
        value: 'Alphabetical',
        data: 'alphabetical'
    },
    {
        value: 'Relevance',
        data: 'relevance'
    },
];
