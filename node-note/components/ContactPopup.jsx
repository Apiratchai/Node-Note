'use client';
import { Copy } from "lucide-react";
import { toast } from "sonner";

const ContactPopup = ({ open, onClose }) => {

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  }

  const handleCopyToClipboard = (email) => {
    navigator.clipboard.writeText(email)
      .then(() => {
        toast.dismiss();
        console.log('Email address copied to clipboard:', email);
        toast.success(`${email} copied to clipboard`, {duration:1000});
      })
      .catch(err => {
        console.error('Failed to copy email address:', err);
        toast.error('Failed to copy email address');
      });
  };


  if (!open) return null;

  return (
    <div>
      <div id='container' onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-50 backdrop-brightness-50 flex justify-center items-center">
        <div className='box-content h-[180px] w-[750px] bg-white p-7 rounded'>
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl mb-8 text-black text-center"> Contact Us </h1>
            {[
              { name: "Apiratchai Lakkum", role: "Full stack", facebook: "https://web.facebook.com/profile.php?id=100088070056042", email: "Apiratchai@kkumail.com" },
              { name: "Kunasin Salabsri", role: "UI designer", facebook: "https://web.facebook.com/kunasin.salabsri.7", email: "Kunasin.s@kkumail.com" },
              { name: "Achitapan Sutthiwanna", role: "Front end", facebook: "https://web.facebook.com/A.Sutthivanna", email: "Achitapan.s@kkumail.com" }
            ].map((member, index) => (
              <div key={index} className="flex flex-row justify-between items-center">
                <div className="cursor-default text-sm md:text-xl text-black">{member.name}</div>
                <div className="cursor-default text-xs font-bold text-green-700 absolute ml-40 md:ml-60 mt-1">{member.role}</div>
                <div className="flex absolute ml-40 md:ml-96 mt-1 gap-x-8">
                  <a href={member.facebook} className="cursor-pointer text-blue-500 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-25 transition duration-175">Facebook</a>
                  <a href={`mailto:${member.email}`} className="text-orange-400 hover:text-orange-500 hover:bg-orange-500 hover:bg-opacity-25 transition duration-175">Email: {member.email}</a>
                  <button className="flex justify-center items-center rounded-md absolute ml-[350px] w-6 h-6 hover:bg-gray-200 text-gray-700" onClick={() => handleCopyToClipboard(member.email)}>
                    <Copy className="w-5 h-5 mt-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPopup;
