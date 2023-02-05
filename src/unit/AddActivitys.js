import moment from "moment";
import "moment-timezone";
import axios from "axios";
// TODO:ID還沒做修改

export const addActivitys = (title, description, status) => {
  moment.tz.guess();
  moment.locale("zh-tw");
  moment.tz.setDefault("Asia/Taipei");
  // console.log(moment.locale("zh-tw"));

//   console.log(moment().format("YYYY-MM-DD hh:mm:ss"));
  const PostData = {
    title: title,
    description: description,
    time: moment().format("YYYY-MM-DD hh:mm:ss"),
    status: status,
    user_id: 1,
  };
  axios
    .post(
      "http://192.168.137.239/www/Project_back/public/api/activitys",
      PostData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      console.log("sucessful response");
      //   console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
