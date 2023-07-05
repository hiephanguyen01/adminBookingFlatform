import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Chat from "./Components/Chat/Chat";
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
import EmailService from "./Page/CoreSetting/EmailServices";
import HotKey from "./Page/CoreSetting/HotKey/HotKey";
import Ward from "./Page/CoreSetting/Ward/Ward";
import WebHook from "./Page/CoreSetting/webHook/WebHook";
import CreateWebHook from "./Page/CoreSetting/webHook/components/CreateWebHook/CreateWebHook";
import EditWebHook from "./Page/CoreSetting/webHook/components/EditWebHook/EditWebHook";
import Dao from "./Page/Dao";
import AccessTime from "./Page/Dashboard/AccessTime/AccessTime";
import Account from "./Page/Dashboard/Account/Account";
import Dashboard from "./Page/Dashboard/Dashboard";
import Order from "./Page/Dashboard/Order/Order";
import Post from "./Page/Dashboard/Post/Post";
import DataExport from "./Page/DataExport/DataExport";
import DataExportAffiliate from "./Page/DataExportAffiliate/DataExport";
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
import { Partner as NotiPartner } from "./Page/Notification/Partner/Partner";
import PartnerNotificationDetail from "./Page/Notification/Partner/pages/PartnerNotificationDetail";
import Setting from "./Page/Notification/Setting/Setting";
import AdminDetail from "./Page/PermissionAccess/AdminDetail/AdminDetail";
import CreateAccount from "./Page/PermissionAccess/CreateAccount/CreateAccount";
import Permission from "./Page/PermissionAccess/Permission";
import PromoCode from "./Page/PromoCode/PromoCode";
import PromoCreate from "./Page/PromoCode/PromoCreate/PromoCreate";
import { PromoCustomer } from "./Page/PromoCode/PromoCustomer/PromoCustomer";
import PromoCustomerDetail from "./Page/PromoCode/PromoCustomer/pages/PromoCustomerDetail";
import { PromoPartner } from "./Page/PromoCode/PromoPartner/PromoPartner";
import PromoPartnerDetail from "./Page/PromoCode/PromoPartner/pages/PromoPartnerDetail";
import DetailRateReport from "./Page/RankReport/Detail/DetailRateReport";
import RankReport from "./Page/RankReport/RankReport";
import { AffiliateStatistic } from "./Page/affiliateStatistic";
import AffiliateStatisticDetail from "./Page/affiliateStatistic/Detail";
import { getCurrentUser } from "./store/action/authAction";

import AffiliatePayment from "./Page/AffiliatePayment/AffiliatePayment";
import KeyRelate from "./Page/KeyRelate/KeyRelate";

const App = () => {
  const [path, setPath] = useState("");
  const user = useSelector((state) => state.userReducer?.currentUser?.user);
  const currentUser = useSelector((state) => state.userReducer?.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const location = useLocation();

  useEffect(() => {
    const currentRoute = location.pathname;
    setPath(currentRoute);
  }, [location]);

  return (
    <section className="App">
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
            {user?.partnerAccount >= 2 && (
              <Route path="partner" element={<Partner />}></Route>
            )}
            {user?.partnerAccount >= 2 && (
              <Route path="partner/:id" element={<PartnerDetail />}></Route>
            )}
            {user?.partnerAccount >= 2 && (
              <Route
                path="partner/edit/:id"
                element={<DetailEditPartner />}></Route>
            )}
            {user?.customerAccount >= 2 && (
              <Route path="customer" element={<Customer />}></Route>
            )}
            {user?.customerAccount >= 2 && (
              <Route path="customer/:id" element={<CustomerDetail />}></Route>
            )}
            {user?.customerAccount >= 2 && (
              <Route
                path="customer/edit/:id"
                element={<EditCustomer />}></Route>
            )}
          </Route>
          {user?.report >= 2 && (
            <Route path="rank-report" element={<RankReport />}></Route>
          )}
          {user?.report >= 2 && (
            <Route
              path="rank-report/:id"
              element={<DetailRateReport />}></Route>
          )}
          {user?.booking >= 2 && (
            <Route path="manage-order" element={<ManageOrder />} />
          )}
          {user?.booking >= 2 && (
            <Route path="manage-order/:id" element={<DetailOrder />} />
          )}
          {user?.booking >= 2 && (
            <Route
              path="manage-order/edit/:id"
              element={<DetailOrder modify={true} />}
            />
          )}
          {user?.export >= 2 && (
            <Route path="data-export" element={<DataExport />}></Route>
          )}
          {user?.dao >= 2 && <Route path="dao" element={<Dao />}></Route>}

          {user?.permission >= 2 && (
            <Route path="permission" element={<Permission />}></Route>
          )}
          {user?.permission >= 2 && (
            <Route path="permission/create" element={<CreateAccount />}></Route>
          )}
          {user?.permission >= 2 && (
            <Route path="permission/:id" element={<AdminDetail />}></Route>
          )}

          {user?.notification >= 2 && (
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
          )}
          {user?.promo >= 2 && (
            <Route path="promo-code" element={<PromoCode />}>
              <Route path="" element={<PromoPartner />}></Route>
              <Route
                path="view-detail"
                element={<PromoPartnerDetail />}></Route>
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
          )}
          {user?.setting >= 2 && (
            <Route path="setting" element={<CoreSetting />}>
              <Route path="city" element={<City />}></Route>
              <Route path="district" element={<District />}></Route>
              <Route path="ward" element={<Ward />}></Route>
              <Route path="banned-word" element={<BannedWord />}></Route>
              <Route path="question" element={<AskedQuestion />}></Route>
              <Route path="hot-key" element={<HotKey />}></Route>
              <Route path="key-relate" element={<KeyRelate />}></Route>
              <Route path="banner" element={<Banner />}></Route>
              <Route path="email-service" element={<EmailService />}></Route>
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
          )}
        </Route>
        {user?.post >= 2 && (
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
            <Route
              path="edit/:id"
              element={<PostDetail modify={true} />}></Route>
          </Route>
        )}
        <Route
          path="/affiliate"
          element={
            <ProtectedRoute type="affiliate">
              <AdminLayout type="affiliate" />
            </ProtectedRoute>
          }>
          {user?.affiliate >= 2 && (
            <>
              <Route path="manage" element={<AffiliateAccount />}></Route>
              <Route path="manage/:id" element={<AffiliateDetail />}></Route>
              <Route path="link" element={<AffiliateLink />}></Route>
              <Route path="link/:id" element={<LinkDetail />}></Route>
              <Route path="order" element={<AffiliateOrder />}></Route>
              <Route path="order/:id" element={<OrderDetail />}></Route>
              <Route
                path="commission"
                element={<AffiliateCommission />}></Route>
              <Route path="statistic" element={<AffiliateStatistic />}></Route>
              <Route
                path="statistic/:id"
                element={<AffiliateStatisticDetail />}></Route>
              <Route
                path="data-export"
                element={<DataExportAffiliate />}></Route>
              <Route path="payment" element={<AffiliatePayment />}></Route>
            </>
          )}
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>

      {currentUser?.user.chat === 3 && !path.includes("affiliate") && <Chat />}
    </section>
  );
};

export default App;
