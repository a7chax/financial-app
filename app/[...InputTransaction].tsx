import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {Picker} from '@react-native-picker/picker'; 
import { TextInput } from "@/Component/TextInput";
import { Button } from "@/Component/Button";
import { v4 as uuid } from 'uuid';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNoteStore } from "./useHook/useNote";


export default function InputTransaction() {
    const [idTransaction, setIdTransaction] = useState("")
    const [inputTypeTransaction, setInputTypeTransaction] = useState("Income")
    const [inputDate, setInputDate] = useState(new Date().toLocaleDateString())
    const [inputDescription, setInputDescription] = useState("-")
    const [inputCategory, setInputCategory] = useState("Food")
    const [inputAmount, setInputAmount] = useState("")

    const router = useRouter()

    const path = useLocalSearchParams();
    const transactionId = path.InputTransaction[1]

    const addNote = useNoteStore(state => state.addNote)
    const editNote = useNoteStore(state => state.editNote)

    const getSingleNote = useNoteStore(state => state.getSingleNote)
    const note = useNoteStore(state => state.note)
    
    const addTransaction = () => {
        const data = {
            id : uuid(),
            type : inputTypeTransaction,
            date : inputDate,
            description : inputDescription,
            category : inputCategory,
            amount : parseInt(inputAmount)
        }

        try{
            addNote(data)   
            alert('Success Add Transaction')
            router.push('/')

        }catch(e){
            console.log(e)
        }
    }

    const onEditTransaction = () => {

        const data = {
            id : idTransaction,
            type : inputTypeTransaction,
            date : inputDate,
            description : inputDescription,
            category : inputCategory,
            amount : parseInt(inputAmount)
        }

        try{
            editNote(data)   
            alert('Success Edit Transaction')
            router.push('/')
        }catch(e){
            console.log(e)
        }
    }



    useEffect(() => {
        if(!transactionId){
            getSingleNote(transactionId)
        }
        if(note){
            setIdTransaction(note.id)
            setInputTypeTransaction(note.type)
            setInputDate(note.date)
            setInputDescription(note.description)
            setInputCategory(note.category)
            setInputAmount(note.amount.toString())
        }
    }, [])
    

    return(
        <View style={{padding: 20}}>
            <Text style={{fontSize : 20, fontWeight : '500'}}>{`${
                transactionId ? 'Edit Transaction' : 'Input Transaction'
            }`}</Text>
            
            {
                transactionId && (
                    <View style={{marginTop : 16, width : 'max-content'}}>
                        <Text style={{marginBottom : 8}}>ID Transaction</Text>  
                        <TextInput style={{backgroundColor : 'grey', color : 'white'}}  value={transactionId} editable={false}/>                            
                    </View> 
                )
            }


            <View style={{marginTop : 16, width : '400px'}}>
                <Text>Type Transaction</Text>  
                <Picker  
                    style={{marginTop : 8}}                  
                    selectedValue={inputTypeTransaction}
                    onValueChange={(itemValue, itemIndex) =>
                        setInputTypeTransaction(itemValue)
                    }>
                    <Picker.Item label="Income" value="Income" />
                    <Picker.Item label="Expense" value="Expense" />
                </Picker>                              
            </View>

            <View style={{marginTop : 16, width : '400px'}}>
                <Text>Category Transaction</Text>  
                <Picker  
                    style={{marginTop : 8}}
                                      
                    
                    selectedValue={inputCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setInputCategory(itemValue)
                    }>
                    <Picker.Item label="Food" value="Food" />
                    <Picker.Item label="Transporation" value="Transporation" />
                    <Picker.Item label="Gadget" value="Gadget" />
                </Picker>                              
            </View>        
            
            <View style={{marginTop : 16, width : '400px'}}>
                <Text style={{marginBottom : 8}}>Amount</Text>  
                <TextInput                  
                keyboardType="numeric"
                    onChangeText={
                        (text) => setInputAmount(text.replace(/[^0-9]/g, ''))
                    }
                    value={inputAmount}                
                />                            
            </View>      

            <View style={{marginTop : 16, width : 'max-content'}}>
                <Text style={{marginBottom : 8}}>Date</Text>  
                <TextInput style={{backgroundColor : 'grey', color : 'white'}}  value={inputDate} editable={false}/>                            
            </View>    
            
            <View style={{marginTop : 16, width : '400px'}}>
                <Text style={{marginBottom : 8}}>Description</Text>  
                <TextInput  
                    value={inputDescription}                
                    onChangeText={
                        (text) => setInputDescription(text)
                    }/>                            
            </View>   
            <View style={{marginTop : 16}}/>
            {/* <Lin    k href={"/"}> */}
            {transactionId ? <Button label="Edit Transaction" onPress={onEditTransaction}/> : <Button label="Add Transaction" onPress={addTransaction}/>}
            {/* </Link> */}
        </View>
    )
}