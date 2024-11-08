import { ChatRoom } from "src/@types/chat.type"

export default ({room} : {room : ChatRoom}) => {
    console.log(room);
    return (
        <div className="w-full flex p-2 justify-center items-center cursor-pointer border-b-1 border-white-dark">
            <img src="https://placehold.co/400" alt="profile" className="rounded-full h-10 w-10" />
            <div className="ml-2">
                <h1 className="text-lg">User Name</h1>
                <p className="text-sm text-black-lightActive">Last Message</p>
            </div>
        </div>
    )
}