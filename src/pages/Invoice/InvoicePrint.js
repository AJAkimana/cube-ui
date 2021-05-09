import React from "react";

export const InvoicePrint = ({ invoice = {} }) => {
  const thBg = {
    backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #dcdcdc 100%)",
  };
  const users = [];
  return (
    <div>
      <div style={{ margin: "00px" }}>
        <img
          src="https://user-images.githubusercontent.com/69037813/109541196-353c6680-7acc-11eb-9ccf-c7101d358f39.png"
          style={{ width: "150px", marginBottom: "80px" }}
          alt="Augmented"
        />
        <div
          style={{
            float: "right",
            padding: "20px",
            color: "gray",
            fontWeight: "500",
            textAlign: "justify",
          }}
        >
          <div>Company: Time Capsule 3D</div>
          <div>Email: info@timecapsule3d.com</div>
          <div>Phone: +1 905-604-7855</div>
          <div>Address: 80F Centurian Dr #10, Canada</div>
        </div>
      </div>
      <h2
        style={{
          width: "70%",
          margin: "auto",
          textAlign: "center",
          background: "#eee",
          borderBottom: "1px solid #ddd",
        }}
      >
        Invoice
      </h2>
      <div
        style={{ padding: "20px", marginBottom: "00px", paddingBottom: "00" }}
      >
        <table style={{ width: "70%", margin: "auto" }} border="3">
          <tbody>
            <tr>
              <th style={thBg}>Order Id</th>
              <th style={thBg}>Due Date</th>
              <th style={thBg}>Amount</th>
            </tr>
          </tbody>
          {users.map((user) => (
            <tr>
              <td>{user.orderId}</td>
              <td>{user.due_date}</td>
              <td>{user.amount}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
