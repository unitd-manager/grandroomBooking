import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function ContactDetailComp({ contactDetails, handleInputs }) {
  ContactDetailComp.propTypes = {
    contactDetails: PropTypes.object,
    handleInputs: PropTypes.func,
  };
  return (
    <>
      <Form>
        <FormGroup>
          <ComponentCard title="Contact Details" creationModificationDate={contactDetails}>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Customer Name <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contactDetails && contactDetails.first_name}
                    name="first_name"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Email
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contactDetails && contactDetails.email}
                    name="email"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Password
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contactDetails && contactDetails.pass_word}
                    name="pass_word"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col md="4">
                <FormGroup>
                  <Label>
                    Phone
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contactDetails && contactDetails.phone}
                    name="phone"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Mobile
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contactDetails && contactDetails.mobile}
                    name="mobile"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Address
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contactDetails && contactDetails.address_area}
                    name="address_area"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
         
        </FormGroup>
      </Form>
    </>
  );
}
