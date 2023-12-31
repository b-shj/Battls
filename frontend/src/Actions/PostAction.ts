import '../Interfaces/PollData'
import { PollData } from '../Interfaces/PollData'

// ACTIONS
export const addPost = (postObj: PollData) => {
    return {
        type: "ADD_POST",
        payload: postObj
    }

}


// INTERFACES
export interface addPostAction{
    type: string,
    payload: PollData
}