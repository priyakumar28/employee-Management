import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Toolbar, IconButton, Typography, List, ListItem, ListItemText, Container, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmployeeTable from "./Components/Employees";
import EmployeeForm from "./Components/EmployeeForm";
import EmployeeView from "./Components/EmployeeView";
import AuditLog from "./Components/AuditLogs";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
const drawerWidth = 240;


const openedMixin = (theme ) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
   
    ...theme.mixins.toolbar,
  }));
  
 
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      variants: [
        {
          props: ({ open }) => open,
          style: {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          },
        },
        {
          props: ({ open }) => !open,
          style: {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          },
        },
      ],
    }),
  );
  

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 

  return (
    <Router>
      <div>
      
        <AppBar position="fixed" open={open} sx={{background:"#9575cd"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            EMS
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
          <List>
          <ListItem button component={Link} to="/">
              <ListItemIcon><PersonIcon sx={{color:"#9575cd"}}/></ListItemIcon>
              <ListItemText primary="Employee List"  sx={{ color: "#9575cd" }} />
            </ListItem>
            <ListItem button component={Link} to="/add">
              <ListItemIcon><AddCircleOutlineIcon  sx={{color:"#9575cd"}}/></ListItemIcon>
              <ListItemText primary="Add Employee"  sx={{ color: "#9575cd" }}/>
            </ListItem>
            <ListItem button component={Link} to="/logs">
              <ListItemIcon><AssignmentIcon  sx={{color:"#9575cd"}}/></ListItemIcon>
              <ListItemText primary="Audit Logs"  sx={{ color: "#9575cd" }} />
            </ListItem>
          </List>
        </Drawer>

      
        <Box component="main" sx={{ flexGrow: 1, pl: 8 }}>
        <DrawerHeader />
            <Routes>
              <Route path="/logs" element={<AuditLog />} />
              <Route path="/" element={<EmployeeTable />} />
              <Route path="/add" element={<EmployeeForm isEditMode={false} />} />
              <Route path="/edit/:id" element={<EmployeeForm isEditMode={true} />} />
              <Route path="/view/:id" element={<EmployeeView />} />
            </Routes>
          </Box>
        </div>
   
    </Router>
  );
};

export default App;
