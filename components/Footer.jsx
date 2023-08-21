import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center pt-[5.5vw] py-6 hidden sm:block">
      <p>Built by Mel Chanatan.</p>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
