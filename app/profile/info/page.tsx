"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/providers/ProtectedRoute";
import { logout } from "@/app/store/slices/authSlice";
import { updateProfile } from "@/app/store/actions/updateProfileAction";
import { AppDispatch, RootState } from "@/app/store";
import Link from "next/link";
import { LeftIcon } from "@/app/shared/icons";

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
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
      <div className="mt-5">
        <section>
          <div className="container">
            <div>
              <div>
                <Link href={"/profile"} className="text-2xl font-semibold flex items-center">
                  <span><LeftIcon className="mr-2" /></span>
                  <span>Profile</span>
                </Link>
              </div>
              <div className="w-full flex flex-col flex-auto h-full gap-6">
                <div className="w-full h-full flex flex-col gap-4 mt-4">
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
                  <div className="w-full">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-primary text-white py-2.5 rounded-lg"
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
                  <div className="w-full flex flex-auto">
                    <button
                      onClick={dispatchLogout}
                      className="w-full text-error py-2.5 bg-error/10 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}

export default Profile;
