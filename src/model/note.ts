import { UUID, timestamp } from '../helpers'

export interface Note {
    id: UUID
    text: string
    completed: boolean
    createdDate: timestamp
    completedDate?: timestamp
}

export type PostNote = Pick<Note, 'text'>
