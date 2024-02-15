import { APPSTATE } from "../utils";
import { Status } from "@/types/Status";


export interface Player extends APPSTATE {
    token: string,
    sessions: string[],

}

export enum Actions {
    SET_NAME
}

const initialState: Player = {
    token: "",
    AppStatus: Status.Idle,
    sessions: []
}

const reducer = (state, action): Player => {
    switch (action.state) {
        case Actions.SET_NAME:
            return {
                ...state,
                AppStatus: Status.Idle,
            }
        default: return state;
    }
}

export default [reducer, initialState];