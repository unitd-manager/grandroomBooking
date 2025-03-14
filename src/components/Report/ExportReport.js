import React from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
// import pdfMake from 'pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import PdfHeader from '../PDF/PdfHeader';
// import PdfFooter from '../PDF/PdfFooter';
// import api from '../../constants/api';

const ExportReport = ({ data, columns, exportValue }) => {
  ExportReport.propTypes = {
    data: PropTypes.array, 
    columns: PropTypes.array,
    exportValue: PropTypes.string,
  };

  // const [hfdata, setHeaderFooterData] = React.useState([]);

  // React.useEffect(() => {
  //   api.get('/setting/getSettingsForCompany')
  //     .then((res) => {
  //       setHeaderFooterData(res.data.data);
  //     })
  //     .catch((err) => console.error('Error fetching header/footer data:', err));
  // }, []);

  // const findCompany = (key) => {
  //   const filteredResult = hfdata.find((e) => e.key_text === key);
  //   return filteredResult ? filteredResult.value : '';
  // };

  function formatDate(dateValue) {
    if (!dateValue) return '';
  
    // Convert to JavaScript Date object
    const date = new Date(dateValue);
  
    // Check if the date is valid
    if (Number.isNaN(date.getTime())) {
      console.warn('Invalid date:', dateValue);
      return dateValue; // Return original if invalid
    }
  
    // Format date as DD-MM-YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  

  function convertArrayOfObjectsToCSV(array) {
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = [];
    const selectors = [];
  
    columns.forEach((col) => {
      keys.push(col.name);
      selectors.push(col.selector);
    });
  
    let result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
  
    array.forEach((item, index) => {
      const row = [];
  
      selectors.forEach((key) => {
        let value = key === 's_no' ? index + 1 : item[key] || '';
  
        // 🔹 If the key contains "date", format it
        if (key.toLowerCase().includes('date') && value) {
          value = formatDate(value);
        }
  
        row.push(`"${value}"`);
      });
  
      result += row.join(columnDelimiter);
      result += lineDelimiter;
    });
  
    return result;
  }
  

  function downloadCSV() {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(data);
    if (!csv) return;

    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    }

    const filename = `${exportValue}_${getCurrentDate()}.csv`;
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  // function buildTableBody() {
  //   const body = [];
  //   const selectors = [];
  //   const header = [];
  
  //   columns.forEach((col) => {
  //     selectors.push(col.selector);
  //     header.push({
  //       text: col.name,
  //       style: 'tableHead',
  //     });
  //   });
  
  //   body.push(header);
  
  //   data.forEach((row, index) => {
  //     const dataRow = [];
  
  //     selectors.forEach((col) => {
  //       let value = col === 's_no' ? index + 1 : row[col] || '';
  
  //       // 🔹 Format date fields in PDF
  //       if (col.toLowerCase().includes('date') && value) {
  //         value = formatDate(value);
  //       }
  
  //       dataRow.push({
  //         text: value,
  //         style: 'tableBody',
  //       });
  //     });
  
  //     body.push(dataRow);
  //   });
  
  //   return body;
  // }
  

  // const getWidthOfColumns = () => {
  //   const columnWidth = 100 / columns.length;
  //   return Array(columns.length).fill(`${columnWidth}%`);
  // };

  // function table() {
  //   return {
  //     table: {
  //       headerRows: 1,
  //       dontBreakRows: true,
  //       widths: getWidthOfColumns(),
  //       body: buildTableBody(),
  //     },
  //     layout: 'lightHorizontalLines',
  //   };
  // }

  // const downloadPdf = () => {
  //   const dd = {
  //     pageSize: 'A4',
  //     header: PdfHeader({ findCompany }),
  //     pageMargins: [40, 110, 40, 80],
  //     footer: PdfFooter,
  //     content: [table()],
  //     styles: {
  //       tableHead: {
  //         fillColor: '#eaf2f5',
  //         fontSize: 10,
  //         bold: true,
  //         margin: [0, 5, 0, 5],
  //       },
  //       tableBody: {
  //         fontSize: 10,
  //         margin: [0, 5, 0, 5],
  //       },
  //     },
  //   };
  //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //   pdfMake.createPdf(dd).open();
  // };

  return (
    <>
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            style={{ background: 'green', border: 'none', marginRight: '10px' }}
            className="shadow-none"
            onClick={downloadCSV}
          >
            <Icon.Table /> Excel
          </Button>
          {/* <Button
            style={{ background: '#D11606', border: 'none' }}
            className="shadow-none"
            onClick={downloadPdf}
          >
            <Icon.File /> PDF
          </Button> */}
        </Col>
      </Row>
    </>
  );
};

export default ExportReport;
