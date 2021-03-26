import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddProdModal} from './AddProdModal';
import {EditProdModal} from './EditProdModal';


export class Product extends Component{

    constructor(props){
        super(props);
        this.state={Prods:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Product')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Prods:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){ 
        this.refreshList();
    }

    deleteProd(Prodid){
        if(window.confirm('Are you sure ?')){
            fetch(process.env.REACT_APP_API+'Product/'+Prodid,{
                method:'DELETE',
                header:{'Accept':'appliProdion/json',
                        'Content-Type':'appliProdion/json'}
            })
        }
    }


    render(){
        const {Prods, Prodid, Prodname, Prodcat, photofilename, da}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ProductID</th>
                            <th>ProductName</th>
                            <th>Category</th>
                            <th>Date Added</th>
                            <th>Options</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {Prods.map(Prod=>
                            <tr key={Prod.ProductId}>
                                <td>{Prod.ProductId}</td>
                                <td>{Prod.ProductName}</td>
                                <td>{Prod.Category}</td>
                                <td>{Prod.DateAdded}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                        Prodid:Prod.ProductId, Prodname:Prod.ProductName, 
                                        Prodcat:Prod.Category, photofilename:Prod.photofilename, da:Prod.DateAdded})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteProd(Prod.ProductId)}>
                                            Delete
                                        </Button>
                                    

                                    <EditProdModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    Prodid={Prodid}
                                    Prodname={Prodname}
                                    Prodcat={Prodcat}
                                    photofilename={photofilename}
                                    da={da}
                                    />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Product</Button>

                    <AddProdModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                
            </div>
        )
    }
}