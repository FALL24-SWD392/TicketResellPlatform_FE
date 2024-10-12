import { Ticket } from 'src/@types/ticket.type'

interface TicketCardProps {
  ticket: Ticket
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  console.log(ticket)
  return (
    <div className='bg-white-normal p-3 rounded-md w-full flex justify-between card-shadow' onClick={() => {}}>
      <img className='w-1/2 rounded-md' src={ticket.image || 'https://placehold.co/220'} alt={ticket.title} />
      <div className='w-1/2 pl-2 pr-1 flex flex-col justify-between'>
        <div className='w-full'>
          <h1 className='font-bold w-full text-justify text-2xl mb-1'>{ticket.title}</h1>
          <p className='text-lg w-full leading-none  mb-2'>{ticket.description}</p>
          <p className='text-md w-full leading-none text-justify'> Valid til: {ticket.expDate}</p>
        </div>
        <div className="w-full flex justify-between items-center">
            <p className='text-md'>Remain: {ticket.quantity}</p>
            <button className='font-medium text-blue-dark text-md rounded-xl cursor-pointer bg-yellow-normal px-2 py-1 transition-transform-colors-opacity
            backdrop-opacity-10 hover:bg-yellow-normalHover'>Buy now</button>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
