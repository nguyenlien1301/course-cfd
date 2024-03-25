import React from "react";
import { formatDate } from "../../utils/format";
import Accordion from "../../components/Accordion";

const ContentDetailSection = ({
  description,
  schedule = [],
  content = [],
  required = [],
  teams = [],
}) => {
  const { startDate, days, address, time } = schedule || {};
  const modifieldContent = content?.map((item, index) => {
    const { id, title, description } = item || {};
    return {
      id: id || new Date().getTime() + index,
      title,
      content: description,
    };
  });
  console.log("teams ====> ", teams);
  return (
    <section className="contentdetail">
      <div className="content">
        <div className="container">
          <div className="contentrow ctintro">
            <h3 className="contentrow__title title --t3">Giới thiệu</h3>
            <div className="contenteditor">
              <h2
                style={{
                  fontSize: "inherit",
                  margin: "inherit",
                  fontFamily: "inherit",
                  lineHeight: "inherit",
                }}
                dangerouslySetInnerHTML={{ __html: description }}
              ></h2>
              <h3>
                <strong>
                  Khoá học FRONTEND MASTER được chia làm 3 giai đoạn chính:
                </strong>
              </h3>
              <p>
                - <strong>FRONTEND NEWBIE</strong>: <strong>Thời lượng</strong>{" "}
                6 tuần (2 buổi/tuần). <strong>Thời gian học</strong> 18h45 -
                21h45 thứ 3, 7
              </p>
              <p>
                - <strong>WEB RESPONSIVE</strong>:<strong>Thời lượng</strong> 5
                tuần (3 buổi/tuần).
                <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
              </p>
              <p>
                - <strong>REACTJS MASTER:</strong> <strong>Thời lượng</strong> 6
                tuần (3 buổi/tuần).
                <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
              </p>
              <p>
                <strong>HÌNH THỨC HỌC: </strong>OFFLINE HOẶC ONLINE GOOGLE MEET
                CÙNG VỚI LỚP OFFLINE
              </p>
              <p>
                <strong>SỐ LƯỢNG HỌC VIÊN: </strong>15-20 học viên
              </p>
              <p style={{ color: "#00afab" }}>
                KHOÁ HỌC NÀY ĐANG CÓ ƯU ĐÃI{" "}
                <strong style={{ fontSize: 22 }}>GIẢM GIÁ</strong> TỪ
                <strong style={{ fontSize: 22 }}>15.400.000 VND</strong> CHỈ CÒN{" "}
                <strong style={{ fontSize: 22 }}>14.700.000 VND.</strong>
              </p>
              <p style={{ color: "#00afab" }}>
                <strong style={{ fontSize: 22 }}>GIẢM 200K</strong> CHO MỖI HỌC
                VIÊN HỌC THEO{" "}
                <strong style={{ fontSize: 22 }}>NHÓM 2 NGƯỜI.</strong>
              </p>
              <p style={{ color: "#00afab" }}>
                <strong style={{ fontSize: 22 }}>GIẢM 300K</strong> CHO MỖI HỌC
                VIÊN HỌC THEO{" "}
                <strong style={{ fontSize: 22 }}>NHÓM TỪ 3 NGƯỜI</strong> TRỞ
                LÊN.
              </p>
              <div className="videowrap">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                  width={560}
                  height={315}
                  frameBorder={0}
                  allowFullScreen="allowfullscreen"
                />
              </div>
            </div>
          </div>
          <div className="contentrow ctschedule">
            <h3 className="contentrow__title title --t3">Lịch học</h3>
            <div className="ctschedule__box">
              <div className="info">
                {startDate && (
                  <div className="labeltext">
                    <span className="label --blue">Khai giảng</span>
                    <p className="title --t3">{formatDate(startDate || "")}</p>
                  </div>
                )}
                {days && (
                  <div className="labeltext">
                    <span className="label --blue">Ngày học</span>
                    <p className="title --t3">{days}</p>
                  </div>
                )}
                <div className="labeltext">
                  <span className="label --blue">Thời gian</span>
                  <p className="title --t3">18h45 - 21h45</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Địa điểm</span>
                  <p className="title --t3">
                    Lầu 2, số 666/46/29, đường Ba Tháng Hai, phường 14, quận 10,
                    TP HCM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="contentrow ctlession">
            <h3 className="contentrow__title title --t3">Nội dung khoá học</h3>
            {content.length && <Accordion data={modifieldContent} />}
          </div>
          <div className="contentrow ctrequest">
            <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
            <div className="ctrequest__content">
              {required?.map((item, index) => (
                <p key={item.id || index}>{item}</p>
              ))}
            </div>
          </div>
          <div className="contentrow ctteacher">
            <h3 className="contentrow__title title --t3">Giảng viên</h3>
            <div className="ctteacher__content">
              {teams?.map((item, index) => {
                const { id, name, tags, image, jobTitle, description } =
                  item || {};
                return (
                  <div key={id || index} className="itemteacher">
                    <div className="itemteacher__avatar">
                      <img src={image || ""} alt="CFD Circle" />
                    </div>
                    <div className="itemteacher__info">
                      <div className="itemteacher__info-name">
                        <p className="title --t3">{name || ""}</p>
                        <span className="label badge --teacher">{tags}</span>
                      </div>
                      <h5 className="itemteacher__info-pos label">
                        {jobTitle || ""}
                      </h5>
                      <p className="itemteacher__info-des">
                        {description || ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentDetailSection;
