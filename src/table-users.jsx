import { Button, For, Input, Stack, Table, TableCell, Text } from "@chakra-ui/react";
import { useTableUsersStore } from "./zustandStore/tableUsers-store";
import { useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./components/ui/drawer";

const TableUsers = () => {
  const { items, addItem, removeItem, chek, editItem } = useTableUsersStore();
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [newItem, setNewItem] = useState([
    {
      id: Date.now(),
      name: "",
      category: "",
      price: "",
    },
  ]);

  return (
    <Stack gap="10">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          margin: "auto",
          marginTop: "3vh",
        }}
      >
        <Input
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          variant={"outline"}
          maxH={"5"}
          maxW={"1/4"}
        />
        <Input
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          variant={"outline"}
          maxH={"5"}
          maxW={"1/4"}
        />
        <Input
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          variant={"outline"}
          maxH={"5"}
          maxW={"1/4"}
        />
        <Button
          onClick={() => addItem(newItem)}
          variant={"outline"}
          maxH={"5"}
          fontSize={"10px"}
          maxW={"1/12"}
          margin={"auto"}
        >
          Add +
        </Button>
      </div>
      <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent maxW={"1/4"}>
          <DrawerHeader>
            <DrawerTitle fontSize={"sm"}>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Input
              value={selectedItem.name}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              placeholder="Name"
              maxH={"5"}
            />
            <Input
              value={selectedItem.category}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, category: e.target.value })
              }
              placeholder="Category"
              maxH={"5"}
            />
            <Input
              value={selectedItem.price}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, price: e.target.value })
              }
              placeholder="Price"
              maxH={"5"}
            />
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button
                maxH={"6"}
                maxW={"6"}
                fontSize={"smaller"}
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerActionTrigger>
            <Button
              maxH={"6"}
              maxW={"6"}
              fontSize={"smaller"}
              onClick={() => {
                setOpen(false);
                editItem(selectedItem);
              }}
            >
              Save
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>

      {/*INFO*/}
      <DrawerRoot open={openInfo} onOpenChange={(e) => setOpenInfo(e.open)}>
        <DrawerBackdrop />
        <DrawerContent maxW={"1/4"}>
          <DrawerHeader>
            <DrawerTitle fontSize={"sm"}>Information about product</DrawerTitle>
          </DrawerHeader>
          <DrawerBody
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Text fontFamily="mono">{selectedItem.name}</Text>
            <Text >{selectedItem.category}</Text>
            <Text >{selectedItem.price}</Text>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button
                maxH={"6"}
                maxW={"6"}
                fontSize={"smaller"}
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerActionTrigger>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>

      <For each={["sm"]}>
        {(size) => (
          <Table.Root
            fontSize={"smaller"}
            style={{ margin: "auto", width: "80%" }}
            key={size}
            size={size}
          >
            <Table.Header>
              <Table.Row maxH={"5"}>
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                <TableCell>Actions</TableCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((item) => (
                <Table.Row maxH={"5"} key={item.id}>
                  <Table.Cell
                    style={{
                      textDecoration: item.status ? "line-through" : "",
                    }}
                  >
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell textAlign="end">{item.price}</Table.Cell>
                  <TableCell style={{
                    display:"flex",
                    gap:"5px"
                  }}>
                    <Button
                      maxH={"5"}
                      color={"white"}
                      maxW={"1/6"}
                      fontSize={"smaller"}
                      bg={"red"}
                      onClick={() => removeItem(item.id)}
                    >
                      Delete
                    </Button>
                    <Checkbox
                      checked={item.status}
                      onChange={() => chek(item.id)}
                      size={size}
                      color={"lightgrey"}
                    ></Checkbox>
                    <Button
                      maxH={"5"}
                      color={"white"}
                      maxW={"1/6"}
                      fontSize={"smaller"}
                      bg={"green"}
                      onClick={() => {
                        setOpen(true);
                        setSelectedItem(item);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      maxH={"5"}
                      color={"white"}
                      maxW={"1/6"}
                      fontSize={"smaller"}
                      bg={"grey"}
                      onClick={()=>{setOpenInfo(true)
                        setSelectedItem(item)}
                      }
                    >
                      Info
                    </Button>
                  </TableCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </For>
    </Stack>
  );
};

export default TableUsers;
