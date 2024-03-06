import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./notification.scss";
import bell from "assets/images/bell.svg";
import { Drawer } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification, markAsRead } from "action/notification";

const NotificationBar = () => {

  const [open, setOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const dispatch = useDispatch();
  const { isOpen, notifications, isLoading } = useSelector((state) => state.notification);
  console.log(notifications)
  const showDrawer = () => {
    setOpen(true);
    dispatch({
      type: "TOGGLE_NOTIFICATION",
      payload: {
        isOpen: true
      }
    });
  };

  const onClose = () => {
    setOpen(false);
    dispatch({
      type: "TOGGLE_NOTIFICATION",
      payload: {
        isOpen: false
      }
    });
  };


  const [readMessages, unReadMessages] = useMemo(() => {
    let reads = [], unReads = [];
    if (notificationData?.length) {
      notificationData.map(a => {
        if (a.isRead) reads.push(a);
        else unReads.push(a);
      });
    }
    return [reads, unReads];
  }, [isLoading, notifications, isOpen])


  const handleMarkAsRead = async (payload) => {
    try {
      await markAsRead(dispatch, payload);
      await getAllNotification(dispatch);
    } catch (error) {
      console.log("error", error)
    }
  }

  const unReads = useMemo(() => {
    return notificationData?.filter(a => a?.isRead == false)
  }, [notifications, isOpen, notificationData])


  useEffect(() => {
    setNotificationData(notifications?.list);
  }, [isLoading, isOpen])

  useEffect(() => {
    getAllNotification(dispatch)
  }, [])

  return (
    <>
      <div className="mr-3 cursor-pointer">
        <img src={bell} width={45} alt="" onClick={showDrawer} />
        <span className="count">
          <span className="count_label">
            {unReads?.length > 9 ? unReads?.length : "0" + unReads?.length}
          </span>
        </span>
      </div>
      <Drawer title="Notification" placement="right" onClose={onClose} open={open}>
        <div className="sideBar">
          {notificationData?.length > 0 ? (
            <div className="content_box">
              {unReads.filter((a) => Boolean(!a?.isRead)).map((data, index) => (
                <div className="bg-white border-bottom" key={index} >
                  <div className="d-flex justify-content-between p-3 rounded gap-1">
                    <div className="font_bar">
                      <div className="notificaion_title"><p style={{ margin: 0 }}>{data.title}</p></div>
                      <div className="order_text" dangerouslySetInnerHTML={{ __html: data?.description }}>
                      </div>
                      <div className="isRead" onClick={() => handleMarkAsRead({ id: data?._id })}>Mark as read</div>
                    </div>
                  </div>
                </div>
              ))}
              {readMessages.filter((a) => Boolean(a?.isRead)).map((data, index) => (
                <div className="border-bottom" key={index} style={{ background: "#eee" }} >
                  <div className="d-flex justify-content-between p-3 rounded gap-1">
                    <div className="font_bar">
                      <div className="notificaion_title"><p style={{ margin: 0 }}>{data.title}</p></div>
                      <div className="order_text" dangerouslySetInnerHTML={{ __html: data?.description }}>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="noData">No Notifications</p>
          )
          }
        </div>

      </Drawer >
    </>
  );
};

export default NotificationBar;
