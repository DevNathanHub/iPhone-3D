import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from '../../public/assets/images/blue.jpg';
import Navbar from "./Navbar";

const Invoice = () => {
  // Fetch order details from local storage
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

  if (!orderDetails) {
    return (
      <div className="dark-bg text-center">
        <p className="text-red-500">No order details found. Please try again.</p>
      </div>
    );
  }

  const { id, payer, purchase_units, create_time, status } = orderDetails;
  const { name, email_address } = payer;
  const {
    amount,
    shipping,
    reference_id,
    payments: { captures },
  } = purchase_units[0];
  const { full_name } = shipping.name;
  const { address_line_1, admin_area_2, admin_area_1, postal_code, country_code } = shipping.address;

  // Generate PDF function
  const generatePDF = () => {
    const doc = new jsPDF('landscape', 'mm', 'a5'); // Set to A5 landscape

    // Add logo
    doc.addImage(logo, "PNG", 10, 10, 50, 20);

    // Title
    doc.setFontSize(16);
    doc.text("Invoice", 105, 40, { align: "center" });

    // Table Data
    const tableData = [
      ["Date", new Date(create_time).toLocaleDateString()],
      ["Invoice #", id],
      ["Status", status],
      ["Customer Name", `${name.given_name} ${name.surname}`],
      ["Customer Email", email_address],
      ["Shipping Name", full_name],
      ["Shipping Address", `${address_line_1}, ${admin_area_2}, ${admin_area_1}, ${postal_code}, ${country_code}`],
      ["Reference ID", reference_id],
      ["Description", captures[0].id],
      ["Amount", `${amount.value} ${amount.currency_code}`],
    ];

    // Table Columns
    const columns = ["Field", "Value"];

    // Generate Table
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 60, // Start below the title
      margin: { left: 10, right: 10 },
      headStyles: { fillColor: [41, 128, 185] }, // Blue header
      styles: { fontSize: 10, cellPadding: 3 }, // Adjust font size and padding
    });

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 105, 190, { align: "center" });

    // Save PDF
    doc.save(`invoice_${id}.pdf`);
  };

  return (
    <div className="gap-4 dark-bg text-white">
      <Navbar />
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-400">Invoice</h2>
        <div className="space-y-4 text-sm">
          <p><span className="font-semibold">Date:</span> {new Date(create_time).toLocaleDateString()}</p>
          <p><span className="font-semibold">Invoice #:</span> {id}</p>
          <p><span className="font-semibold">Status:</span> {status}</p>
          <p>
            <span className="font-semibold">Customer Name:</span> {name.given_name} {name.surname}
          </p>
          <p><span className="font-semibold">Email:</span> {email_address}</p>
          <div>
            <p className="font-semibold">Shipping Address:</p>
            <p>{full_name}</p>
            <p>
              {address_line_1}, {admin_area_2}, {admin_area_1}
            </p>
            <p>
              {postal_code}, {country_code}
            </p>
          </div>
          <p>
            <span className="font-semibold">Amount:</span> {amount.value} {amount.currency_code}
          </p>
        </div>
        <button
          onClick={generatePDF}
          className="mt-6 w-full rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
