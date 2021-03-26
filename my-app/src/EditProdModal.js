import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditProdModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
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
        fetch(process.env.REACT_APP_API+'Product',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProductId:event.target.ProductId.value,
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
            Edit Product
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="ProductId">
                        <Form.Label>ProductId</Form.Label>
                        <Form.Control type="text" name="ProductId" required 
                        disabled
                        defaultValue={this.props.Prodid}
                        placeholder="ProductId"/>
                    </Form.Group>

                    <Form.Group controlId="ProductName">
                        <Form.Label>ProductName</Form.Label>
                        <Form.Control type="text" name="ProductName" required 
                        defaultValue={this.props.Prodname}
                        placeholder="ProductName"/>
                    </Form.Group>

                    <Form.Group controlId="Category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="Category" required 
                        defaultValue={this.props.Prodcat}
                        placeholder="Category"/>
                    </Form.Group>

                    <Form.Group controlId="DateAdded">
                        <Form.Label>DateAdded</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateAdded"
                        required
                        placeholder="ProductId"
                        defaultValue={this.props.da}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Product
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
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