import React from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, OutlinedInput } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface SearchFormProps {
  startDate: string;
  endDate: string;
  sortOrder: string;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: "start" | "end") => void;
  onSortChange: (event: SelectChangeEvent<string>) => void;
  onSearch: () => void;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  onSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

function ReviewSearchForm({
  startDate,
  endDate,
  sortOrder,
  onDateChange,
  onSortChange,
  onSearch,
  setStartDate,
  setEndDate,
  searchQuery,
  onSearchQueryChange,
}: SearchFormProps) {
  const setPeriod = (months: number) => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - months);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  return (
    <Grid container spacing={2} style={{ maxWidth: "100%", marginBottom: 16 }}>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(event) => onDateChange(event, "start")}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(event) => onDateChange(event, "end")}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="sort-order">Sort Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={onSortChange}
            input={<OutlinedInput label="Sort Order" id="sort-order" />}
          >
            <MenuItem value={"Oldest first"}>Oldest first</MenuItem>
            <MenuItem value={"Newest first"}>Newest first</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Button variant="outlined" color="primary" onClick={() => setPeriod(1)} fullWidth>
          1month
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="outlined" color="primary" onClick={() => setPeriod(6)} fullWidth>
          6months
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="outlined" onClick={() => setPeriod(12)} fullWidth>
          1year
        </Button>
      </Grid>

      <Grid item xs={12} sm={9}>
        <TextField label="Search" size="small" value={searchQuery} onChange={onSearchQueryChange} fullWidth />
      </Grid>

      <Grid item xs={12} sm={3}>
        <Button variant="contained" color="primary" onClick={onSearch} fullWidth>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default ReviewSearchForm;
