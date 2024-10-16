import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetBooksQuery } from "state/api";
import FlexBetween from "components/FlexBetween";

const Book = ({
  _id,
  title,
  authors,
  average_rating,
  language_code,
  isbn,
  isbn13,
  publisher,
  publication_date,
  quantity,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[300]}
          gutterBottom
        >
          {publisher}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[300]}>
          Quantity: {Number(quantity)}
        </Typography>
        <Rating value={average_rating} readOnly />

        <Typography variant="body2">{authors}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Book ID: {_id}</Typography>
          <Typography>Publication Date : {publication_date}</Typography>
          <Typography>ISBN: {isbn}</Typography>
          <Typography>ISBN 13: {isbn13}</Typography>
          <Typography>Language: {language_code}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Dashboard = () => {
  //we get isLoading from redux: true : data is processing to appear on frontend
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { data, isLoading } = useGetBooksQuery();

  //search
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  // console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Book" subtitle="List of all available books" />
        <Box>
          <TextField
            label="Title, Authors, Publisher"
            variant="standard"
            onChange={handleSearch}
          />
        </Box>
      </FlexBetween>
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data
            .filter(
              ({ title, authors, publisher }) =>
                title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                publisher.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(
              ({
                bookID,
                title,
                authors,
                average_rating,
                language_code,
                publisher,
                isbn,
                isbn13,
                publication_date,
                quantity,
              }) => (
                <Book
                  key={bookID}
                  _id={bookID}
                  title={title}
                  authors={authors}
                  average_rating={average_rating}
                  language_code={language_code}
                  publisher={publisher}
                  publication_date={publication_date}
                  quantity={quantity}
                  isbn13={isbn13}
                  isbn={isbn}
                />
              )
            )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Dashboard;
