import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Ticket } from 'src/@types/ticket.type'

interface TicketCardProps {
  ticket: Ticket
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const date = dayjs(ticket.expDate).format('DD MMM YYYY')
  const time = dayjs(ticket.expDate).format('h:mm A')
  console.log(date)
  console.log(time)
  
  return (
    <Link to={`/ticket-detail/${ticket.id}`} key={ticket.id}>
      <Card className='w-[306px] h-[297px]' shadow='md' >
        <CardHeader className='flex-col items-start justify-center'>
          <Image
            alt='Card background'
            className='object-cover rounded-xl mx-auto '
            // src= {ticket.image} 
            src='https://nextui.org/images/hero-card.jpeg'
            width={306}
            height={200}
            
          />
        </CardHeader>
        <CardBody className='overflow-visible py-2'>
          <p className='text-tiny uppercase font-bold'>{ticket.title}</p>
          <small className='text-green-darkHover '>{ticket.unit_price} VND</small>
          <small className=''>{date} - {time}</small>
        </CardBody>
      </Card>
    </Link>
  )
}

export default TicketCard
