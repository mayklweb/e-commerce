import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Profile() {
  return (
    <div className="mt-5">
      <section>
        <div className="container">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs className="w-full" defaultValue="account">
              <TabsList className="w-full h-auto p-1">
                <TabsTrigger className="p-2" value="account">Account</TabsTrigger>
                <TabsTrigger className="p-2" value="orders">Orders</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="flex flex-col gap-4 mt-4">
                  <input placeholder="Name" />
                  <input placeholder="Email" />
                  <input placeholder="Password" type="password" />
                  <Button className="mt-2">Update Profile</Button>
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
