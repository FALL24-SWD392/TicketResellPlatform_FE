import { Ticket } from "src/@types/ticket.type";

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    console.log(ticket);
    return (
        <div>
        </div>
    );
}

export default TicketCard;