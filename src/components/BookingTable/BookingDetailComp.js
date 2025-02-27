import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import moment from 'moment';

export default function BookingDetailComp({ bookingDetails, handleInputs, contact }) {
  BookingDetailComp.propTypes = {
    bookingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    contact: PropTypes.array,
    // employee: PropTypes.array,
    // setEditCustomerModal: PropTypes.func,
   
  };

 console.log('bookingDetails',bookingDetails)


  return (
    <>
      <Form>
        <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                   Booking Date <span className="required"> *</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      bookingDetails && bookingDetails.booking_date
                    }
                    name="booking_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Customer Name</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={bookingDetails && bookingDetails.contact_id}
                    name="contact_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {contact &&
                      contact.map((e) => {
                        return (
                          <option key={e.contact_id} value={e.contact_id}>
                            {e.first_name}
                          </option>
                        );

                   
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Court</Label>
                  <Input
                    value={bookingDetails && bookingDetails.hall}
                    type="select"
                    onChange={handleInputs}
                    name="hall"
                  >
                    <option value="">Please Select</option>
                    <option value="Court 1">Court 1</option>
                    <option value="Court 2">Court 2</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Booking Status</Label>
                  <Input
                    value={bookingDetails && bookingDetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="Booked">Booked</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
             
                   </Row>
            <Row>

            {/* <Col md="3">
                <FormGroup>
                  <Label> From Assign Time</Label>
                  <Input
                    type="time"
                    onChange={handleInputs}
                    defaultValue={bookingDetails && bookingDetails.assign_time
                      ? bookingDetails.assign_time.replace(" AM", "").replace(" PM", "").padStart(5, '0')
                      : ''}
                    // defaultValue={bookingDetails && bookingDetails.assign_time ? bookingDetails.assign_time.substring(0, 5) : ''}
                    name="assign_time"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> To Assign Time</Label>
                  <Input
                    type="time"
                    onChange={handleInputs}
                    defaultValue={bookingDetails && bookingDetails.to_assign_time
                      ? bookingDetails.to_assign_time.replace(" AM", "").replace(" PM", "").padStart(5, '0')
                      : ''}
                    // defaultValue={bookingDetails && bookingDetails.to_assign_time ? bookingDetails.to_assign_time.substring(0, 5) : ''}
                    name="to_assign_time"
                  />
                </FormGroup>
              </Col> */}
              <Col md="3">
                <FormGroup>
                  <Label>From Assign Time</Label>
                  <Input
                    value={bookingDetails && bookingDetails.assign_time}
                    type="select"
                    onChange={handleInputs}
                    name="assign_time"
                  >
                    <option value="">Please Select</option>
                    <option value="06:00 AM">06:00 AM</option>
                    <option value="07:00 AM">07:00 AM</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 AM">12:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="09:00 PM">09:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>To Assign Time</Label>
                  <Input
                    value={bookingDetails && bookingDetails.to_assign_time}
                    type="select"
                    onChange={handleInputs}
                    name="to_assign_time"
                  >
                    <option value="">Please Select</option>
                    <option value="06:00 AM">06:00 AM</option>
                    <option value="07:00 AM">07:00 AM</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 AM">12:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="09:00 PM">09:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Payment Status</Label>
                  <Input
                    value={bookingDetails && bookingDetails.payment_status}
                    type="select"
                    onChange={handleInputs}
                    name="payment_status"
                  >
                    <option value="">Please Select</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Amount
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={bookingDetails && bookingDetails.amount}
                    name="amount"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row></Row>
        </FormGroup>
      </Form>
    </>
  );
}
