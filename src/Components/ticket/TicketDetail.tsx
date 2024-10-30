import { ReactNode } from "react";
import { Ticket } from "src/@types/ticket.type";


interface Props {
    ticket: Ticket;
    rederProps?: ReactNode
}

const TicketDetail = () => {

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-6">
      {/* Product Images */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2">
          <img
            src="https://via.placeholder.com/400"
            alt="Main Product"
            className="rounded-lg w-full h-72 object-cover"
          />
          <div className="flex mt-4 gap-2">
            <img src="https://via.placeholder.com/100" alt="Thumbnail" className="w-20 h-20 rounded-lg object-cover" />
            <img src="https://via.placeholder.com/100" alt="Thumbnail" className="w-20 h-20 rounded-lg object-cover" />
            <img src="https://via.placeholder.com/100" alt="Thumbnail" className="w-20 h-20 rounded-lg object-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full sm:w-1/2">
          <h1 className="text-2xl font-bold">Gạo Séng Cù đặc sản Lào Cai túi 10kg</h1>
          <p className="text-red-600 text-xl font-semibold mt-2">240,000 đ</p>
          <p className="text-gray-600">Phường An Khánh (Quận 2 cũ), Thành phố Thủ Đức, Tp Hồ Chí Minh</p>
          <p className="text-sm text-gray-500 mt-1">Cập nhật 4 giờ trước</p>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
            Hiện số 035960****
          </button>
          <button className="mt-4 ml-2 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400">
            Chat
          </button>
          <div className="mt-4 flex items-center gap-1">
            <span className="font-semibold">Banafoods</span>
            <span className="text-yellow-500">&#9733; 5</span>
            <span className="text-gray-500">(1 đánh giá)</span>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Mô tả chi tiết</h2>
        <p className="mt-2 text-gray-700">
          Gạo Séng Cù đặc sản Lào Cai túi 10kg thương mới cả nhà! Séng Cù vừa nước dẻo thơm từng hạt, ai đã ăn thì ghiền không thể nào dứt. Cơm để nguội vẫn dẻo ngon.
        </p>
      </div>

      {/* Product Details */}
      {/*  */}

      {/* Similar Product Button */}
      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
          Bạn có sản phẩm tương tự?
        </button>
      </div>
    </div>
  );
    
}

export default TicketDetail