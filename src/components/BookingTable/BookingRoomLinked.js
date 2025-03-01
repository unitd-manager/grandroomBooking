import React from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';

export default function BookingRoomLinked({
  setContactData,
  setEditContactEditModal,
  deleteRecord,
  contactsDetails,
  addContactToggle,
  addContactModal,
  handleAddNewContact,
  newContactData,
  AddNewContact,
  roomStatus,
  bookingHistory,
}) {
  BookingRoomLinked.propTypes = {
    setContactData: PropTypes.func,
    setEditContactEditModal: PropTypes.func,
    deleteRecord: PropTypes.func,
    contactsDetails: PropTypes.any,
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
    handleAddNewContact: PropTypes.func,
    newContactData: PropTypes.object,
    AddNewContact: PropTypes.func,
    roomStatus: PropTypes.func,
    bookingHistory: PropTypes.object,
  };
  //  Table Contact
  const columns = [
    {
      name: 'id',
      selector: 'booking_service_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Del',
      selector: 'delete',
      cell: () => <Icon.Trash />,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Room Type',
      selector: 'room_type',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Room Number',
      selector: 'room_number',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'No of Person',
      selector: 'capacity',
      sortable: true,
      grow: 0,
    },
  ];
  return (
    <Form>
      <Row>
        <Col md="3">
          <FormGroup>
            <Button
              color="primary"
              className="shadow-none"
              style={{ backgroundColor: 'green' }}
              onClick={addContactToggle.bind(null)}
            >
              Add New{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <Label>
                                Room Type<span className="required"> *</span>
                              </Label>
                              <Input
                                name="room_type"
                                value={newContactData && newContactData.room_type}
                                onChange={handleAddNewContact}
                                type="select"
                              >
                                <option defaultValue="selected">Please Select</option>
                                {roomStatus &&
                                  roomStatus.map((ele) => {
                                    return (
                                      <option key={ele.room_id} value={ele.room_type}>
                                        {ele.room_type}
                                      </option>
                                    );
                                  })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label>
                                Room Number<span className="required"> *</span>
                              </Label>
                              <Input
                                name="room_number"
                                value={newContactData && newContactData.room_number}
                                onChange={handleAddNewContact}
                                type="select"
                              >
                                <option defaultValue="selected">Please Select</option>
                                {bookingHistory &&
                                  bookingHistory.map((ele) => {
                                    return (
                                      <option key={ele.room_id} value={ele.roomNumber}>
                                        {ele.roomNumber}
                                      </option>
                                    );
                                  })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label>No of Person</Label>
                              <Input
                                type="text"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.capacity}
                                name="capacity"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    AddNewContact();
                    //addContactModal(false);
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {contactsDetails &&
              contactsDetails.map((element, i) => {
                return (
                  <tr key={element.booking_service_id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="anchor">
                        <span
                          onClick={() => {
                            setContactData(element);
                            setEditContactEditModal(true);
                          }}
                        >
                          <Icon.Edit2 />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div color="primary" className="anchor">
                        <span onClick={() => deleteRecord(element.booking_service_id)}>
                          <Icon.Trash2 />
                        </span>
                      </div>
                    </td>
                    <td>{element.room_type}</td>
                    <td>{element.room_number}</td>
                    <td>{element.capacity}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Form>
  );
}
