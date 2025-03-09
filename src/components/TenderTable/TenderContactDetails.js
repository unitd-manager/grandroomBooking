import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  Row
} from 'reactstrap';

export default function TenderContactDetails({
  handleAddNewContact,
  addContactModal,
  addContactToggle,
  AddNewContact,
}) {
  TenderContactDetails.propTypes = {
    handleAddNewContact: PropTypes.any,
    addContactModal: PropTypes.object,
    addContactToggle: PropTypes.any,
    AddNewContact: PropTypes.any,
  };

  return (
    <div>
      <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
        <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>
                            Title<span className="required"> *</span>
                          </Label>
                          <Input type="select" name="salutation" onChange={handleAddNewContact}>
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="Ms">Ms</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>
                            Name<span className="required"> *</span>
                          </Label>
                          <Input type="text" name="first_name" onChange={handleAddNewContact} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Email</Label>
                          <Input type="text" name="email" onChange={handleAddNewContact} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Phone (Direct)</Label>
                          <Input type="number" name="phone_direct" onChange={handleAddNewContact} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Mobile</Label>
                          <Input type="number" name="mobile" onChange={handleAddNewContact} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                <FormGroup>
                  <Label>
                   Address
                  </Label>
                  <Input
                    type="text"
                    onChange={handleAddNewContact}
                    name="address_flat"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                   Address State
                  </Label>
                  <Input
                    type="text"
                    onChange={handleAddNewContact}
                    name="address_state"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                   Address Street
                  </Label>
                  <Input
                    type="text"
                    onChange={handleAddNewContact}
                    name="address_street"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                  Postal Code
                  </Label>
                  <Input
                    type="text"
                    onChange={handleAddNewContact}
                    name="address_po_code"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                 Country
                  </Label>
                  <Input
                    type="text"
                    onChange={handleAddNewContact}
                    name="address_country"
                  />
                </FormGroup>
              </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              AddNewContact();
            }}
          >
            Submit
          </Button>
          <Button color="secondary" className="shadow-none" onClick={addContactToggle.bind(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
