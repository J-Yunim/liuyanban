import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import * as models from './count'
import { RootModel } from './model'


export const store = init({
  models,
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

export default store