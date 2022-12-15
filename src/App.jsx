import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import AskedQuestion from "./Page/CoreSetting/AskedQuestion/AskedQuestion";
import Banks from "./Page/CoreSetting/Banks/Banks";
import CreateBank from "./Page/CoreSetting/Banks/components/CreateBank/CreateBank";
import EditBank from "./Page/CoreSetting/Banks/components/EditBank/EditBank";
import BannedWord from "./Page/CoreSetting/BannedWord/BannedWord";
import Banner from "./Page/CoreSetting/Banner/Banner";
import CreateBanner from "./Page/CoreSetting/Banner/Components/CreateBanner/CreateBanner";
import EditBanner from "./Page/CoreSetting/Banner/Components/EditBanner/EditBanner";
import City from "./Page/CoreSetting/City/City";
import CoreSetting from "./Page/CoreSetting/CoreSetting";
import Dev from "./Page/CoreSetting/Dev";
import District from "./Page/CoreSetting/District/District";
import Ward from "./Page/CoreSetting/Ward/Ward";
import CreateWebHook from "./Page/CoreSetting/webHook/components/CreateWebHook/CreateWebHook";
import EditWebHook from "./Page/CoreSetting/webHook/components/EditWebHook/EditWebHook";
import WebHook from "./Page/CoreSetting/webHook/WebHook";
import Dao from "./Page/Dao";
import AccessTime from "./Page/Dashboard/AccessTime/AccessTime";
import Account from "./Page/Dashboard/Account/Account";
import Dashboard from "./Page/Dashboard/Dashboard";
import Order from "./Page/Dashboard/Order/Order";
import Post from "./Page/Dashboard/Post/Post";
import DataExport from "./Page/DataExport/DataExport";
import Customer from "./Page/ManageAccount/Customer/Customer";
import { CustomerDetail } from "./Page/ManageAccount/Customer/Detail";
import { EditCustomer } from "./Page/ManageAccount/Customer/EditCustomer";
import ManageAccount from "./Page/ManageAccount/ManageAccount";
import { PartnerDetail } from "./Page/ManageAccount/Partner/Detail";
import { DetailEditPartner } from "./Page/ManageAccount/Partner/DetailEdit";
import Partner from "./Page/ManageAccount/Partner/Partner";
import DetailOrder from "./Page/ManageOrder/Detail";
import { ManageOrder } from "./Page/ManageOrder/ManageOrder";
import { ManagePost } from "./Page/ManagePost";
import { PostDetail } from "./Page/ManagePost/Detail/Detail";
import CreateNotification from "./Page/Notification/CreateNotification/CreateNotification";
import { Customer as NotiCustomer } from "./Page/Notification/Customer/Customer";
import Notification from "./Page/Notification/Notification";
import PartnerNotificationDetail from "./Page/Notification/Partner/pages/PartnerNotificationDetail";
import { Partner as NotiPartner } from "./Page/Notification/Partner/Partner";
import Setting from "./Page/Notification/Setting/Setting";
import PromoCode from "./Page/PromoCode/PromoCode";
import PromoCreate from "./Page/PromoCode/PromoCreate/PromoCreate";
import PromoCustomer from "./Page/PromoCode/PromoCustomer/PromoCustomer";
import PromoPartner from "./Page/PromoCode/PromoPartner/PromoPartner";
import DetailRateReport from "./Page/RankReport/Detail/DetailRateReport";
import RankReport from "./Page/RankReport/RankReport";

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
            <Route path="partner/:id" element={<PartnerDetail />}></Route>
            <Route
              path="partner/edit/:id"
              element={<DetailEditPartner />}
            ></Route>

            <Route path="customer" element={<Customer />}></Route>
            <Route path="customer/:id" element={<CustomerDetail />}></Route>
            <Route path="customer/edit/:id" element={<EditCustomer />}></Route>
          </Route>

          <Route path="rank-report" element={<RankReport />}></Route>
          <Route path="rank-report/:id" element={<DetailRateReport />}></Route>
          <Route path="manage-order" element={<ManageOrder />} />
          <Route path="manage-order/:id" element={<DetailOrder />} />
          <Route
            path="manage-order/edit/:id"
            element={<DetailOrder modify={true} />}
          />
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
            <Route path="city" element={<City />}></Route>
            <Route path="district" element={<District />}></Route>
            <Route path="ward" element={<Ward />}></Route>
            <Route path="banned-word" element={<BannedWord />}></Route>
            <Route path="question" element={<AskedQuestion />}></Route>
            <Route path="banner" element={<Banner />}></Route>
            <Route path="banner/create" element={<CreateBanner />}></Route>
            <Route
              path="banner/edit"
              element={<EditBanner edit={true} />}
            ></Route>
            <Route path="banks" element={<Banks />} />
            <Route path="banks/create" element={<CreateBank />} />
            <Route path="banks/edit" element={<EditBank edit={true} />} />

            <Route path="webhook" element={<WebHook />}></Route>
            <Route path="webhook/create" element={<CreateWebHook />}></Route>
            <Route path="webhook/edit" element={<EditWebHook />}></Route>
          </Route>
        </Route>
        <Route path="posts">
          <Route index element={<ManagePost />} />
          <Route path=":id" element={<PostDetail />}></Route>
          <Route path="edit/:id" element={<PostDetail modify={true} />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
