import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCatModal} from './AddCatModal';
import {EditCatModal} from './EditCatModal';


export class Category extends Component{

    constructor(props){
        super(props);
        this.state={cats:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cats:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){ 
        this.refreshList();
    }

    deleteCat(catid){
        if(window.confirm('Are you sure ?')){
            fetch(process.env.REACT_APP_API+'category/'+catid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
            })
        }
    }


    render(){
        const {cats, catid, catname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CategoryID</th>
                            <th>CategoryName</th>
                            <th>Options</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {cats.map(cat=>
                            <tr key={cat.CategoryId}>
                                <td>{cat.CategoryId}</td>
                                <td>{cat.CategoryName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                        catid:cat.CategoryId, catname:cat.CategoryName})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteCat(cat.CategoryId)}>
                                            Delete
                                        </Button>
                                    

                                    <EditCatModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    catid={catid}
                                    catname={catname}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Category</Button>

                    <AddCatModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                
            </div>
        )
    }
}