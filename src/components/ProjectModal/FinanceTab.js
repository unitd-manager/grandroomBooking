import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import { Row, Col, Button, CardTitle, Table,Form } from 'reactstrap';
import PropTypes from 'prop-types';
import FinanceInvoiceData from '../Finance/FinanceInvoiceData';
import FinanceReceiptData from '../Finance/FinanceReceiptData';
import InvoiceModal from '../Finance/InvoiceModal';
import ReceiptModal from '../Finance/ReceiptModal';
import CustomerFinanceInvoice from '../Finance/CustomerFinanceInvoice';
import CustomerFinanceReceipt from '../Finance/CustomerFinanceReceipt';
import api from '../../constants/api';
// import message from '../Message';
import CreateFinance from '../Finance/CreateFinance';

export default function FinanceTab({ projectDetail,servicelinkeddetails }) {
  FinanceTab.propTypes = {
    projectDetail: PropTypes.bool,
    servicelinkeddetails: PropTypes.any,
  };
  const [financeModal, setFinanceModal] = useState(false);
  const { id } = useParams();
  const [editInvoiceData, setEditInvoiceData] = useState(false);
  const [editCreateReceipt, setEditCreateReceipt] = useState(false);
  const [createInvoice, setCreateInvoice] = useState(null);
  // const [cancelInvoice, setCancelInvoice] = useState(null);
  // const [cancelReceipt, setCancelReceipt] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [receiveble, setReceiveble] = useState(null);
  // const [supplierAmount, setSupplierAmount] = useState(null);
  // const [subconAmount, setSubConAmount] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editInvoiceModal, setEditInvoiceModal] = useState(false);
  const [editReceiptModal, setEditReceiptModal] = useState(false);
  const [editReceiptDataModal, setReceiptDataModal] = useState(false);
  const [invoiceDatas, setInvoiceDatas] = useState({});
 const [bookingService ,setBookingService] = useState ('')
 const [OrdersDetails ,setOrdersDetails] = useState ('')
 const [totalAmount ,setBookingServiceAmount] = useState ('')
 const [bookingServicename ,setBookingServiceName] = useState ('')

 console.log('servicelinkeddetails',servicelinkeddetails)

  // const id = 1
  const getInvoiceById = () => {
    api
      .post('/invoice/getBokingInvoiceById', { booking_id: id })
      .then((res) => {
        setCreateInvoice(res.data.data);
      })
      .catch(() => {
       
      });
  };

  
  const getAmountById = () => {
    api
      .post('/booking/getAmountByBookingIds', { booking_id: id })
      .then((res) => {
        setReceiveble(res.data.data);
      })
      .catch(() => {
       
      });
  };
  // const getSupplierById = () => {
  //   api
  //     .post('/project/getSupplierById', { project_id: id })
  //     .then((res) => {
  //       setSupplierAmount(res.data.data);
  //     })
  //     .catch(() => {
       
  //     });
  // };
  // const getSubconById = () => {
  //   api
  //     .post('/project/getSubconById', { project_id: id })
  //     .then((res) => {
  //       setSubConAmount(res.data.data);
  //     })
  //     .catch(() => {
        
  //     });
  // };

  console.log('ordersssss',OrdersDetails)

  const getOrdersById = () => {
    api
      .post('/booking/getOrdersbooking',{ booking_id: id })
      .then((res) => {
        setOrderId(res.data.data[0].order_id);
        console.log('order', res.data.data);
        setOrdersDetails(res.data.data[0])
        api
      .post('/invoice/getProjectReceiptById', { order_id:res.data.data[0].order_id })
      .then((resp) => {
        setReceipt(resp.data.data);
      })
      .catch(() => {
       
      });
      })
      .catch(() => {
        
      });
  };

  const getBookingById = () => {
    api
      .post('/booking/getOrdersbooking', { booking_id: id })
      .then((res) => {
     setBookingService(res.data.data)
    
      })
      .catch(() => {
        
      });
  };




  const getServiceLinked = () => {
    api
      .post('/booking/getBookingHisrtoryById', { booking_id: id })
      .then((res) => {
        setBookingServiceName(res.data.data);
      })
      .catch(() => {
       
      });
  };

  const getServiceAmount = () => {
    api
      .post('/booking/getBookingAmount', { booking_id: id })
      .then((res) => {
        setBookingServiceAmount(res.data.data[0]);
      })
      .catch(() => {
       
      });
  };

  const editOrderCancel = async () => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to cancel this order?");
      
      if (!isConfirmed) {
        return; // Stop execution if the user cancels
      }
  
      const res = await api.post('/booking/getOrdersbooking', { booking_id: id });
      
      if (!res.data.data || res.data.data.length === 0) {
        console.error("No room order data found");
        alert("No room order data found");
        return;
      }
  
      const statusInsert = {
        order_id: orderId,
        order_status: "cancel",
      };
  
      await api.post('/booking/editOrderStatus', statusInsert);
  
      const serviceInsert = {
        booking_id: id,
        status: "Booked",
      };
  
      await api.post('/booking/edit-Booking_status', serviceInsert);
      
      alert("Order has been canceled successfully.");
      // window.location.reload();
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking.");
    }
  };
  

