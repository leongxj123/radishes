import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { getSongUrl, getSongDetail } from './api/index'
import { State, Getter } from './state'
import { RootState } from '@/store/index'

export const enum Actions {
  SET_MUSIC = 'SET_MUSIC_URL',
  SET_MUSIC_DEFAILT = 'SET_MUSIC_DEFAILT'
}

export const enum Mutations {
  PLAY_MUSIC = 'PLAY_MUSIC',
  PAUES_MUSIC = 'PAUES_MUSIC',
  ENDED_MUSIC = 'ENDED_MUSIC',
  CURRENT_TIME = 'CURRENT_TIME',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  CAN_PLAY = 'CAN_PLAY'
}

export const getters: GetterTree<State, RootState> = {
  musicDetail(state) {
    return Object.assign(state.music || {}, {
      url: state.musicUrl
    })
  }
}

export const actions: ActionTree<State, RootState> = {
  async [Actions.SET_MUSIC]({ state, dispatch }, id: number) {
    const data = await getSongUrl(id)
    if (state.sourceElement && state.audioElement) {
      if (data.length) {
        state.musicUrl = data[0].url
        state.sourceElement.src = data[0].url
        state.audioElement.load()
        dispatch(Actions.SET_MUSIC_DEFAILT, id)
      }
    }
  },
  async [Actions.SET_MUSIC_DEFAILT]({ state }, id: number | number[]) {
    const data = await getSongDetail(id)
    if (data.length) {
      state.music = data[0]
    }
  }
}

export const mutations: MutationTree<State> = {
  [Mutations.PLAY_MUSIC](state) {
    if (state.audioElement && !state.playing && state.canplay) {
      state.audioElement.play()
      state.playing = true
    }
  },
  [Mutations.PAUES_MUSIC](state) {
    if (state.audioElement && state.playing && state.canplay) {
      state.audioElement.pause()
      state.playing = false
    }
  },
  [Mutations.ENDED_MUSIC](state) {
    state.playing = false
  },
  [Mutations.CURRENT_TIME](state, time: number) {
    state.currentTime = time
  },
  [Mutations.SET_CURRENT_TIME](state, time: number) {
    if (state.audioElement) {
      state.audioElement.currentTime = time
    }
  },
  [Mutations.CAN_PLAY](state) {
    state.canplay = true
  }
}
