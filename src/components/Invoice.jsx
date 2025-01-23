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
    const doc = new jsPDF();

    // Add logo
    doc.addImage(logo, "PNG", 10, 10, 50, 20);

    // Title
    doc.setFontSize(16);
    doc.text("Invoice", 105, 40, { align: "center" });

    // Invoice Details
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(create_time).toLocaleDateString()}`, 10, 60);
    doc.text(`Invoice #: ${id}`, 10, 70);
    doc.text(`Status: ${status}`, 10, 80);

    // Customer Information
    doc.text("Customer Details:", 10, 100);
    doc.text(`Name: ${name.given_name} ${name.surname}`, 10, 110);
    doc.text(`Email: ${email_address}`, 10, 120);

    // Shipping Information
    doc.text("Shipping Address:", 10, 140);
    doc.text(`${full_name}`, 10, 150);
    doc.text(`${address_line_1}, ${admin_area_2}, ${admin_area_1}`, 10, 160);
    doc.text(`${postal_code}, ${country_code}`, 10, 170);

    // Payment Details
    doc.text("Order Details:", 10, 190);
    doc.text(`Reference ID: ${reference_id}`, 10, 200);
    doc.text(`Description: ${captures[0].id}`, 10, 210);
    doc.text(`Amount: ${amount.value} ${amount.currency_code}`, 10, 220);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 105, 270, { align: "center" });

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
