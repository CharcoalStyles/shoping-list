import Head from "next/head";
import { Inter } from "@next/font/google";
import { Header } from "../components/Header";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroceryItem } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const [newItem, setNewItem] = useState<string>("");
  const { data, error, mutate, isLoading } = useSWR<Array<GroceryItem>>(
    "/api/items/get",
    fetcher
  );
  const [elementsAboveHeight, setElementsAboveHeight] = useState<number>(0);

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current === null) return;
    // Get the elements above the list
    const elementsAbove = document.querySelectorAll(".above-list");

    // Calculate the height of the elements above the list
    let elementsAboveHeight = 0;
    elementsAbove.forEach((element) => {
      elementsAboveHeight += element.clientHeight;
    });

    // Set the height of the elements above the list
    setElementsAboveHeight(elementsAboveHeight);
  }, [listRef, isLoading]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="above-list">
        <Header />
      </div>

      <Container>
        <TextField
          className="above-list"
          sx={{ mt: 2 }}
          label="New Item"
          variant="filled"
          fullWidth
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              if (newItem.trim().length > 0) {
                axios.post("/api/items/add", { item: newItem.trim() });
                mutate();
                setNewItem("");
              }
            }
          }}
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                color="secondary"
                disabled={newItem.trim().length === 0}
                onClick={async () => {
                  await axios.post("/api/items/add", { item: newItem.trim() });
                  mutate();
                  setNewItem("");
                }}>
                Add
              </Button>
            ),
          }}
        />
        {data && (
          <List
            sx={{
              overflowY: "scroll",
              position: "absolute",
              bottom: 0,
              width: "90%",
              top: `calc(${elementsAboveHeight}px + 32px)`,
            }}
            ref={listRef}>
            {data.map((item) => (
              <ListItem
                sx={{
                  mt: 1,
                  pl: 1,
                  py: 1,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "grey.700",
                  borderRadius: 4,
                }}
                key={item.id}
                secondaryAction={
                  <IconButton
                    disabled={isLoading}
                    color="error"
                    edge="end"
                    aria-label="delete"
                    onClick={async () => {
                      await axios.post("/api/items/delete", { id: item.id });
                      mutate();
                    }}>
                    <DeleteIcon />
                  </IconButton>
                }>
                {item.name}
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </>
  );
}
