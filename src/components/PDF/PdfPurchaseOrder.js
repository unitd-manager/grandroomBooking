import React ,{useState}from 'react';
import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import moment from 'moment';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfPurchaseOrder = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [purchaseDetails, setPurchaseDetails] = React.useState();
  const [gTotal, setGtotal] = React.useState(0);
  //const [gstTotal, setGstAmount] = React.useState(0);

  
  //const [Total, setTotal] = React.useState(0);
  const [projectDetail, setProjectDetail] = useState();

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  const getProjectById = () => {
    api
      .post('/project/getProjectById', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data);
      })
      .catch(() => {});
  };
  // Gettind data from Job By Id
  const getPoProduct = () => {
    api
      .post('/purchaseorder/getPurchaseOrderById', { purchase_order_id: id })
      .then((res) => {
        setPurchaseDetails(res.data.data[0]);
      })
      .catch(() => {});
  };
  
 
  const calculateTotal = () => {
    //const grandTotal = products.reduce((acc, element) => acc + element.amount, 0);
    const gstValue = (purchaseDetails.gst_percentage / 100) * gTotal;
    console.log("PO1",gstValue);
    
    return gstValue;
  };
  const calculateGSTAmount = () => {
    const gstValue = calculateTotal();
    return (gstValue + gTotal);
  };

  const getPurchaseOrderId = () => {
    api
      .post('/purchaseorder/getPurchaseOrderByPdf', { purchase_order_id: id })
      .then((res) => {
        setProducts(res.data.data);
        //grand total
        let grandTotal = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
        });
        setGtotal(grandTotal);
        
      })
      .catch(() => {});
  };
  React.useEffect(() => {
    getPurchaseOrderId();
    getProjectById();
    getPoProduct();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'Sn',
          style: 'tableHead',
        },
        {
          text: 'Product Name',
          style: 'tableHead',
          alignment:'center'
        },
        {
          text: 'Uom',
          style: 'tableHead',
        },
        {
          text: 'Qty',
          style: 'tableHead',
          alignment:'right'
        },
        {
          text: 'Unit Price S$ ',
          style: 'tableHead',
        },
        {
          text: 'Amount S$',
          style: 'tableHead',
          alignment:'right'
        },
      ],
    ];
    products.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.item_title ? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
          alignment:'center'
        },
        {
          text: `${element.unit ? element.unit : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.po_QTY ? element.po_QTY : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
          alignment:'right'
        },
        {
          text: `${element.cost_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
        },
        {
          
          text: `${element.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          fillColor: '#f5f5f5',
          border: [false, false, false, true],
          style: 'tableBody1',
        },
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
      content: [
        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['101%'],

            body: [
              [
                {
                  text: `~PURCHASE ORDER~`,
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
        },
        '\n',

        {
          columns: [
            {
              stack: [
                { text: `From:`, style: ['textSize'] },
                '\n',

                {
                  text: `${projectDetail.company_name ? projectDetail.company_name : ''}
                     ${projectDetail.address_street ? projectDetail.address_street : ''}
                     ${projectDetail.address_town ? projectDetail.address_town : ''}
                     ${projectDetail.address_country ? projectDetail.address_country : ''}
                     ${ projectDetail.address_po_code ? projectDetail.address_po_code : ''}`,
                  style: ['notesText', 'textSize'],
                  margin: [-250, 20, 0, 0],
    
                  bold: 'true',
                },
              ],
            },
            {
              stack: [
                {
                  text: ` Po Number :${purchaseDetails.po_code ? purchaseDetails.po_code : ''} `,
                  style: ['textSize'],
                  margin: [120, 0, 0, 0],
                },
                {
                  text: ` Po Date : ${
                    purchaseDetails.purchase_order_date
                      ? moment(purchaseDetails.purchase_order_date).format('DD-MM-YYYY')
                      : ''
                  } `,
                  style: ['textSize'],
                  margin: [135, 0, 0, 0],
                },
                {
                  text: ` Your Ref :${
                    purchaseDetails.supplier_reference_no
                      ? purchaseDetails.supplier_reference_no
                      : ''
                  } `,
                  style: ['textSize'],
                  margin: [132, 0, 0, 0],
                },
                {
                  text: ` Our Ref : ${
                    purchaseDetails.our_reference_no ? purchaseDetails.our_reference_no : ''
                  }`,
                  style: ['textSize'],
                  margin: [137, 0, 0, 0],
                },
                {
                  text: ` Ship To :${
                    purchaseDetails.shipping_address_flat
                      ? purchaseDetails.shipping_address_flat
                      : ''
                  }\n${
                    purchaseDetails.shipping_address_street
                      ? purchaseDetails.shipping_address_street
                      : ''
                  }\n ${
                    purchaseDetails.shipping_address_country
                      ? purchaseDetails.shipping_address_country
                      : ''
                  }`,
                  style: ['textSize'],
                  margin: [130, 0, 0, 0],
                },
              ],
            },
          ],
        },
        '\n',

        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['50%', '51%'],

            body: [
              [
                {
                  text: 'Vendor Name',
                  alignment: 'center',
                  style: 'tableHead',
                },
                {
                  text: 'Company Name',
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
        },
        '\n',
        {
          columns: [
            {
              text: ` To : ${purchaseDetails.supplier_name ? purchaseDetails.supplier_name : ''}`,
              margin: [20, 0, 0, 0],
              style: ['notesText', 'textSize'],
            },
            {
              text: `${purchaseDetails.company_name ? purchaseDetails.company_name : ''}`,
              alignment: 'center',
              style: ['invoiceAdd', 'textSize'],
            },
          ],
        },
        '\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['50%', '51%'],

            body: [
              [
                {
                  text: 'Payment Terms',
                  alignment: 'center',
                  style: 'tableHead',
                },
                {
                  text: 'Required By Date',
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
              [
                {
                  text: `${purchaseDetails.payment_terms ? purchaseDetails.payment_terms : ''}`,
                  alignment: 'center',
                  style: 'tableBody',
                  border: [false, false, false, true],
                },
                {
                  text: `${
                    purchaseDetails.creation_date
                      ? moment(purchaseDetails.creation_date).format('DD-MM-YYYY')
                      : ''
                  }`,
                  alignment: 'center',
                  border: [false, false, false, true],
                  style: 'tableBody',
                },
              ],
            ],
          },
        },

        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: [20, 155, '*', '*', 60, 83],

            body: productItems,
          },
        },
        '\n\n',
        {
          columns: [
            {
              text: `Approved By :`,
              alignment: 'left',
              style: ['invoiceAdd', 'textSize'],
            },
            {
              stack: [
                {
                  text: `SubTotal $ : ${gTotal.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}`,
                  style: ['textSize'],
                  alignment: 'right',
                  margin: [0, 0,10, 0],
                },

                '\n',
                {
                  text: `(${purchaseDetails.gst_percentage ? purchaseDetails.gst_percentage : ''}%) VAT:    ${calculateTotal().toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}`,
                  style: ['textSize'],
                  alignment: 'right',
                  margin: [0, 0, 10, 0],
                },
                '\n',
                {
                  text: `Total $ : ${calculateGSTAmount().toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
                  style: ['textSize'],
                  alignment: 'right',
                  margin: [0, 0, 10, 0],
                },
              ],
            },
          ],
        },
        '\n',

        {
          width: '100%',
          alignment: 'center',
          text: 'PURCHASE ORDER CREATED',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 12,
        },
      ],
      margin: [0, 50, 50, 50],

      styles: {
        logo: {
          margin: [-20, 20, 0, 0],
        },
        address: {
          margin: [-10, 20, 0, 0],
        },
        invoice: {
          margin: [0, 30, 0, 10],
          alignment: 'right',
        },
        invoiceAdd: {
          alignment: 'right',
        },
        textSize: {
          fontSize: 10,
        },
        notesTitle: {
          bold: true,
          margin: [0, 50, 0, 3],
        },
        tableHead: {
          border: [false, true, false, true],
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          fontSize: 10,
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [10, 5, 0, 5],
          alignment: 'right',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [15, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <Button type="button" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Purchase Order
      </Button>
    </>
  );
};

export default PdfPurchaseOrder;
