import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between px-24 py-5 bg-primary text-white md:flex-col lg:px-9 md:gap-6">
      <div>
        <p>2020 FazzPay. All right reserved.</p>
      </div>
      <div className="flex gap-10 md:flex-col md:gap-0">
        <p>+62 5637 8882 9901</p>
        <p>contact@fazzpay.com</p>
      </div>
    </footer>
  );
};

export default Footer;
