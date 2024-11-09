import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col  text-white" role="main">
      <div className="flex-grow flex flex-col items-center justify-center px-4 bg-[#12f330]">
        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold">SUCCESSED</span>
        </div>
        <div className="text-center">
          <h1 className="text-[150px] font-bold leading-none " aria-label="sucessed">SUCCESSFULLY</h1>
          <p className="text-xl mb-8" role="status">THANK YOU !!!</p>
          <Button 
            color="success" 
            variant="solid"
            onClick={() => navigate('/')}
            className="font-semibold px-6"
            aria-label="Return to Homepage"
          >
            Go To Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
