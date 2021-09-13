import React, {Component} from 'react';
import {appData} from './contextdata.js';

const itemContext = React.createContext();

class ItemProvider extends Component {
    state = {
        data : appData,
        Id: '',
        Category: '',
        Item: '',
        PriceInRs: '',
        Count: '',
        updateEdit: []
    }

getData = (Id) => {
    const item = this.state.data.find(item => item.Id === Id);
    return item;
}

onEdit = (Id) => {
    const editItem = this.state.data;
    const index = editItem.indexOf(this.getData(Id));
    const selectedItem = editItem[index];
    this.setState({
        Id: selectedItem['Id'],
        Category: selectedItem['Category'],
        Item: selectedItem['Item'],
        PriceInRs: selectedItem['PriceInRs'],
        Count: selectedItem['Count']
    })
}

updateValue = (e, test) =>{
    if(test === "Category"){
        this.state.Category = e.target.value;
    }
    if(test === "Item"){
        this.state.Item = e.target.value;
    }
    if(test === "PriceInRs"){
        this.state.PriceInRs = e.target.value;
    }
    if(test === "Count"){
        this.state.Count = e.target.value;
    }
    const tempArray = [this.state.Id, this.state.Category, this.state.Item, this.state.PriceInRs, this.state.Count];
    this.setState({
        updateEdit : tempArray
    })
}

onSave = (Id) =>{
    if(Id !==""){
        const savedItem = this.state.data;
        const index = savedItem.indexOf(this.getData(Id));
        const item = savedItem[index];
        item['Category'] = this.state.updateEdit[1];
        item['Item'] = this.state.updateEdit[2];
        item['PriceInRs'] = this.state.updateEdit[3];
        item['Count'] = this.state.updateEdit[4];
        this.setState({
            data: [...this.state.data],
            Id: "", Category: "", Item: "", PriceInRs: "", Count: ""
        })
    }else{
        const MaxId = Math.max(...this.state.data.map(item => item.Id));
        const newId = MaxId + 1;
        const newArray = [];
        newArray['Category'] = this.state.updateEdit[1];
        newArray['Item'] = this.state.updateEdit[2];
        newArray['PriceInRs'] = this.state.updateEdit[3];
        newArray['Count'] = this.state.updateEdit[4];
        this.setState({
            data: [...this.state.data, newArray],
            Id: newId, Category: "", Item: "", PriceInRs: "", Count: ""
        })
    }
}

onDelete = (Id) => {
    const deleteItem = this.state.data.filter(item => item.Id !== Id);
    this.setState({
        data: deleteItem
    })
}
    render(){
        return(
            <div>
                <itemContext.Provider value={{...this.state , onEdit: this.onEdit, updateValue: this.updateValue, onSave: this.onSave, onDelete: this.onDelete}}>
                    {this.props.children}
                </itemContext.Provider>
            </div>
        )
    }
}

const ItemConsumer = itemContext.Consumer;

export {ItemProvider, ItemConsumer};