"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { updateProfile } from "../store/actions/updateProfileAction";

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

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

  return (
    <div className="mt-5">
      <section>
        <div className="container">
          <div className="w-full flex flex-col gap-6">
            <Tabs className="w-full" defaultValue="account">
              <TabsList className="w-full h-auto p-1 bg-primary/10">
                <TabsTrigger className="text-primary p-2" value="account">
                  Ma'lumotlarim
                </TabsTrigger>
                <TabsTrigger className="text-primary p-2" value="orders">
                  Buyurtmalarim
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="flex flex-col gap-4 mt-4">
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
                    <label htmlFor="phone" className="text-sm text-black/50">
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

                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-primary text-white py-2.5 rounded-lg"
                    >
                      Edit Profile
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
              </TabsContent>
              <TabsContent value="orders">Orders</TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
