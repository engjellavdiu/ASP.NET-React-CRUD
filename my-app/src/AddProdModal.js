import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddProdModal extends Component{
    constructor(props){
        super(props);
        this.state={cats:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename="anon.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cats:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'product',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                // ProductId:null,
                ProductName:event.target.ProductName.value,
                Category:event.target.Category.value,
                DateAdded:event.target.DateAdded.value,
                photofilename:this.photofilename
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+"Product/SaveFile",{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Product
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="ProductName">
                        <Form.Label>ProductName</Form.Label>
                        <Form.Control type="text" name="ProductName" required 
                        placeholder="ProductName"/>
                    </Form.Group>

                    <Form.Group controlId="Category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select">
                        {this.state.cats.map(cat=>
                            <option key={cat.CategoryId}>{cat.CategoryName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateAdded">
                        <Form.Label>DateAdded</Form.Label>
                        <Form.Control
                        type="date"
                        name="DateAdded"
                        required
                        placeholder="DateAdded"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Product
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}