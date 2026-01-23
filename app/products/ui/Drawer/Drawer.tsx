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
            <AccordionTrigger className="text-lg py-2">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(({ name }) => (
                  <div className="flex gap-2 items-center">
                  <input type="checkbox" name="" id="" />
                  <p className="block tracking-tight">{name}</p>
                  </div>
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
