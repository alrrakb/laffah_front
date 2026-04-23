import { Link } from "react-router-dom";

function WhatsApp() {
  return (
    <Link to="https://wa.me/966560602341" target="_blank">
      <div className="fixed bottom-5 right-5 bg-green-500 rounded-full w-15 h-15 flex justify-center items-center shadow-lg cursor-pointer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-7 h-7"
        />
      </div>
    </Link>
  );
}

export default WhatsApp;
