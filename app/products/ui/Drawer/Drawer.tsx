import { CloseIcon } from "@/app/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {
  categories: CategoryType[];
  brands: BrandsType[];
};

function FilterDrawer({ categories, brands }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"sm"} variant="outline">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {/* <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">content</div>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div> */}
        <DrawerHeader style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <DrawerTitle>Filter</DrawerTitle>
          <DrawerClose><CloseIcon/></DrawerClose>
        </DrawerHeader>
        <div className="px-4 text-xs flex gap-5">
        <div >
          {categories.map(({ name }) => (
            <h1>{name}</h1>
          ))}
        </div>
        <div className="">
          {brands.map(({ name }) => (
            <h1>{name}</h1>
          ))}
        </div>

        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default FilterDrawer;
