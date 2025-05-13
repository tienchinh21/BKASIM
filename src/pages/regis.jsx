import { memo } from "react";
import "../css/regis.css"; // Import your CSS file here

function Regis() {



    return (
        <div>
            <p> Bạn muốn trở thành mentee hay mentor?</p>
            <div className="options">
                <div className="option mentee">
                    <img src="/path/to/mentee-image.png" alt="Mentee" />
                    <h3>Mentee</h3>
                    <p>
                        Cựu sinh viên, Sinh viên có khát vọng phát triển bản thân, xây
                        dựng sự nghiệp, tạo giá trị cho cộng đồng.
                    </p>
                </div>
                <div
                    className="option mentor">
                    <img
                        src="/path/to/mentor-image.png"
                        alt="Mentor" />
                    <h3>Mentor</h3>
                    <p>
                        Anh/chị cựu sinh viên có kinh nghiệm về quản trị & điều hành doanh nghiệp.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default memo(Regis)