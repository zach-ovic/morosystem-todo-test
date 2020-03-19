import { UUID, timestamp } from '../types/types'

export interface Note {
    id: UUID
    text: string
    completed: boolean
    createdDate: timestamp
    completedDate?: timestamp
}

export type PostNote = Pick<Note, 'text'>
