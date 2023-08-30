export {}
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { IGame } from '../../models/IGame';
// import { Service } from '../../API/Service';
// import { GamesSlice } from './gamesSlice';

// export interface IFilterState {
//     games: IGame[],
//     loadingFilter: boolean,
//     errorFilter: string,
//     sortBy: {
//         value: string | null,
//         data: string | null
//     };
//     filterCategory: {
//         value: string | null,
//         data: string | null
//     };
//     filterPlatform: {
//         value: string | null,
//         data: string | null
//     };
//     currentRequest: {
//         controller: AbortController | undefined,
//         promise: Promise<any> | undefined,
//     };
// };



// interface FetchGamesFilterParams {
//     sort: string | null;
//     platform: string | null;
//     category: string | null;
// }

// const initialState = {
//     loadingFilter: false,
//     errorFilter: '',
//     sortBy: {
//         value: 'без сортировки',
//         data: null
//     },
//     filterCategory: {
//         value: 'без сортировки',
//         data: null
//     },
//     filterPlatform: {
//         value: 'без сортировки',
//         data: null
//     },
//     currentRequest: {
//         controller: undefined,
//         promise: undefined,
//     },
// } as IFilterState;

// export const fetchGamesFilter = createAsyncThunk(
//     'GamesFilter/fetchGamesFilter',
//     async(params: FetchGamesFilterParams, { rejectWithValue, dispatch }) => {
//         const { sort, platform, category } = params;
//         try {
//             const controller = new AbortController();
//             const response = await Service.sortGames(sort, platform, category, controller.signal);
//             if (response.data.status === 0 ) {
//                 dispatch(GamesSlice.actions.setGames([]));
//                 return;
//             }
//             if (!response) {
//                 return rejectWithValue("Loading games error!");
//             }
//             dispatch(GamesSlice.actions.setGames(response.data));
//             return response.data;
//         } catch (e: any) {
//             return rejectWithValue(e.message);
//         }
//     }
// );

// export const GamesFilterSlice = createSlice({
//     name: 'gamesFilter',
//     initialState,
//     reducers: {
//         bySelected: (state, action) => {
//             state.sortBy.value = action.payload.value;
//             state.sortBy.data = action.payload.data;
//         },
//         platformSelected: (state, action) => {
//             state.filterPlatform.value = action.payload.value;
//             state.filterPlatform.data = action.payload.data;
//         },
//         categorySelected: (state, action) => {
//             state.filterCategory.value = action.payload.value;
//             state.filterCategory.data = action.payload.data;
//         },
//         setCurrentRequest: (state, action) => {
//             if (state.currentRequest.controller) {
//                 state.currentRequest.controller.abort();
//             }
//             state.currentRequest.controller = action.payload?.controller;
//             state.currentRequest.promise = action.payload?.promise;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchGamesFilter.pending, (state) => {
//                 state.loadingFilter = true;
//             })
//             .addCase(fetchGamesFilter.fulfilled, (state, action) => {
//                 state.loadingFilter = false;
//                 state.errorFilter = '';
//             })
//             .addCase(fetchGamesFilter.rejected, (state, action) => {
//                 state.loadingFilter = false;
//                 state.errorFilter = action.payload as string;
//             })
//     }
// })

// export const { bySelected, platformSelected, categorySelected } = GamesFilterSlice.actions;
// export default GamesFilterSlice.reducer;