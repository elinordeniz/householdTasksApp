import { store } from "../../app/store";
import { tasksApiSlice } from "../tasks/tasksApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    //bu farklı bir yol, buna gerek yok aşağıda inbuilt prefetch metodu var onu kullanacağız
    //  const tasks = store.dispatch(tasksApiSlice.endpoints.getTasks.initiate())
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    store.dispatch(
      tasksApiSlice.util.prefetch("getTasks", "tasksList", { force: true })
    );
    store.dispatch(
      tasksApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );

    //Bunu da kullanmamıza gerek yok, çünkü prefetch metodu kullandığımız için temizlememiz gereken bi cache yok
    // return () => {
    //     console.log('unsubscribing')
    //     tasks.unsubscribe()
    //     users.unsubscribe()
    // }
  }, []);

  return <Outlet />;
};
export default Prefetch;
