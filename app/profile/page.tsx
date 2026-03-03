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
import { UserIcon } from "../shared/icons";

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
            <div className="w-full flex flex-col flex-auto h-full gap-6">
              <div className="flex gap-3 items-center">
                <div className="p-4 bg-accent inline-block rounded-full">
                  <UserIcon size={32} />
                </div>
                <div className="">
                  <h1 className="text-lg font-semibold leading-[140%]">{user?.name}</h1>
                  <p className="leading-[140%]">+998 {user?.phone}</p>
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
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}

export default Profile;
