import React, {Component} from 'react';
import {ItemConsumer} from './context.js';
import {Table, Button} from 'react-bootstrap';

export default class Home extends Component {
    render(){
        return(
            <div classNane="container">
                <h3>Basic CRUD app with Context</h3>
                <ItemConsumer>
                    {(value) => {
                        return(
                            <Table size="sm" variant="light" striped bordered hover>
                            <tbody>
                                <tr>
                                    <th>Category</th>
                                    <th>Item</th>
                                    <th>Price in Rs</th>
                                    <th>Count</th>
                                    <th>Actions</th>
                                </tr>
                                <tr>
                                <td><input type="text" value={value.Category} onChange={(e)=> value.updateValue(e, "Category")}></input></td>
                                <td><input type="text" value={value.Item} onChange={(e)=> value.updateValue(e, "Item")}></input></td>
                                <td><input type="number" value={value.PriceInRs} onChange={(e)=> value.updateValue(e, "PriceInRs")}></input></td>
                                <td><input type="number" value={value.Count} onChange={(e)=> value.updateValue(e, "Count")}></input></td>
                                <td><Button size="sm" variant="success" onClick={()=>{value.onSave(value.Id)}}>{value.Id ? "Save" : "Add new Item"}</Button></td>
                                </tr>
                                {value.data.map(item => {
                                    return(
                                        <tr>
                                            <td>{item.Category}</td>
                                            <td>{item.Item}</td>
                                            <td>{item.PriceInRs}</td>
                                            <td>{item.Count}</td>
                                            <td><Button size="sm" variant="primary" onClick={() => {value.onEdit(item.Id)}}>Edit</Button> &nbsp; <Button size="sm" variant="danger" onClick={() => {value.onDelete(item.Id)}}>Delete</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </Table>
                        )
                    }}
                </ItemConsumer>
            </div>
        )
    }
}