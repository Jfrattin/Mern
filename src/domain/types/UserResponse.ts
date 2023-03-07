import { IUser } from "../interfaces/IUser.interfaces";

export type UsersResponse  = {
    users: IUser[],
    totalpages: number,
    currentpage: number
}