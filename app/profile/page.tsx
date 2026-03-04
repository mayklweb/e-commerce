"use client";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "@/app/providers/ProtectedRoute";
import { AppDispatch, RootState } from "@/app/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile } from "../store/actions/updateProfileAction";
import { logout } from "../store/slices/authSlice";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getOrders } from "../store/actions/ordersAction";
import { UserIcon } from "../shared/icons";

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector(
    (state: RootState) => state.auth,
  );
  const { orders } = useSelector((state: RootState) => state.orders);
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSave = () => {
    dispatch(updateProfile({ name, phone }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
    setIsEditing(false);
  };

  const dispatchLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <ProtectedRoute>
      <div className="mt-24">
        <section>
          <div className="container">
            <div>
              <div className="w-full flex lg:hidden flex-col flex-auto h-full gap-4">
                <div className="flex gap-3 items-center">
                  <div className="p-4 bg-accent inline-block rounded-full">
                    <UserIcon size={32} />
                  </div>
                  <div className="">
                    <h1 className="text-2xl font-semibold leading-[130%] capitalize">
                      {user?.name}
                    </h1>
                    <p className="text-lg leading-[130%]">+998 {user?.phone}</p>
                  </div>
                </div>
                <Link
                  href={"/profile/info"}
                  className="text-accent text-lg bg-primary p-4 rounded-xl text-center "
                >
                  Ma'lumotlarim
                </Link>
                <Link
                  href={"/profile/orders"}
                  className="text-accent text-lg bg-primary p-4 rounded-xl text-center"
                >
                  Buyurtmalarim
                </Link>
              </div>
              {/* <div className="w-full flex flex-row flex-auto h-full gap-10">
              <div className="w-4/10 flex flex-col gap-4">
                <Link
                  href={"/profile/info"}
                  className="text-accent text-lg bg-primary px-4 py-3 rounded-xl text-center "
                >
                  Ma'lumotlarim
                </Link>
                <Link
                  href={"/profile/orders"}
                  className="text-accent text-lg bg-primary px-4 py-3 rounded-xl text-center"
                >
                  Buyurtmalarim
                </Link>
              </div>
            </div> */}

              <Tabs
                defaultValue="overview"
                orientation="vertical"
                className="w-full hidden lg:flex flex-row gap-10 items-start"
              >
                <TabsList className="w-3/10 bg-transparent h-auto flex flex-col gap-4">
                  <TabsTrigger
                    value="overview"
                    className="
        w-full text-left px-4 py-3 text-base font-medium rounded-lg
        text-black bg-primary/10
        data-[state=active]:text-white
        data-[state=active]:bg-primary
        data-[state=active]:font-semibold
      "
                  >
                    Malumotlarim
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="
        w-full px-4 py-3 text-lg font-medium rounded-lg
        text-black bg-primary/10
        data-[state=active]:text-white
        data-[state=active]:bg-primary
        data-[state=active]:font-semibold
      "
                  >
                    Buyurtmalarim
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="w-full flex flex-col flex-auto h-full gap-6">
                    <div className="w-full h-full flex flex-col gap-4 ">
                      <div>
                        <label htmlFor="name" className="text-sm text-black/50">
                          Ism
                        </label>
                        <input
                          value={name}
                          disabled={!isEditing}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ismingiz"
                          className={`focus-within:border-secondary outline-none w-full bg-wihte/10 border-b`}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="text-sm text-black/50"
                        >
                          Telefon
                        </label>
                        <input
                          value={`+998 ${phone}`}
                          disabled={!isEditing}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Telefon raqamingiz"
                          className={`focus-within:border-secondary outline-none w-full bg-wihte/10 border-b`}
                        />
                      </div>
                      <div className="w-full">
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="w-full bg-primary text-white py-2.5 rounded-lg"
                          >
                            Profilni tahrirlash
                          </button>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              onClick={handleCancel}
                              className="border py-2.5 rounded-lg w-full"
                            >
                              Bekor qilish
                            </button>
                            <button
                              onClick={handleSave}
                              disabled={loading}
                              className="bg-primary text-white py-2.5 rounded-lg w-full"
                            >
                              {loading ? "Saqlash..." : "Saqlash"}
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="w-full flex flex-auto">
                        <button
                          onClick={dispatchLogout}
                          className="w-full text-error py-2.5 bg-error/10 rounded-lg"
                        >
                          Akkauntdan chiqish
                        </button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="orders">
                  <div>
                    {orders.length > 0 ? (
                      <ul className="flex flex-col gap-4">
                        {orders.map((order) => (
                          <li key={order.id}>{order.id}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-black/50">
                        Buyurtmalar yo'q
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}

export default Profile;
