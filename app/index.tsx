import {  FlatList, ScrollView, Text, TextInput, View } from "react-native";
import {Button} from '../Component/Button'
import { Link, useFocusEffect, useRouter } from "expo-router";
import { getLocalStorage, setLocalStorage } from "./common/storage";
import React, { useEffect, useState } from "react";
import { useBearStore, useNoteStore } from "./useHook/useNote";
import { getItem, setItem } from "./utils/asyncStorage";    
import { CardTransaction } from "@/Component/CardTransaction";

export default function HomePage(){

    const router = useRouter()



    const increasePopulation = useBearStore((state) => state.increasePopulation)

    const getNote = useNoteStore(state => state.notes)

    const fetchNoteFromStorage = useNoteStore(state => state.fetchNote)
    const deleteNote = useNoteStore(state => state.deleteNote)


    const onDeleteNote = (id) => {
        deleteNote(id)  
        fetchNoteFromStorage()
        window.location.reload()
    }



    useEffect(() => {
        fetchNoteFromStorage()
        // window.location.reload()
    },[])



    
    return (
        <ScrollView style={{padding: 20}}>
            <Text>List Transaction</Text>
            <View style={{marginTop : 16}}/>
            <Link href="/InputTransaction">
                <Button label="Add Transaction" onPress={increasePopulation}/>
            </Link>
            <FlatList
            style={{marginTop : 16}}
            data={getNote}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <View>
                    <CardTransaction 
                    onDelete={() => onDeleteNote(item.id)}
                    onEdit={() => router.push(`/InputTransaction/${item.id}`)}
                    {...item}/>
                </View>
            )}

        />
   
        </ScrollView>
    )
}