import { CloseIcon, FilterIcon, RightIcon } from "@/app/shared/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
        <button className="text-xs flex flex-col items-center gap-1 bg-primary/10 px-2.5 py-2 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300">
          <FilterIcon />
        </button>
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
              <div className="grid grid-cols-2 gap-2 ">
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
            <AccordionContent className=" overflow-x-scroll">
              <div className=" gap-1.5 text-base">
                {brands.map(({ name }) => (
                  <div className="flex items-center justify-between">
                    <p>{name}</p>
                    <span>
                      <RightIcon className="size-5" />
                    </span>
                  </div>
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
