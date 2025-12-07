import { IUser } from "./IUser"

export interface ISignUpResponse {
  message: string
  user: IUser
  token: string
}


