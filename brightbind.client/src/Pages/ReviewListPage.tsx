import { Container, Grid, SelectChangeEvent } from "@mui/material";
import ReviewSearchForm from "../Components/ReviewSearchForm";
import { useEffect, useState, useContext } from "react";
import ReviewCard from "../Components/ReviewCard";
import { UserContext } from "../Components/AuthorizeView";
import BaseURL from "../../config";

type Review = {
  id: number;
  userId: string;
  imagePath: string;
  title: string;
  author: string;
  brand: string;
  comment: string;
  updateDate: Date;
};

function Review() {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("Oldest first");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [reviewData, setReviewData] = useState<Review[]>([]);
  const user = useContext(UserContext);
  const apiUrl = `${BaseURL}/api/Review/GetReviewsByUserId/${user?.id}`;

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "start" | "end"
  ) => {
    const value = event.target.value;
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filterReviews = () => {
    let filtered = [...reviewData]; //reviewData 배열을 복사해서 filtered라는 새로운 배열을 만듦

    if (startDate) {
      filtered = filtered.filter(
        (review) =>
          new Date(review.updateDate).toISOString().split("T")[0] >= new Date(startDate).toISOString().split("T")[0]
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (review) =>
          new Date(review.updateDate).toISOString().split("T")[0] <= new Date(endDate).toISOString().split("T")[0]
      );
    }

    if (sortOrder === "Oldest first") {
      filtered = filtered.sort((a, b) => a.updateDate.getTime() - b.updateDate.getTime());
    } else if (sortOrder === "Newest first") {
      filtered = filtered.sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime());
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (review) =>
          review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredReviews(filtered);
    //setReviewData(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const fetchedData: Review[] = data.map((item: any) => ({
          id: item.id,
          userId: item.book.userId,
          imagePath: item.book.imagePath,
          title: item.title,
          author: item.book.author,
          brand: item.book.brand,
          comment: item.comment,
          updateDate: new Date(item.updateDate),
        }));

        const filteredData = fetchedData.filter((review) => review.userId === user?.id);
        setReviewData(filteredData);
        //setFilteredReviews(filteredData); // 초기 필터링된 데이터를 설정합니다.
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching review data:", error);
        setIsDataLoaded(true);
      }
    };
    // 1년 전의 날짜를 계산하여 startDate와 endDate 설정
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    setStartDate(oneYearAgo.toISOString().split("T")[0]); // "YYYY-MM-DD" 형식으로 설정
    setEndDate(now.toISOString().split("T")[0]);

    fetchData();
  }, [apiUrl, user?.id]);

  useEffect(() => {
    if (isDataLoaded) {
      filterReviews();
    }
  }, [isDataLoaded, startDate, endDate, sortOrder, searchQuery]);

  return (
    <Container>
      <ReviewSearchForm
        startDate={startDate}
        endDate={endDate}
        sortOrder={sortOrder}
        onDateChange={handleDateChange}
        onSortChange={handleSortChange}
        onSearch={filterReviews}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <Grid container spacing={4}>
        {filteredReviews.map((review) => (
          <Grid item md={18} sm={6} key={review.id}>
            <ReviewCard
              title={review.title}
              comment={review.comment}
              updateDate={review.updateDate}
              author={review.author}
              brand={review.brand}
              imagePath={review.imagePath}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Review;
