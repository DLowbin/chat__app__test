import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType } from './todoTypes';
import { RootState } from '~/app/store';

const initialState: FilterType = null as FilterType;

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCurrentFilter: (_state: FilterType, action: PayloadAction<FilterType>): FilterType => {
			return action.payload;
		},
	},
});

export const selectCurrentFilter = (state: RootState): FilterType => state.filter;
export const { setCurrentFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
