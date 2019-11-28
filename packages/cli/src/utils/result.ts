export interface IResult {
  success: boolean
  data: any
  message: string
}

export const success = (data: any, message: string): IResult => ({
  success: true,
  data,
  message
})

export const fail = (err: any, message: string): IResult => ({
  success: false,
  data: err,
  message
})
