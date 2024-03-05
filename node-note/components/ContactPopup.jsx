'use client';

const ContactPopup = ({ open, onClose }) => {

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  }

  if (!open) return null;

  return (
    <div>
      <div id='container' onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-50 backdrop-brightness-50 flex justify-center items-center">
        <div className='box-content h-[180px] w-[500px] bg-white p-7 rounded'>
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl mb-8 text-black text-center"> Contact Us </h1>
            {[
              { name: "Apiratchai Lakkum", role: "Full stack", facebook: "https://web.facebook.com/profile.php?id=100088070056042", email: "apiratchai.l@kkumail.com" },
              { name: "Kunasin Salabsri", role: "UI designer", facebook: "https://web.facebook.com/kunasin.salabsri.7", email: "kunasin.s@kkumail.com" },
              { name: "Achitapan Sutthiwanna", role: "Front end", facebook: "https://web.facebook.com/A.Sutthivanna", email: "achitapan.s@kkumail.com" }
            ].map((member, index) => (
              <div key={index} className="flex flex-row justify-between items-center">
                <div className="text-sm md:text-xl text-black">{member.name}</div>
                <div className="text-xs font-bold text-green-700 absolute ml-40 md:ml-60 mt-1">{member.role}</div>
                <div className="flex gap-3 test-xs md:text-base">
                  <a href={member.facebook} className="cursor-pointer  text-blue-500 px-1 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-25 text-black transition duration-175">Facebook</a>
                  <a href={member.email} className="cursor-pointer text-orange-400 px-1 hover:text-orange-500 hover:bg-orange-500 hover:bg-opacity-25 text-black transition duration-175">Email</a>
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
