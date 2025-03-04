import React, { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import ComponentCard from '../ComponentCard';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';
import AddNote from '../Tender/AddNote';
import ViewNote from '../Tender/ViewNote';
import Tab from '../project/Tab';
import FinanceTab from '../ProjectModal/FinanceTab';
import BookingRoomLinked from './BookingRoomLinked';
import BookingRoomEditModal from './BookingRoomEditModal'
import api from '../../constants/api';
import message from '../Message';

export default function BookingMoreDetails({
  dataForPicture,
  attachmentModal,
  setAttachmentModal,
  id,
  pictureData,
  servicelinkeddetails,
  bookingDetails,
}) {
  BookingMoreDetails.propTypes = {
    dataForPicture: PropTypes.func,
    attachmentModal: PropTypes.bool,
    setAttachmentModal: PropTypes.func,
    id: PropTypes.any,
    pictureData: PropTypes.any,
    servicelinkeddetails: PropTypes.any,
    bookingDetails: PropTypes.any,
  };

  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [roomType, setRoomType] = useState();
  const [editContactEditModal, setEditContactEditModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [contactsDetails, setContactsDetails] = useState(null);
  const [contactData, setContactData] = useState();
  const [bookingHistory, setBookingHistory] = useState();
  const [BookingroomStatus, setBookingroomStatus] = useState();

  const getRoomType = () => {
    api
      .get('/booking/getRoom')
      .then((res) => {
        setRoomType(res.data.data);
      })
      .catch(() => {
     
      });
  };

  const getContactLinked = () => {
    api
      .post('/booking/getBookingServiceById', { booking_id: id })
      .then((res) => {
        setContactsDetails(res.data.data);
      })
      .catch(() => {
        message('Room Data Not Found', 'info');
      });
  };


  const getValuelistStatus = () => {
    api
      .get('/booking/get-ValueListRoomStatus')
      .then((res) => {
        setBookingroomStatus(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };

  const [newContactData, setNewContactData] = useState({
    room_type: '',
    room_number: '',
  });

  const AddNewContact = () => {
  
        const newContactWithCompanyId = newContactData;
    newContactWithCompanyId.booking_id = id;
    newContactWithCompanyId.is_available = "No";
    if (
      newContactWithCompanyId.room_type !== '' 
     
    
    ) {

      api
      .post('/booking/BookingHistoryRoomNumber', { room_number:newContactData && newContactData.room_number})
      .then((res1) => {
        newContactWithCompanyId.amount = res1.data.data[0].amount;
        newContactWithCompanyId.qty = 1;
        console.log('amount',res1.data.data)
    api
      .post('/booking/insertBookingHistory', newContactWithCompanyId)
      .then(() => {
        message('Room inserted successfully.', 'success');
       

        api
        .post('/booking/BookingHistoryRoomNumber', { room_number:newContactData && newContactData.room_number})
        .then((res) => {
         const statusinsert = {
          room_history_id: res.data.data[0].room_history_id, 
          is_available: "No"
        };
        api
        .post('/booking/edit-Rooms-History-Edit', statusinsert)
        .then(() => {
          message('Record editted successfully', 'success');
          // window.location.reload();
        })
      })
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
    })
  }else {
    message('Please fill all required fields', 'warning');
  }
};


  const handleAddNewContact = (e) => {
    setNewContactData({ ...newContactData, [e.target.name]: e.target.value });
  };

    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
    {id:'1',name:'Rooms Linked'},
    {id:'2',name:'Invoice'},
    {id:'3',name:'Attachment'},
    ];
    const toggle = (tab) => {
      setActiveTab(tab);
    };
    
    const deleteRecord = (staffId) => {
      Swal.fire({
        title: `Are you sure? `,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .post('/booking/deleteBookingHistory', { booking_service_id: staffId })
            .then(() => {
              Swal.fire('Deleted!', 'Room has been deleted.', 'success');
              message('Record deleted successfully', 'success');
              window.location.reload();
            })
            .catch(() => {
              message('Unable to delete record.', 'error');
            });
        }
      });
    };

    const BookingHistory = (roomTyp) => {
      api
        .post('/booking/BookingHistoryById', { room_type:roomTyp})
        .then((res) => {
          setBookingHistory(res.data.data);
        })
        .catch(() => {
        });
    };

    console.log('test',bookingHistory)
    useEffect(() => {
      getRoomType()
      getContactLinked()
      getValuelistStatus()
    }, [id]);

    useEffect(() => {
      BookingHistory(newContactData && newContactData.room_type)
    }, [newContactData && newContactData.room_type]);
  return (
    <ComponentCard title="More Details">
      <ToastContainer></ToastContainer>
      <Tab toggle={toggle} tabs={tabs} />
      <TabContent className="p-4" activeTab={activeTab}>
         <TabPane tabId="1">
         <BookingRoomLinked
          roomStatus ={roomType}
          setContactData={setContactData}
          setEditContactEditModal={setEditContactEditModal}
          deleteRecord={deleteRecord}
          editContactEditModal={editContactEditModal}
          addContactToggle={addContactToggle}
          addContactModal={addContactModal}
          newContactData={newContactData}
          contactsDetails={contactsDetails}
          handleAddNewContact={handleAddNewContact}
          AddNewContact={AddNewContact}
          bookingHistory={bookingHistory}
          bookingDetails={bookingDetails}
        
         >
         </BookingRoomLinked>
         <BookingRoomEditModal
              editContactEditModal={editContactEditModal}
              setEditContactEditModal={setEditContactEditModal}
              contactData={contactData}
              roomStatus={roomType}
              BookingroomStatus={BookingroomStatus}
            />
         </TabPane>
         <TabPane tabId="2">

         <FinanceTab projectId={id} projectDetail={bookingHistory} servicelinkeddetails={servicelinkeddetails}></FinanceTab>
         </TabPane>
         <TabPane tabId="3">
          <ComponentCard title="Picture">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('BookingPicture');
                    setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF']);
                    dataForPicture();
                    setAttachmentModal(true);
                  }}
                >
                  <Icon.Image className="rounded-circle" width="20" />
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={roomName}
              fileTypes={fileTypes}
              altTagData="Booking Data"
              desc="Booking Data"
              recordType="BookingPicture"
              mediaType={pictureData.modelType}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="BookingPicture"
              recordType="BookingPicture"
            />
          </ComponentCard>

          <Row>
            <ComponentCard title="Add a note">
              <AddNote recordId={id} roomName="BookingEdit" />
              <ViewNote recordId={id} roomName="BookingEdit" />
            </ComponentCard>
          </Row>
        </TabPane>
      </TabContent>
    </ComponentCard>
  );
}
