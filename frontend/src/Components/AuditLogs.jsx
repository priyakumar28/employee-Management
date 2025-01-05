import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, TablePagination } from "@mui/material";
import logsService from "../services/logsServices"; 

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await logsService.getAllLogs();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";

    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  return (
    <Box style={{ marginTop: "10px" ,paddingLeft:'20px' }}>
      <Typography variant="h5" gutterBottom>
        Audit logs
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "10px" }}>
        <Table>
          <TableHead sx={{background:'#9575cd'}}>
            <TableRow>
              <TableCell sx={{color:'#ffffff'}}>ID</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Timestamp</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Action</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Endpoint</TableCell>
              <TableCell sx={{color:'#ffffff'}}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ maxHeight: "150px", overflow: "auto" }}>
            {logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{formatTimestamp(log.date_time)}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.endpoint}</TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        count={logs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[7]}
      />
    </Box>
  );
};

export default LogsTable;