console.log('orderddddd',bookingService)

const placeOrder = () => {
  if (!totalAmount || !totalAmount.total_amount) {
    console.error("Total amount is missing!");
    return;
  }

  // Ensure bookingService is an object before modifying
  const updatedBookingService = { ...OrdersDetails, invoice_amount: totalAmount.total_amount,status: 'Due' };

  api
    .post("/finance/insertInvoice", updatedBookingService)
    .then((res) => {
      if (!res.data.data.insertId) {
        throw new Error("Invoice insertion failed!");
      }
      
      const insertedId = res.data.data.insertId;

      const orderItemPromises = bookingServicename.map((item) => {
        const orderItem = {
          contact_id: item.contact_id,
          invoice_id: insertedId,
          unit_price: item.amount,
          total_cost: item.amount* item.qty,
          item_title: item.room_type,
          qty: item.qty,
          booking_id: item.booking_id,
          status: 'Due'
        };

        console.log("Order item:", orderItem);

        return api.post("/finance/insertInvoiceItem", orderItem);
      });

      return Promise.all(orderItemPromises);
    })
    .then(() => {
      window.location.reload();
      console.log("All order items inserted successfully.");
    })
    .catch((err) => {
      console.error("Error placing order:", err);
    });
};

  

  // const getInvoiceCancel = () => {
  //   api
  //     .post('/invoice/getProjectInvoiceCancel', { project_id: id })
  //     .then((res) => {
  //       setCancelInvoice(res.data.data);
  //     })
  //     .catch(() => {
       
  //     });
  // };
  // const invoiceCancel = (obj) => {
  //   obj.status = 'cancelled';
  //   api
  //     .post('/Finance/editInvoicePortalDisplay', obj)
  //     .then(() => {
  //       message('Record editted successfully', 'success');
  //       window.location.reload();
  //     })
  //     .catch(() => {
  //       message('Unable to edit record.', 'error');
  //     });
  // };
  //get receipt
  // const getReceiptCancel = () => {
  //   api
  //     .post('/invoice/getReceiptCancel', { order_id: id })
  //     .then((res) => {
  //       setCancelReceipt(res.data.data);
  //     })
  //     .catch(() => {
        
  //     });
  // };
  const getReceiptById = () => {
    api
      .post('/invoice/getProjectReceiptById', { order_id:orderId })
      .then((res) => {
        setReceipt(res.data.data);
      })
      .catch(() => {
       
      });
  };
  //receipt Cancel
  // const receiptCancel = (obj) => {
  //   obj.receipt_status = 'cancelled';
  //   api
  //     .post('/Finance/editTabReceiptPortalDisplay', obj)
  //     .then(() => {
  //       message('Record editted successfully', 'success');
  //       window.location.reload()
  //     })
  //     .catch(() => {
  //       message('Unable to edit record.', 'error');
  //     });
  // };
  useEffect(() => {
    // getInvoiceCancel();
    // getInvoiceById();
    // getReceiptCancel();
    getReceiptById();
    getOrdersById();
    getAmountById();
    getBookingById();
    getServiceLinked();
    getServiceAmount()
    getInvoiceById();
    // getSupplierById();
    // getSubconById();
  }, []);

  return (
    <>
      <Row>
        <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
          {' '}
          FINANCE{' '}
        </CardTitle>
      </Row>
      <br />

      <CreateFinance
        financeModal={financeModal}
        bookingId={id}
        projectDetail={projectDetail}
        setFinanceModal={setFinanceModal}
        getOrdersById={getOrdersById}
      />
      <Row className="mb-4">
        {!orderId && (
          <Col md="3">
            {' '}
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                setFinanceModal(true);
              }}
            >
              Add Order
            </Button>
          </Col>
        )}

        {orderId && (
          <Col md="3">
            <Link to={`/FinanceEdit/${orderId}?tab=3`}>
              {' '}
              <Button color="primary" className="shadow-none">
                Go to order
              </Button>
            </Link>
          </Col>
        )}
        
        {orderId && (
          <Col md="3">
        
              {' '}
              <Button color="danger" className="shadow-none"
                onClick={() => {
                  editOrderCancel();
                }}>
                Cancel Order
              </Button>
         
          </Col>
            )}
      </Row>
      <Row>
        <Col lg="12">
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            {' '}
            Account Receivables{' '}
          </CardTitle>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan="3" className="bold">
                  Balance Receivables: <span>{receiveble && receiveble.balanceAmount} </span>
                </th>
              </tr>
              <tr>
                <th className="bold">Description</th>
                <th className="bold">Amount Invoiced</th>
                <th className="bold">Amount Received</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Invoice Raised(Total PO Amount : ) </td>
                <td>
                  {' '}
                  <span>{receiveble && receiveble.amount} </span>{' '}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Total Payments Received </td>
                <td> </td>
                <td>
                  <span>{receiveble && receiveble.receivedAmount} </span>{' '}
                </td>
              </tr>
            </tbody>
            <br />
          </Table>
        </Col>
      </Row>
      <FinanceInvoiceData
        editInvoiceData={editInvoiceData}
        setEditInvoiceData={setEditInvoiceData}
        projectInfo={id}
        orderId={orderId}
      />
      {editCreateReceipt && (
        <FinanceReceiptData
          editCreateReceipt={editCreateReceipt}
          setEditCreateReceipt={setEditCreateReceipt}
          orderId={orderId}
          projectInfo={id}
        />
      )}

      <Row>
      {orderId && (
        <Col>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              placeOrder();
            }}
          >
            Create Invoice
          </Button>
        </Col>)}
        {orderId && (    
        <Col>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setEditCreateReceipt(true);
            }}
          >
            Create Receipt
          </Button>
        </Col>
        )}
      </Row>
     <InvoiceModal
        editModal={editModal}
        setEditModal={setEditModal}
        editInvoiceModal={editInvoiceModal}
        setInvoiceDatas={setInvoiceDatas}
        invoiceDatas={invoiceDatas}
      />
      <ReceiptModal
        editReceiptModal={editReceiptModal}
        setReceiptDataModal={setReceiptDataModal}
        editReceiptDataModal={editReceiptDataModal}
      /> 
      <Row className="mt-4">
        <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
          {' '}
          INVOICE(S){' '}
        </CardTitle>
      </Row>

      <Form className="mt-4">
        <Row className="border-bottom mb-3">
          <CustomerFinanceInvoice
            createInvoice={createInvoice}
            // cancelInvoice={cancelInvoice}
            // invoiceCancel={invoiceCancel}
            setEditModal={setEditModal}
            setEditInvoiceModal={setEditInvoiceModal}
            setInvoiceDatas={setInvoiceDatas}
            projectDetail={projectDetail}
          
            
            
          ></CustomerFinanceInvoice>
        </Row>
      </Form>
      <Row className="mt-4">
        <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
          {' '}
          RECEIPT(S){' '}
        </CardTitle>
      </Row> 

      <Form className="mt-4">
        <Row className="border-bottom mb-3">
          <CustomerFinanceReceipt
            receipt={receipt}
            projectDetail={projectDetail}
            // cancelReceipt={cancelReceipt}
            // receiptCancel={receiptCancel}
            setEditReceiptModal={setEditReceiptModal}
            setReceiptDataModal={setReceiptDataModal}
          ></CustomerFinanceReceipt>
        </Row>
      </Form>
    </>
  );
}
