import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Laboratory } from '../services/interface';

interface LaboratoryState {
    laboratories: Laboratory[];
}

const initialState: LaboratoryState = {
    laboratories: [],
};

const laboratorySlice = createSlice({
    name: 'laboratory',
    initialState,
    reducers: {
        addLaboratory: (state, action: PayloadAction<Laboratory>) => {
            state.laboratories.push(action.payload);
        },
        updateLaboratory: (state, action: PayloadAction<Laboratory>) => {
            const index = state.laboratories.findIndex(lab => lab.id === action.payload.id);
            if (index !== -1) {
                state.laboratories[index] = action.payload;
            }
        },
        deleteLaboratory: (state, action: PayloadAction<string>) => {
            state.laboratories = state.laboratories.filter(lab => lab.id !== action.payload);
        },
        setLaboratories: (state, action: PayloadAction<Laboratory[]>) => {
            state.laboratories = action.payload;
        },
    },
});

export const { addLaboratory, updateLaboratory, deleteLaboratory, setLaboratories } = laboratorySlice.actions;
export default laboratorySlice.reducer;
