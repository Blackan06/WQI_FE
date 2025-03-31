import { useEffect } from "react";
import signalRService from "../../signalR/hub";

const HomePage: React.FC = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token != null) {
      const newConnection = signalRService.connectionServer(token);
      newConnection
        .start()
        .then(() => {
          newConnection.on("newNotify", async (data: any) => {});
          newConnection.on("newNotifyCount", async (data: number) => {
            // const newSession = {
            //   ...token,
            //   user: {
            //     ...session?.user,
            //     currenNoticeCount: data,
            //   },
            // };
            // await sessionUpdate({ ...newSession });
          });
        })
        .catch((err) => console.log(err));
      return () => {
        newConnection
          .stop()
          .then(() => {})
          .catch(() => {});
      };
    }
  }, []);
  return (
    <div>
      <h1 className="text-blue-800">HOME_PAGE_WELLCOME_YOU!!!!!</h1>
    </div>
  );
};

export default HomePage;
