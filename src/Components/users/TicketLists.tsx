import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Chip } from "@nextui-org/react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { TicketList } from "src/@types/ticket.type";

interface TicketListsProps {
  tickets: TicketList[];
  onDeleteTicket: (id: string) => void;
}

const TicketLists: React.FC<TicketListsProps> = ({ tickets, onDeleteTicket }) => {
  // Function to map status to color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "PENDING":
        return "warning";
      case "REJECTED":
        return "danger";
      default:
        return "default";
    }
  };
  // Format date to a readable format
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <Table aria-label="Ticket List Table">
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Exp Date</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.title}</TableCell>
            <TableCell>{ticket.type}</TableCell>
            <TableCell>${ticket.unitPrice.toLocaleString()}</TableCell>
            <TableCell>{ticket.quantity}</TableCell>
            <TableCell>
              <Chip color={getStatusBadgeClass(ticket.status)} size="sm">
                {ticket.status}
              </Chip>
            </TableCell>
            <TableCell>{formatDate(ticket.expDate)}</TableCell>
            <TableCell>
              <Button isIconOnly className="text-green-500 bg-green-100" title="Edit">
                <FaEdit />
              </Button>
              <Button
                isIconOnly
                className="text-red-500 bg-red-100 ml-2"
                title="Delete"
                onClick={() => onDeleteTicket(ticket.id)}
              >
                <FaTrashAlt />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TicketLists;
