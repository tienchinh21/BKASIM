import { memo } from "react"


function Card({ handleClick, img, ...props }) {

    return (
        <div
            style={props.style}
            onClick={handleClick}
            className="w-[95%] bg-white rounded-lg p-4 cursor-pointer"
        >
            <img
                src={img}
                alt="logo"
                className="w-full h-[200px] object-cover rounded-lg bg-red-500"
            />
            <h2 className="text-black mt-2 text-lg font-semibold">Tiêu đề bài viết</h2>
        </div>
    )
}


export default memo(Card)