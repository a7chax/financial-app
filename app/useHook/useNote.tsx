import { create } from 'zustand'
import { getItem, removeItem, setItem } from '../utils/asyncStorage'
import { ITransaction } from '../model/Transaction'
import {v4 as uuid} from 'uuid'


export const useBearStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))

export const useNoteStore = create((set) => ({
    notes : [],
    note : '',                  
    // addNote : (note) => set((state) => ({notes : [...state.notes, note]})),
    fetchNote : async () => {
        const notes = await getItem('data')
        if(notes){
            set({notes})
        }
    },
    addNote : async (note : ITransaction) => {
        const notes : ITransaction[] = await getItem('data')
        if(notes === null){
            await setItem('data', [note])
        }else{
            notes.push(note)
            await removeItem('data')
            await setItem('data', notes)
        }   
    },
    deleteNote : async (id : string) => {
        const notes : ITransaction[] = await getItem('data')
        const newNotes = notes.filter((note) => note.id !== id)
        await removeItem('data')
        await setItem('data', newNotes)
    },
    getSingleNote : async (id: string) => {
        const notes = await getItem('data')
        const note = notes.find((item) => item.id === id)
        console.log(notes, 'notenya')
        set({note : note})
    },
    editNote : async (note : ITransaction) => {
        const notes : ITransaction[] = await getItem('data')
        const index = notes.findIndex((item) => item.id === note.id)
        notes[index] = note
        console.log(note, 'updatednote')
        await removeItem('data')
        await setItem('data', notes)
        if(notes){
            set({notes})
        }
    }   

}))