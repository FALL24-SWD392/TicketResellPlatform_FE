import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const FailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col  text-white" role="main">
      <div className="flex-grow flex flex-col items-center justify-center px-4 bg-[#F31260]">
        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold">ERROR</span>
        </div>
        <div className="text-center">
          <h1 className="text-[200px] font-bold leading-none " aria-label="404 Error">FAILED</h1>
          <p className="text-xl mb-8" role="status">PLEASE TRY AGAIN !!!</p>
          <Button 
            color="danger" 
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

export default FailPage;
