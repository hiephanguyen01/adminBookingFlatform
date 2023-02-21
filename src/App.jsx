import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import AffiliateAccount from "./Page/AffiliateAccount/AffiliateAccount";
import AffiliateDetail from "./Page/AffiliateAccount/AffiliateDetail/AffiliateDetail";
import AffiliateCommission from "./Page/AffiliateCommission/AffiliateCommission";
import AffiliateLink from "./Page/AffiliateLink/AffiliateLink";
import LinkDetail from "./Page/AffiliateLink/LinkDetail/LinkDetail";
import AffiliateOrder from "./Page/AffiliateOrder/AffiliateOrder";
import OrderDetail from "./Page/AffiliateOrder/OrderDetail/OrderDetail";
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
import District from "./Page/CoreSetting/District/District";
import HotKey from "./Page/CoreSetting/HotKey/HotKey";
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
import Login from "./Page/Login/Login";
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
import CustomerNotificationDetail from "./Page/Notification/Customer/pages/CustomerNotificationDetail";
import Notification from "./Page/Notification/Notification";
import PartnerNotificationDetail from "./Page/Notification/Partner/pages/PartnerNotificationDetail";
import { Partner as NotiPartner } from "./Page/Notification/Partner/Partner";
import Setting from "./Page/Notification/Setting/Setting";
import AdminDetail from "./Page/PermissionAccess/AdminDetail/AdminDetail";
import CreateAccount from "./Page/PermissionAccess/CreateAccount/CreateAccount";
import Permission from "./Page/PermissionAccess/Permission";
import PromoCode from "./Page/PromoCode/PromoCode";
import PromoCreate from "./Page/PromoCode/PromoCreate/PromoCreate";
import PromoCustomerDetail from "./Page/PromoCode/PromoCustomer/pages/PromoCustomerDetail";
import { PromoCustomer } from "./Page/PromoCode/PromoCustomer/PromoCustomer";
import PromoPartnerDetail from "./Page/PromoCode/PromoPartner/pages/PromoPartnerDetail";
import { PromoPartner } from "./Page/PromoCode/PromoPartner/PromoPartner";
import DetailRateReport from "./Page/RankReport/Detail/DetailRateReport";
import RankReport from "./Page/RankReport/RankReport";
import { getCurrentUser } from "./store/action/authAction";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <AdminLayout type="root" />
            </ProtectedRoute>
          }>
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
              element={<DetailEditPartner />}></Route>

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
          <Route path="permission" element={<Permission />}></Route>
          <Route path="permission/create" element={<CreateAccount />}></Route>
          <Route path="permission/:id" element={<AdminDetail />}></Route>
          <Route path="notification" element={<Notification />}>
            <Route path="partner" element={<NotiPartner />}></Route>
            <Route
              path="partner/view-detail"
              element={<PartnerNotificationDetail />}
            />
            <Route
              path="partner/edit"
              element={<PartnerNotificationDetail edit={true} />}
            />

            <Route path="customer" element={<NotiCustomer />}></Route>
            <Route
              path="customer/view-detail"
              element={<CustomerNotificationDetail />}
            />
            <Route
              path="customer/edit"
              element={<CustomerNotificationDetail edit={true} />}
            />

            <Route path="create" element={<CreateNotification />}></Route>
            <Route path="setting" element={<Setting />}></Route>
          </Route>
          <Route path="promo-code" element={<PromoCode />}>
            <Route path="" element={<PromoPartner />}></Route>
            <Route path="view-detail" element={<PromoPartnerDetail />}></Route>
            <Route
              path="edit"
              element={<PromoPartnerDetail edit={true} />}></Route>

            <Route path="customer" element={<PromoCustomer />}></Route>
            <Route
              path="customer/view-detail"
              element={<PromoCustomerDetail />}></Route>
            <Route
              path="customer/edit"
              element={<PromoCustomerDetail edit={true} />}></Route>

            <Route path="create" element={<PromoCreate />}></Route>
          </Route>
          <Route path="setting" element={<CoreSetting />}>
            <Route path="city" element={<City />}></Route>
            <Route path="district" element={<District />}></Route>
            <Route path="ward" element={<Ward />}></Route>
            <Route path="banned-word" element={<BannedWord />}></Route>
            <Route path="question" element={<AskedQuestion />}></Route>
            <Route path="hot-key" element={<HotKey />}></Route>
            <Route path="banner" element={<Banner />}></Route>
            <Route path="banner/create" element={<CreateBanner />}></Route>
            <Route
              path="banner/edit"
              element={<EditBanner edit={true} />}></Route>
            <Route path="banks" element={<Banks />} />
            <Route path="banks/create" element={<CreateBank />} />
            <Route path="banks/edit" element={<EditBank edit={true} />} />

            <Route path="webhook" element={<WebHook />}></Route>
            <Route path="webhook/create" element={<CreateWebHook />}></Route>
            <Route path="webhook/edit" element={<EditWebHook />}></Route>
          </Route>
        </Route>
        <Route path="posts">
          <Route
            index
            element={
              <ProtectedRoute>
                <ManagePost />
              </ProtectedRoute>
            }
          />
          <Route path=":id" element={<PostDetail />}></Route>
          <Route path="edit/:id" element={<PostDetail modify={true} />}></Route>
        </Route>

        <Route
          path="/affiliate"
          element={
            <ProtectedRoute>
              <AdminLayout type="affiliate" />
            </ProtectedRoute>
          }>
          <Route path="manage" element={<AffiliateAccount />}></Route>
          <Route path="manage/:id" element={<AffiliateDetail />}></Route>
          <Route path="link" element={<AffiliateLink />}></Route>
          <Route path="link/:id" element={<LinkDetail />}></Route>
          <Route path="order" element={<AffiliateOrder />}></Route>
          <Route path="order/:id" element={<OrderDetail />}></Route>
          <Route path="commission" element={<AffiliateCommission />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default App;
