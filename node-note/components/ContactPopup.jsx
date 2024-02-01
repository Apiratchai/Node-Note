'use client';

const ContactPopup = ({ open, onClose }) => {

  const handleOnClose = (e) => {
    if(e.target.id === 'container') onClose();
  }

    if(!open) return null

  return (
    <div className=''>
      <div id='container' onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-50 backdrop-brightness-50 flex justify-center items-center">
        <div className='box-content h-[160px] w-[400px] bg-white p-7 rounded'>
          <div className="flex flex-col justify-center items-center space-y-2">
            <h1 className="text-3xl mb-3 text-black"> Contact Us </h1>
            <div className="flex flex-row gap-5 ">
              <span className="text-xl gap-3 text-black">
                Apiratchai Lakkum
              </span>
              <a href = 'https://web.facebook.com/profile.php?id=100088070056042' className="cursor-pointer px-1 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-25 text-black transition duration-175">
                Facebook
              </a>
              <button className="cursor-pointer px-1 hover:text-orange-500 hover:bg-orange-500 hover:bg-opacity-25 text-black transition duration-175">
                Email
              </button>
            </div>
            <div className="flex flex-row gap-3 text-black">
              <span className="text-xl gap-3">
                Kunasin Salabsri
              </span>
              <a href='https://web.facebook.com/kunasin.salabsri.7' className="cursor-pointer px-1 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-25 text-black transition duration-175">
                Facebook
              </a>
              <button className="cursor-pointer px-1 hover:text-orange-500 hover:bg-orange-500 hover:bg-opacity-25 text-black transition duration-175">
                Email
              </button>
            </div>
            <div className="flex flex-row gap-3 text-black">
              <span className="text-xl gap-3">
                Achitapan Sutthiwanna
              </span>
              <a href = 'https://web.facebook.com/A.Sutthivanna' className="cursor-pointer px-1 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-25 text-black transition duration-175">
                Facebook
              </a>
              <button className="cursor-pointer px-1 hover:text-orange-500 hover:bg-orange-500 hover:bg-opacity-25 text-black transition duration-175">
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )

}

export default ContactPopup
