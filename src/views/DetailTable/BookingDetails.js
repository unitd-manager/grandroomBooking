import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
// import BookingModal from '../../components/BookingTable/BookingModal';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';

const BookingDetails = () => {
  //All state Variables
  // const [modal, setModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState();

  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState();

  // const toggle = () => {
  //   setModal(!modal);
  // };

  //Logic for adding category in db
  // const [companyInsertData, setCompanyInsertData] = useState({
  //   company_id: '',
  //   phone: '',
  //   website: '',
  //   address_flat: '',
  //   address_street: '',
  //   address_town: '',
  //   address_state: '',
  //   longitude: '',
  //   latitude: '',
  // });

  //setting data in companyInsertData
  // const handleInputs = (e) => {
  //   setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  // };
  //Api call for getting company dropdown
  const getCompany = () => {
    api
      .get('/contact/getContact')
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  
  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return difference >= 0 ? difference : 0; // Ensure it's not negative
  };

  //Api for insertCompany
  // const insertCompany = () => {
  //   if (companyInsertData.company_name !== '' && companyInsertData.address_flat !== '') {
  //     api
  //       .post('/company/insertCompany', companyInsertData)
  //       .then(() => {
  //         message('Company inserted successfully.', 'success');
  //         getCompany();
  //         toggle();
  //       })
  //       .catch(() => {
  //         message('Network connection error.', 'error');
  //       });
  //   } else {
  //     message('Please fill all required fields', 'warning');
  //   }
  // };

  //setting data in companyInsertData
  const handleBookingInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  //Logic for adding Booking in db
  const insertBooking = () => {
    api
      .post('/booking/getBookingValidationInsert', {
        booking_date: bookingDetails.booking_date,
        to_booking_date: bookingDetails.to_booking_date,
        assign_time: bookingDetails.assign_time,
        to_assign_time: bookingDetails.to_assign_time,
        hall: bookingDetails.hall,
        booking_id:id,
        contact_id:bookingDetails.contact_id,
        total_hour : calculateDays()
      })
      .then((res1) => {
        if (res1.data.msg === 'Booking already exists for this date, time, and hall') {
          message('Booking already exists for this time slot and date.', 'warning');
        } else if (bookingDetails.contact_id !== '') {
      bookingDetails.creation_date = creationdatetime;
      console.log('res1',res1)
      
         const insertedDataId = res1.data.data.insertId;
      //     message('Booking inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/BookingEdit/${insertedDataId}`);
          }, 300);
     
    } else {
      message('Please fill all required fields', 'warning');
    }
  })
  .catch(() => {
    message('Unable to retrieve booking validation data.', 'error');
  });
  };

  useEffect(() => {
    getCompany();
  }, [id]);



  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="12">
          <ComponentCard title="Booking Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="4">
                    <Label>CustomerName </Label>
                    <Input type="select" name="contact_id" onChange={handleBookingInputs}>
                      <option>Select Customer</option>
                      {company &&
                        company.map((e) => {
                          return (
                            <option key={e.contact_id} value={e.contact_id}>
                              {e.first_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col md="4">
                <FormGroup>
                  <Label>
                From Booking Date <span className="required"> *</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleBookingInputs}
                    value={
                      bookingDetails && bookingDetails.booking_date
                    }
                    name="booking_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>
                  To Booking Date <span className="required"> *</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleBookingInputs}
                    value={
                      bookingDetails && bookingDetails.to_booking_date
                    }
                    name="to_booking_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                <Label>Total Days</Label>
                <Input
                  type="text"
                  onChange={handleBookingInputs}
                  value={calculateDays(bookingDetails?.booking_date, bookingDetails?.to_booking_date)}
                  readOnly
                />
              </FormGroup>
            </Col>
              {/* <Col md="4">
                <FormGroup>
                  <Label>Court</Label>
                  <Input
                    value={bookingDetails && bookingDetails.hall}
                    type="select"
                    onChange={handleBookingInputs}
                    name="hall"
                  >
                    <option value="">Please Select</option>
                    <option value="Court 1">Court 1</option>
                    <option value="Court 2">Court 2</option>
                  </Input>
                </FormGroup>
              </Col> */}
                  <Col md="4">
                <FormGroup>
                  <Label>From Assign Time</Label>
                  <Input
                    value={bookingDetails && bookingDetails.assign_time}
                    type="select"
                    onChange={handleBookingInputs}
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
              <Col md="4">
                <FormGroup>
                  <Label>To Assign Time</Label>
                  <Input
                    value={bookingDetails && bookingDetails.to_assign_time}
                    type="select"
                    onChange={handleBookingInputs}
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
            
                  {/* <Col md="2" className="addNew">
                    <Label>Add New Customer</Label>
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                      Add New
                    </Button>
                  </Col> */}
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertBooking();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>

      {/* <BookingModal
        toggle={toggle}
        handleInputs={handleInputs}
        insertCompany={insertCompany}
        modal={modal}
      ></BookingModal> */}
    </div>
  );
};
export default BookingDetails;
