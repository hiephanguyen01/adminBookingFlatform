import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import Account from "./Page/Dashboard/Account/Account";
import Dashboard from "./Page/Dashboard/Dashboard";
import Post from "./Page/Dashboard/Post/Post";
import Order from "./Page/Dashboard/Order/Order";
import AccessTime from "./Page/Dashboard/AccessTime/AccessTime";
import ManageAccount from "./Page/ManageAccount/ManageAccount";
import Partner from "./Page/ManageAccount/Partner/Partner";
import Customer from "./Page/ManageAccount/Customer/Customer";
import RankReport from "./Page/RankReport/RankReport";
import ManageOrder from "./Page/ManageOrder/ManageOrder";
import DataExport from "./Page/DataExport/DataExport";
import Dao from "./Page/Dao/Dao";
import Notification from "./Page/Notification/Notification";
import { Partner as NotiPartner } from "./Page/Notification/Partner/Partner";
import PartnerNotificationDetail from "./Page/Notification/Partner/pages/PartnerNotificationDetail";
import { Customer as NotiCustomer } from "./Page/Notification/Customer/Customer";
import CreateNotification from "./Page/Notification/CreateNotification/CreateNotification";
import Setting from "./Page/Notification/Setting/Setting";
import PromoCode from "./Page/PromoCode/PromoCode";
import PromoPartner from "./Page/PromoCode/PromoPartner/PromoPartner";
import PromoCustomer from "./Page/PromoCode/PromoCustomer/PromoCustomer";
import PromoCreate from "./Page/PromoCode/PromoCreate/PromoCreate";
import Dev from "./Page/CoreSetting/Dev";
import CoreSetting from "./Page/CoreSetting/CoreSetting";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="account" element={<Account />}></Route>
            <Route path="post" element={<Post />}></Route>
            <Route path="order" element={<Order />}></Route>
            <Route path="access-times" element={<AccessTime />}></Route>
          </Route>
          <Route path="manage" element={<ManageAccount />}>
            <Route path="partner" element={<Partner />}></Route>
            <Route path="customer" element={<Customer />}></Route>
          </Route>
          <Route path="rank-report" element={<RankReport />}></Route>
          <Route path="manage-order" element={<ManageOrder />}></Route>
          <Route path="data-export" element={<DataExport />}></Route>
          <Route path="dao" element={<Dao />}></Route>
          <Route path="notification" element={<Notification />}>
            <Route path="partner" element={<NotiPartner />}></Route>
            <Route path="customer" element={<NotiCustomer />}></Route>
            <Route path="create" element={<CreateNotification />}></Route>
            <Route path="setting" element={<Setting />}></Route>
            <Route
              path="partner/view-detail"
              element={<PartnerNotificationDetail />}
            />
            <Route
              path="partner/edit"
              element={<PartnerNotificationDetail edit={true} />}
            />
          </Route>
          <Route path="promo-code" element={<PromoCode />}>
            <Route path="partner" element={<PromoPartner />}></Route>
            <Route path="customer" element={<PromoCustomer />}></Route>
            <Route path="create" element={<PromoCreate />}></Route>
          </Route>
          <Route path="setting" element={<CoreSetting />}>
            <Route path="city" element={<Dev />}></Route>
            <Route path="distric" element={<Dev />}></Route>
            <Route path="ward" element={<Dev />}></Route>
            <Route path="webhook" element={<Dev />}></Route>
            <Route path="banned-word" element={<Dev />}></Route>
            <Route path="question" element={<Dev />}></Route>
            <Route path="banner" element={<Dev />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
