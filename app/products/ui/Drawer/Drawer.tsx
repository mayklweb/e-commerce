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
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  categories: CategoryType[];
  brands: BrandsType[];
};

function FilterDrawer({ categories, brands }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-xs flex flex-col items-center gap-1 bg-primary/10 px-2.5 py-2 rounded-lg">
          <FilterIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent className=" min-h-[90%] overflow-scroll">
        <DrawerHeader
          className="sr-only"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DrawerTitle>Filter</DrawerTitle>
          <DialogDescription className="sr-only"></DialogDescription>
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
              <div className="grid grid-cols-1 gap-2 ">
                {categories.map(({ name }, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input type="checkbox" name="" id="" />
                    <p className="block tracking-tight">{name}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="px-4 h-full" value="returns">
            <AccordionTrigger className="text-lg">Brands</AccordionTrigger>
            <AccordionContent className="h-full overflow-x-scroll">
              <div className="h-full">
                {brands.map(({ name }, i) => (
                  <div
                    key={i}
                    className="py-1 text-base flex items-center justify-between border-b"
                  >
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
