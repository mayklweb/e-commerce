import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Profile() {
  return (
    <div className="mt-5">
      <section>
        <div className="container">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs className="w-full" defaultValue="account">
              <TabsList className="w-full">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account</TabsContent>
              <TabsContent value="orders">Orders</TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
