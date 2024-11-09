import { UserList } from 'src/@types/users.type'

export type QueryConfig = {
  [key in keyof UserList]: string
} & {
  page: number
  limit: number
}

const BlogPage = () => {
  return (
    <>
      {/* Banner */}
      <div className='h-full w-full'>
        <div>
          <img
            src='https://i.pinimg.com/564x/35/57/0b/35570b7aa7479da468c79c85c40c7014.jpg'
            alt='Event Banner'
            className='w-[2000px] h-[600px]'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='container-xl my-9'>
          <div className='mx-auto'>
            {/* Event Overview */}
            <div className='my-5 flex items-center'>
              <div className='flex-grow border-t border-black'></div>
              <div className='mx-4 text-black text-2xl font-quicksand font-normal uppercase' style={{ wordWrap: 'break-word' }}>
                Tổng quan về sự kiện
              </div>
              <div className='flex-grow border-t border-black'></div>
            </div>

            <div style={{ width: '100%', textAlign: 'justify' }}>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                Tại chương trình
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>Sóng 24</span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                phát sóng vào ngày 9 tháng 2 năm 2024, sau tiết mục mở màn
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                "Anh trai 'say hi!'"
              </span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                với sự góp mặt của 16 nghệ sĩ nam cùng tiết mục "Laviu" của 5 nam ca sĩ, nhà sản xuất
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                Vie Channel
              </span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                chính thức công bố ra mắt một chương trình truyền hình âm nhạc thực tế mới trong năm 2024, với tên là
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                Anh trai "say hi"
              </span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                .<br /> <br />
                Những thông tin tiếp theo về chương trình được nhà sản xuất tiết lộ vào ngày 14 tháng 3 năm 2024. Theo đó, chương trình dự kiến sẽ lên
                sóng vào tháng 6 năm 2024 và sẽ là chương trình truyền hình âm nhạc dành riêng cho các nghệ sĩ là nam. Theo chia sẻ của nhà sản xuất,
                chương trình truyền hình thực tế này có format hoàn toàn mới, nơi các nghệ sĩ trẻ có cơ hội tự hoàn thiện và nâng cấp bản thân để có
                thể xuất hiện trong một đội hình ca sĩ hoàn hảo, nhằm mang đến những sản phẩm âm nhạc chất lượng.
                <br /> <br />
                Ngày 9 tháng 4 năm 2024,
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>Trấn Thành</span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                được thông báo là người dẫn chương trình của
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                Anh trai "say hi"
              </span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                trên fanpage chính thức của chương trình. Anh sẽ giữ vai trò kết nối để giúp khán giả hiểu hơn về câu chuyện, niềm đam mê và hoài bão
                của các nghệ sĩ tham gia chương trình.
              </span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                Sau đó, vào ngày 15 tháng 4 năm 2024,
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>JustaTee</span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                được công bố là giám đốc âm nhạc chính thức của chương trình - người chịu trách nhiệm sản xuất âm nhạc, phụ trách các vấn đề liên quan
                đến chuyên môn nhằm đảm bảo các nhóm thể hiện được hết tài năng, cá tính của từng người và mang đến những tiết mục trình diễn đặc sắc.
                Theo thông báo của nhà sản xuất được đăng trên fanpage của chương trình vào ngày 16 tháng 4 năm 2024, chương trình sẽ ghi hình vào các
                ngày 20 và 21 tháng 4, và danh tính các "anh trai" sẽ được tiết lộ sau ngày ghi hình.
              </span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                Ngày 22 tháng 4 năm 2024, chỉ một ngày sau đợt ghi hình, toàn bộ
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>30 "anh trai"</span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                tham gia chương trình chính thức được công bố. Lý giải về việc chương trình có 30 "anh trai", đại diện nhà sản xuất cho biết đây là một
                chương trình thuần Việt được tổ chức dành riêng cho
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>30 ca sĩ, rapper</span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                mang trong mình tuổi trẻ tươi nguyên, khát vọng đột phá và giấc mơ rạng danh văn hóa bản địa.
                <br /> <br />
                Bộ cam kết ủng hộ, thúc đẩy cùng đưa
              </span>
              <span style={{ color: '#2290FC', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>30 anh trai</span>
              <span style={{ color: 'black', fontSize: '22px', fontFamily: 'Quicksand', fontWeight: 400, wordWrap: 'break-word' }}>
                đến với người dân Việt Nam qua các buổi diễn, giao lưu khán giả cũng như tham gia các chương trình âm nhạc quốc tế, giới thiệu tài năng Việt Nam
                đến gần hơn với khán giả khắp thế giới.
                <br /> <br />
                Các thông tin về 30 nghệ sĩ sẽ có mặt trong chương trình sẽ được công bố vào ngày 30 tháng 4 năm 2024.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
