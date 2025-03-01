import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';

import api from '../../constants/api';

const ContactEditModal = ({
  contactData,
  editContactEditModal,
  setEditContactEditModal,
  roomStatus,
}) => {
  ContactEditModal.propTypes = {
    contactData: PropTypes.object,
    editContactEditModal: PropTypes.bool,
    setEditContactEditModal: PropTypes.func,
    roomStatus: PropTypes.object,
  };

  const [contactinsert, setContactInsert] = useState(null);

  const handleInputs = (e) => {
    setContactInsert({ ...contactinsert, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editContactsData = () => {
    api
      .post('/booking/edit-Booking-History', contactinsert)
      .then(() => {
        message('Record editted successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    setContactInsert(contactData);
  }, [contactData]);

  return (
    <>
      <Modal size="lg" isOpen={editContactEditModal}>
        <ModalHeader>
          Rooms Details
          <Button
            color="secondary"
            onClick={() => {
              setEditContactEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="3" className="mb-4 d-flex justify-content-between"></Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>
                  Room Type<span className="required"> *</span>
                </Label>
                <Input
                  name="room_type"
                  value={contactinsert && contactinsert.room_type}
                  onChange={handleInputs}
                  type="select"
                  disabled
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
                <Label>Room Number</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.room_number}
                  name="room_number"
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>No of Person</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.capacity}
                  name="capacity"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              editContactsData();
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setEditContactEditModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ContactEditModal;
