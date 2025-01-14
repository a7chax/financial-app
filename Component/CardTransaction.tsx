import { ITransaction } from "@/app/model/Transaction";
import { Text, TouchableOpacity, View } from "react-native";


interface CardTransactionProps extends ITransaction{
    onDelete : () => void;
    onEdit : () => void;
}

export function CardTransaction(props : CardTransactionProps) : React.ReactNode{
    return(
        <View style={{padding : 8, borderWidth : 1, borderColor : 'black', marginBottom : 16, width : 300}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                <Text>{props.type}</Text>    
                <Text>{props.date}</Text>                    
            </View>

            <Text style={{marginTop : 8}}>Deskripsi</Text>            
            <Text>{props.description}</Text>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 8}}>
                <Text style={{marginTop: 4}}>{props.amount}</Text>
                <View style={{flexDirection : 'row'}}>
                    <TouchableOpacity onPress={props.onEdit} >
                        <Text style={{color : 'blue', marginRight : 8}}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onDelete} >
                        <Text style={{color : 'red'}}>
                                Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
   
        

        </View>
    )
}