import { configureStore } from "@reduxjs/toolkit";
import {expreducer,resetRed} from './slice'

export const store = configureStore({
    reducer: {
        recepie:expreducer,
        reset:resetRed
                                     // profile is the unique  name  in slice and  userProfile is the exported value
    }
  })
