import axios, { AxiosResponse } from 'axios'
import { Note, PostNote } from '../model/note'
import { serverEndpoint } from '../settings'
import { UUID } from '../types/types'

export interface IServerApi {
  getNotes() : Promise<AxiosResponse<Note[]>>
  addNote(newNoteText: string) : Promise<AxiosResponse<Note>>
  getCompletedNotes() : Promise<AxiosResponse<Note[]>>
  editNote(noteId: UUID, newNoteText: string) : Promise<AxiosResponse<Note>>
  deleteNote(noteId: UUID): Promise<AxiosResponse<any>>
  setCompletionOnNote(noteId: UUID, complete: boolean): Promise<AxiosResponse<Note>>
}

class ServerApi implements IServerApi {
  getNotes () : Promise<AxiosResponse<Note[]>> {
    return axios.get<Note[]>(serverEndpoint + '/todos')
  }

  addNote (newNoteText: string) : Promise<AxiosResponse<Note>> {
    return axios.post<Note>(serverEndpoint + '/todos', <PostNote>{ text: newNoteText })
  }

  getCompletedNotes (): Promise<AxiosResponse<Note[]>> {
    return axios.get<Note[]>(serverEndpoint + '/todos/completed')
  }

  editNote (noteId: string, newNoteText: string): Promise<AxiosResponse<Note>> {
    return axios.post<Note>(serverEndpoint + `/todos/${noteId}`, <PostNote>{ text: newNoteText })
  }

  deleteNote (noteId: string): Promise<AxiosResponse<any>> {
    return axios.delete(serverEndpoint + `/todos/${noteId}`)
  }

  setCompletionOnNote (noteId: string, complete: boolean): Promise<AxiosResponse<Note>> {
    return axios.post<Note>(serverEndpoint + `/todos/${noteId}/${complete ? '' : 'in'}complete`)
  }
}

const api = new ServerApi()
export default api
