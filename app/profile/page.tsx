import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Profile() {
  return (
    <div className="mt-5">
      <section>
        <div className="container">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs className="w-full" defaultValue="account">
              <TabsList className="w-full h-auto p-1 bg-primary/10">
                <TabsTrigger className="text-primary p-2" value="account">
                  Account
                </TabsTrigger>
                <TabsTrigger className="text-primary p-2" value="orders">
                  Orders
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="flex flex-col gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full "
                  />
                  <input
                    type="text"
                    placeholder="Telefon raqamingiz"
                    className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full "
                  />
                  <input
                    type="text"
                    placeholder="Parol"
                    className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full "
                  />
                  <button className="text-white rounded-lg py-2.5 mt-2 bg-primary ">
                    Update Profile
                  </button>
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
