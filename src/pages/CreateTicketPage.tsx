import { useContext } from "react";
import { AppContext } from "src/context/app.context";

const initForm = {
    title:"",
    dateExpire: "",
    timeExpire:"",
    price:"",
    typeTicket:"",
    quantity:"",
    description:"",
    image:"",
    
}

const CreateTicketPage = () => {
  const { profile } = useContext(AppContext)

    return (
        <div>
        <h1>Create Ticket</h1>
        </div>
    );
};
export default CreateTicketPage;