import { CloseIcon } from "@/app/shared/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <DrawerContent className="min-h-full">
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
        <DrawerHeader
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DrawerTitle>Filter</DrawerTitle>
          <DrawerClose>
            <CloseIcon />
          </DrawerClose>
        </DrawerHeader>

        <Accordion
          type="single"
          collapsible
          defaultValue="shipping"
          className="w-full"
        >
          <AccordionItem className="px-4" value="shipping">
            <AccordionTrigger className="text-lg py-2">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="">
                {categories.map(({ name }) => (
                  <h1>{name}</h1>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="px-4" value="returns">
            <AccordionTrigger className="text-lg">Brands</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {brands.map(({ name }) => (
                  <p>{name}</p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="px-4 text-xs flex gap-5"></div> */}
      </DrawerContent>
    </Drawer>
  );
}

export default FilterDrawer;
