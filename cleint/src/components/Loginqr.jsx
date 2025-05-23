import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import axios  from 'axios';

import {QRCodeCanvas} from 'qrcode.react';

const Loginqr = () => {
  const [qrLink, setQrLink] = useState('');
  const [qrCode, setQrCode] = useState('#FF0305');
 const qrRef = useRef();


const SaveQr = async() => {
  const utoken = localStorage.getItem('utoken');

  try {
    const responce =  await axios.post("http://localhost:5000/testuser/addlinkqr",{
        qrlink:qrLink,
        qrcolor:qrCode
    },
    {
       headers:{
         'Content-Type':'application/json',
         Authorization:`Bearer ${utoken}`
       }
  })
    console.log(responce.data)
  } catch (error) {
     console.log(error)
  }

}
const DownloadQr = () => {
  const canvas = qrRef.current?.querySelector('canvas');
  if (!canvas) {
    console.error('Canvas not found');
    return;
  }

  try {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  } catch (err) {
    console.error('Failed to export QR code:', err);
  }
};
  return (
    <div className='flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100'>
      <Helmet>
        <title className='text-2xl font-bold mb-4'>Login QR Page</title>
      </Helmet>

      <h2 className='text-3xl font-bold mb-3 '>This is qrcode </h2>

      <input                                                                        
        type="text"                 
           placeholder='type your link here'                                    
            className='mb-4 p-2 w-80 border rounded'
              onChange={(e)=>setQrLink(e.target.value)} />

      <input
          type="color"
             className='mb-4 p-2 border ' value={qrCode}
                onChange={(e)=>setQrCode(e.target.value)}
            /> 

      <div ref={qrRef} className='p-2 rounded-lg shadow-lg bg-white'>
  
      <QRCodeCanvas
       value={qrLink}
        fgColor={qrCode} 
        size='200' includeMargin='true' >
        </QRCodeCanvas>
        
      </div>
        <button className='mt-4 py-2 px-4  bg-green-500 hover:bg-amber-200 text-white transition' onClick={SaveQr}>
         SaveQr
      </button>

      <button className='mt-4 py-2 px-4  bg-blue-500 hover:bg-amber-200 text-white transition' onClick={DownloadQr}>
         Download
      </button>


    </div>
  );
};

export default Loginqr;
